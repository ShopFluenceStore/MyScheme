import { NextRequest } from "next/server";
import Scheme from "../../../../../lib/models/Scheme";
import dbConnect from "../../../../../lib/db";
import { getAuthUser, generateSlug } from "../../../../../lib/utils/auth";
import { validateRequest, schemeSchema } from "../../../../../lib/utils/validation";
import { successResponse, errorResponse, unauthorizedResponse, serverErrorResponse } from "../../../../../lib/utils/response";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await getAuthUser(req);
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }
    
    await dbConnect();
    const body = await req.json();
    
    // Validate request data
    const validation = validateRequest(schemeSchema, body);
    if (!validation.success) {
      return errorResponse(validation.error, 400);
    }
    
    const data = validation.data;
    
    // Generate unique slug
    let slug = generateSlug(data.title);
    let slugExists = await Scheme.findOne({ slug });
    let counter = 1;
    
    while (slugExists) {
      slug = `${generateSlug(data.title)}-${counter}`;
      slugExists = await Scheme.findOne({ slug });
      counter++;
    }

    const scheme = new Scheme({
      ...data,
      slug,
      author: user.id,
      lastUpdated: new Date().toISOString(),
      bookmarks: 0,
      views: 0,
      status: 'published'
    });
    
    await scheme.save();
    
    // Populate author info
    await scheme.populate('author', 'name email avatar');

    return successResponse(scheme, 'Scheme created successfully', 201);
  } catch (err) {
    console.error('Error creating scheme:', err);
    return serverErrorResponse('Failed to create scheme');
  }

}