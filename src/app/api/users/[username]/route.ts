import { NextRequest } from 'next/server';
import dbConnect from '../../../../../lib/db';
import User from '../../../../../lib/models/User';
import Scheme from '../../../../../lib/models/Scheme';
import { successResponse, notFoundResponse, serverErrorResponse } from '../../../../../lib/utils/response';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await dbConnect();
    
    // Find user by username (case-insensitive)
    const user = await User.findOne({
      name: { $regex: new RegExp(`^${params.username}$`, 'i') },
      isActive: true
    }).select('-password -email');
    
    if (!user) {
      return notFoundResponse('User not found');
    }
    
    // Get user's published schemes
    const schemes = await Scheme.find({
      author: user._id,
      status: 'published'
    })
    .select('title description category state slug views bookmarks createdAt')
    .sort({ createdAt: -1 })
    .limit(10);
    
    // Get user stats
    const stats = await Scheme.aggregate([
      { $match: { author: user._id, status: 'published' } },
      {
        $group: {
          _id: null,
          totalSchemes: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalBookmarks: { $sum: '$bookmarks' }
        }
      }
    ]);
    
    const userStats = stats[0] || {
      totalSchemes: 0,
      totalViews: 0,
      totalBookmarks: 0
    };
    
    const profileData = {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      socialLinks: user.socialLinks,
      joinedDate: user.createdAt,
      stats: userStats,
      schemes
    };
    
    return successResponse(profileData);
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return serverErrorResponse('Failed to fetch user profile');
  }
}