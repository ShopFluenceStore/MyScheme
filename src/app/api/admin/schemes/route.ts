import { NextRequest } from 'next/server';
import dbConnect from '../../../../../lib/db';
import Scheme from '../../../../../lib/models/Scheme';
import { getAuthUser, isAdmin } from '../../../../../lib/utils/auth';
import { successResponse, unauthorizedResponse, forbiddenResponse, notFoundResponse, serverErrorResponse } from '../../../../../lib/utils/response';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }
    
    if (!isAdmin(user)) {
      return forbiddenResponse('Admin access required');
    }
    
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    // Build query
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (status && status !== 'all') {
      query.status = status;
    }
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const skip = (page - 1) * limit;
    
    const [schemes, total] = await Promise.all([
      Scheme.find(query)
        .populate('author', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Scheme.countDocuments(query)
    ]);
    
    // Get stats
    const stats = await Scheme.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const statusStats = {
      total: total,
      published: stats.find(s => s._id === 'published')?.count || 0,
      draft: stats.find(s => s._id === 'draft')?.count || 0,
      archived: stats.find(s => s._id === 'archived')?.count || 0
    };
    
    return successResponse({
      schemes,
      stats: statusStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching admin schemes:', error);
    return serverErrorResponse('Failed to fetch schemes');
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }
    
    if (!isAdmin(user)) {
      return forbiddenResponse('Admin access required');
    }
    
    await dbConnect();
    
    const { schemeId } = await request.json();
    
    if (!schemeId) {
      return errorResponse('Scheme ID is required', 400);
    }
    
    const deletedScheme = await Scheme.findByIdAndDelete(schemeId);
    
    if (!deletedScheme) {
      return notFoundResponse('Scheme not found');
    }
    
    return successResponse(null, 'Scheme deleted successfully');
    
  } catch (error) {
    console.error('Error deleting scheme:', error);
    return serverErrorResponse('Failed to delete scheme');
  }
}