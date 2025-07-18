import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import User from '../../../../lib/models/User';
import { hashPassword } from '../../../../lib/utils/auth';
import { validateRequest, signupSchema } from '../../../../lib/utils/validation';
import { successResponse, errorResponse, serverErrorResponse } from '../../../../lib/utils/response';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validation = validateRequest(signupSchema, body);
    if (!validation.success) {
      return errorResponse(validation.error, 400);
    }
    
    const { name, email, password } = validation.data;

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ 
      email: email.toLowerCase() 
    });
    
    if (existingUser) {
      return errorResponse('User with this email already exists', 409);
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=16a34a&color=fff`,
      isActive: true
    });
    
    // Return user data without password
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    };
    
    return successResponse(userData, 'Account created successfully', 201);
    
  } catch (error) {
    console.error('Signup error:', error);
    return serverErrorResponse('Failed to create account');
  }
}