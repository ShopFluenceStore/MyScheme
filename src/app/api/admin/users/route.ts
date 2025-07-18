import { NextRequest } from 'next/server';
import dbConnect from '../../../../../lib/db';
import User from '../../../../../lib/models/User';
import { getAuthUser, isAdmin } from '../../../../../lib/utils/auth';
import { successResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '../../../../../lib/utils/response';

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
    const role = searchParams.get('role');
    
    // Build query
    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role && role !== 'all') {
      query.role = role;
    }
    
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(query)
    ]);
    
    return successResponse({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return serverErrorResponse('Failed to fetch users');
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }
    
    if (!isAdmin(user)) {
      return forbiddenResponse('Admin access required');
    }
    
    await dbConnect();
    
    const { userId, role, isActive } = await request.json();
    
    if (!userId) {
      return errorResponse('User ID is required', 400);
    }
    
    const updateData: any = {};
    if (role && ['user', 'admin'].includes(role)) {
      updateData.role = role;
    }
    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      return notFoundResponse('User not found');
    }
    
    return successResponse(updatedUser, 'User updated successfully');
    
  } catch (error) {
    console.error('Error updating user:', error);
    return serverErrorResponse('Failed to update user');
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
    
    const { userId } = await request.json();
    
    if (!userId) {
      return errorResponse('User ID is required', 400);
    }
    
    // Don't allow deleting self
    if (userId === user.id) {
      return forbiddenResponse('Cannot delete your own account');
    }
    
    // Soft delete - deactivate user instead of deleting
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).select('-password');
    
    if (!deletedUser) {
      return notFoundResponse('User not found');
    }
    
    return successResponse(null, 'User deactivated successfully');
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return serverErrorResponse('Failed to delete user');
  }
}