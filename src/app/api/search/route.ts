import { NextRequest } from 'next/server';
import dbConnect from '../../../../lib/db';
import Scheme from '../../../../lib/models/Scheme';
import User from '../../../../lib/models/User';
import { validateRequest, searchSchema } from '../../../../lib/utils/validation';
import { successResponse, errorResponse, serverErrorResponse } from '../../../../lib/utils/response';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate request data
    const validation = validateRequest(searchSchema, body);
    if (!validation.success) {
      return errorResponse(validation.error, 400);
    }
    
    const { query, category, state, type, page, limit } = validation.data;
    const skip = (page - 1) * limit;
    
    let results: any[] = [];
    
    if (type === 'all' || type === 'schemes') {
      // Search schemes
      const schemeQuery: any = {
        status: 'published',
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } },
          { category: { $regex: query, $options: 'i' } },
          { subCategory: { $regex: query, $options: 'i' } }
        ]
      };
      
      if (category) schemeQuery.category = category;
      if (state) schemeQuery.state = state;
      
      const schemes = await Scheme.find(schemeQuery)
        .populate('author', 'name avatar')
        .sort({ views: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      results.push(...schemes.map(scheme => ({
        type: 'scheme',
        id: scheme._id,
        title: scheme.title,
        description: scheme.description,
        category: scheme.category,
        url: `/schemes/${scheme.slug}`,
        metadata: {
          author: scheme.author,
          views: scheme.views,
          tags: scheme.tags
        }
      })));
    }
    
    if (type === 'all' || type === 'users') {
      // Search users
      const users = await User.find({
        isActive: true,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { bio: { $regex: query, $options: 'i' } }
        ]
      })
      .select('name avatar bio')
      .skip(skip)
      .limit(limit);
      
      results.push(...users.map(user => ({
        type: 'user',
        id: user._id,
        title: user.name,
        description: user.bio,
        url: `/profile/${user.name.toLowerCase().replace(/\s+/g, '')}`,
        metadata: {
          avatar: user.avatar
        }
      })));
    }
    
    if (type === 'all' || type === 'categories') {
      // Search categories
      const categories = await Scheme.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $match: { _id: { $regex: query, $options: 'i' } } },
        { $sort: { count: -1 } },
        { $skip: skip },
        { $limit: limit }
      ]);
      
      results.push(...categories.map(cat => ({
        type: 'category',
        id: cat._id,
        title: cat._id,
        description: `${cat.count} schemes available`,
        url: `/schemes?category=${encodeURIComponent(cat._id)}`,
        metadata: {
          count: cat.count
        }
      })));
    }
    
    // Sort results by relevance (schemes first, then by views/count)
    results.sort((a, b) => {
      if (a.type === 'scheme' && b.type !== 'scheme') return -1;
      if (a.type !== 'scheme' && b.type === 'scheme') return 1;
      
      const aScore = a.metadata?.views || a.metadata?.count || 0;
      const bScore = b.metadata?.views || b.metadata?.count || 0;
      return bScore - aScore;
    });
    
    return successResponse({
      results: results.slice(0, limit),
      query,
      total: results.length,
      page,
      limit
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return serverErrorResponse('Search failed');
  }
}