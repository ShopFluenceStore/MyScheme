import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function getAuthUser(req: NextRequest) {
  try {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    if (!token || !token.id) {
      return null;
    }
    
    return {
      id: token.id as string,
      email: token.email as string,
      name: token.name as string,
      role: token.role as string
    };
  } catch (error) {
    console.error('Error getting auth user:', error);
    return null;
  }
}

export function isAdmin(user: { role: string } | null): boolean {
  return user?.role === 'admin';
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}