import { NextRequest } from 'next/server';
import dbConnect from "../../../../lib/db";
import Scheme from "../../../../lib/models/Scheme";
import { getAuthUser, generateSlug } from "../../../../lib/utils/auth";
import { validateRequest, schemeSchema } from "../../../../lib/utils/validation";
import { successResponse, errorResponse, unauthorizedResponse, serverErrorResponse } from "../../../../lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    const status = searchParams.get('status') || 'published';
    const author = searchParams.get('author');
    
    // Build query
    const query: any = { status };
    if (category) query.category = category;
    if (state) query.state = state;
    if (author) query.author = author;
    
    const skip = (page - 1) * limit;
    
    const [schemes, total] = await Promise.all([
      Scheme.find(query)
        .populate('author', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Scheme.countDocuments(query)
    ]);
    
    return successResponse({
      schemes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching schemes:', error);
    return serverErrorResponse('Failed to fetch schemes');
  }
