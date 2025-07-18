import { NextRequest } from 'next/server';
import dbConnect from '../../../../../lib/db';
import Scheme from '../../../../../lib/models/Scheme';
import { getAuthUser } from '../../../../../lib/utils/auth';
import { successResponse, unauthorizedResponse, serverErrorResponse } from '../../../../../lib/utils/response';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }
    
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    // Build query for user's schemes
    const query: any = { author: user.id };
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const skip = (page - 1) * limit;
    
    const [schemes, total] = await Promise.all([
      Scheme.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Scheme.countDocuments(query)
    ]);
    
    // Get user stats
    const stats = await Scheme.aggregate([
      { $match: { author: user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalBookmarks: { $sum: '$bookmarks' }
        }
      }
    ]);
    
    const userStats = {
      total: total,
      published: stats.find(s => s._id === 'published')?.count || 0,
      draft: stats.find(s => s._id === 'draft')?.count || 0,
      archived: stats.find(s => s._id === 'archived')?.count || 0,
      totalViews: stats.reduce((sum, s) => sum + s.totalViews, 0),
      totalBookmarks: stats.reduce((sum, s) => sum + s.totalBookmarks, 0)
    };
    
    return successResponse({
      schemes,
      stats: userStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching user schemes:', error);
    return serverErrorResponse('Failed to fetch schemes');
  }
}