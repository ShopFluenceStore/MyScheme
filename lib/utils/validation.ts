import { z } from 'zod';

// User validation schemas
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

// Scheme validation schemas
export const schemeSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title too long'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().optional(),
  launchDate: z.string().optional(),
  deadline: z.string().optional(),
  state: z.string().min(1, 'State is required'),
  logo: z.string().url().optional().or(z.literal('')),
  isNew: z.boolean().default(false),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed'),
  benefits: z.array(z.string()).max(20, 'Maximum 20 benefits allowed'),
  eligibility: z.array(z.string()).optional(),
  documentsRequired: z.array(z.string()).optional(),
  ministry: z.string().optional(),
  applyLink: z.string().url().optional().or(z.literal(''))
});

export const updateSchemeSchema = schemeSchema.partial();

// Site config validation
export const siteConfigSchema = z.object({
  siteTitle: z.string().min(1, 'Site title is required').max(100),
  metaDescription: z.string().min(1, 'Meta description is required').max(300),
  logoURL: z.string().url().optional().or(z.literal('')),
  faviconURL: z.string().url().optional().or(z.literal('')),
  theme: z.enum(['light', 'dark', 'auto']),
  maintenanceMode: z.boolean(),
  allowedTags: z.array(z.string()).max(50, 'Maximum 50 tags allowed'),
  socialLinks: z.object({
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional()
  }).optional(),
  seoSettings: z.object({
    metaTitle: z.string().max(60, 'Meta title too long'),
    metaDescription: z.string().max(160, 'Meta description too long'),
    keywords: z.array(z.string()).max(20, 'Maximum 20 keywords allowed')
  }).optional()
});

// Search validation
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100),
  category: z.string().optional(),
  state: z.string().optional(),
  type: z.enum(['all', 'schemes', 'users', 'categories']).default('all'),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10)
});

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { success: false, error: firstError.message };
    }
    return { success: false, error: 'Invalid data format' };
  }
}