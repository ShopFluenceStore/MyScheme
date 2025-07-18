import { NextRequest } from 'next/server';
import dbConnect from '../../../../lib/db';
import SiteConfig from '../../../../lib/models/SiteConfig';
import { getAuthUser, isAdmin } from '../../../../lib/utils/auth';
import { validateRequest, siteConfigSchema } from '../../../../lib/utils/validation';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '../../../../lib/utils/response';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    let config = await SiteConfig.findOne();
    
    // Create default config if none exists
    if (!config) {
      config = await SiteConfig.create({
        siteTitle: 'MyScheme',
        metaDescription: 'Government Schemes Portal',
        allowedTags: ['Education', 'Healthcare', 'Agriculture', 'Finance', 'Women Empowerment', 'Startup'],
        seoSettings: {
          keywords: ['government schemes', 'benefits', 'india', 'citizens', 'welfare']
        }
      });
    }
    
    return successResponse(config);
    
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return serverErrorResponse('Failed to fetch site settings');
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }
    
    if (!isAdmin(user)) {
      return forbiddenResponse('Admin access required');
    }
    
    await dbConnect();
    
    const body = await request.json();
    
    // Validate request data
    const validation = validateRequest(siteConfigSchema, body);
    if (!validation.success) {
      return errorResponse(validation.error, 400);
    }
    
    const configData = validation.data;
    
    // Update or create site config
    let config = await SiteConfig.findOne();
    
    if (config) {
      // Update existing config
      Object.assign(config, configData);
      await config.save();
    } else {
      // Create new config
      config = await SiteConfig.create(configData);
    }
    
    return successResponse(config, 'Site settings updated successfully');
    
  } catch (error) {
    console.error('Error updating site settings:', error);
    return serverErrorResponse('Failed to update site settings');
  }
}