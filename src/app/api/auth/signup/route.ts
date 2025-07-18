import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

// Type definitions
interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  emailVerified: Date | null;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  image: string;
}

// Helper function to validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate password strength
const isStrongPassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/(?=.*[0-9])/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true };
};

export async function POST(request: Request) {
  console.log('Signup request received');
  
  try {
    // Parse request body
    const { name, email, password } = await request.json();
    console.log('Received signup data:', { name, email, password: password ? '[HIDDEN]' : 'undefined' });
    
    // Validate input
    if (!name || !email || !password) {
      const errorMessage = !name ? 'Name is required' : !email ? 'Email is required' : 'Password is required';
      console.error('Validation failed:', errorMessage);
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 400 }
      );
    }

    // Trim and normalize email
    const emailLower = email.toLowerCase().trim();

    // Validate email format
    if (!isValidEmail(emailLower)) {
      console.error('Invalid email format:', emailLower);
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = isStrongPassword(password);
    if (!passwordValidation.valid) {
      console.error('Password validation failed:', passwordValidation.message);
      return NextResponse.json(
        { success: false, message: passwordValidation.message },
        { status: 400 }
      );
    }

    // Connect to database
    let db;
    try {
      const dbConnection = await connectToDatabase();
      if (!dbConnection || !dbConnection.db) {
        throw new Error('Failed to connect to database');
      }
      db = dbConnection.db;
      console.log('Successfully connected to database');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database connection error',
          ...(process.env.NODE_ENV === 'development' && { error: (dbError as Error).message })
        },
        { status: 500 }
      );
    }

    console.log('Processing signup for email:', emailLower);

    try {
      // Check if user already exists (case-insensitive check)
      const existingUser = await db.collection('users').findOne({
        email: emailLower
      });

      if (existingUser) {
        console.log('User already exists:', emailLower);
        return NextResponse.json(
          { success: false, message: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      // Hash password
      console.log('Hashing password...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user with additional required fields
      const userData = {
        name: name.trim(),
        email: emailLower,
        password: hashedPassword,
        emailVerified: null,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=random`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log('Creating new user with data:', { ...userData, password: '[HIDDEN]' });
      
      // Insert the new user
      const result = await db.collection('users').insertOne(userData);
      
      if (!result.acknowledged) {
        console.error('Failed to insert user into database');
        throw new Error('Failed to create user');
      }

      console.log('User created successfully with ID:', result.insertedId);
      
      // Get the created user to return
      const createdUser = await db.collection('users').findOne(
        { _id: result.insertedId },
        { projection: { password: 0 } } // Exclude password from result
      ) as User | null;

      if (!createdUser) {
        throw new Error('Failed to retrieve created user');
      }

      // Create response object without sensitive data
      const userResponse: UserResponse = {
        id: createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
        image: createdUser.image,
      };

      // Auto-login is handled by the client after successful signup
      // The client will handle the sign-in process after receiving success response

      // Return success response with user data
      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: userResponse,
      }, { status: 201 });

    } catch (error) {
      console.error('Error during signup:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to create account. Please try again.',
          ...(process.env.NODE_ENV === 'development' && { error: errorMessage })
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error during signup:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}
