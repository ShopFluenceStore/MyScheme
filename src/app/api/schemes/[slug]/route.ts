import { NextRequest } from 'next/server';
import dbConnect from '../../../../../lib/db';
import Scheme from '../../../../../lib/models/Scheme';
import { getAuthUser } from '../../../../../lib/utils/auth';
import { validateRequest, updateSchemeSchema } from '../../../../../lib/utils/validation';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, notFoundResponse, serverErrorResponse } from '../../../../../lib/utils/response';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    
    const scheme = await Scheme.findOne({ slug: params.slug })
      .populate('author', 'name email avatar bio socialLinks');
    
    if (!scheme) {
      return notFoundResponse('Scheme not found');
    }
    
    // Increment view count
    await Scheme.findByIdAndUpdate(scheme._id, { $inc: { views: 1 } });
    
    return successResponse(scheme);
  } catch (error) {
    console.error('Error fetching scheme:', error);
    return serverErrorResponse('Failed to fetch scheme');
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }
    
    await dbConnect();
    
    const scheme = await Scheme.findOne({ slug: params.slug });
    if (!scheme) {
      return notFoundResponse('Scheme not found');
    }
    
    // Check if user is author or admin
    if (scheme.author.toString() !== user.id && user.role !== 'admin') {
      return forbiddenResponse('You can only edit your own schemes');
    }
    
    const body = await request.json();
    
    // Validate request data
    const validation = validateRequest(updateSchemeSchema, body);
    if (!validation.success) {
      return errorResponse(validation.error, 400);
    }
    
    const updateData = {
      ...validation.data,
      lastUpdated: new Date().toISOString()
    };
    
    const updatedScheme = await Scheme.findByIdAndUpdate(
      scheme._id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name email avatar');
    
    return successResponse(updatedScheme, 'Scheme updated successfully');
  } catch (error) {
    console.error('Error updating scheme:', error);
    return serverErrorResponse('Failed to update scheme');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }
    
    await dbConnect();
    
    const scheme = await Scheme.findOne({ slug: params.slug });
    if (!scheme) {
      return notFoundResponse('Scheme not found');
    }
    
    // Check if user is author or admin
    if (scheme.author.toString() !== user.id && user.role !== 'admin') {
      return forbiddenResponse('You can only delete your own schemes');
    }
    
    await Scheme.findByIdAndDelete(scheme._id);
    
    return successResponse(null, 'Scheme deleted successfully');
  } catch (error) {
    console.error('Error deleting scheme:', error);
    return serverErrorResponse('Failed to delete scheme');
  }
}