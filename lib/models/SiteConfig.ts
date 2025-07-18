import mongoose, { Schema, models } from "mongoose";

const SiteConfigSchema = new Schema({
  siteTitle: { type: String, required: true, default: "MyScheme" },
  metaDescription: { type: String, required: true, default: "Government Schemes Portal" },
  logoURL: { type: String, default: "/images/logo/logo1.svg" },
  faviconURL: { type: String, default: "/favicon.ico" },
  theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'light' },
  maintenanceMode: { type: Boolean, default: false },
  allowedTags: [{ type: String }],
  socialLinks: {
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  seoSettings: {
    metaTitle: { type: String, default: "MyScheme - Government Schemes Portal" },
    metaDescription: { type: String, default: "Discover government schemes and benefits" },
    keywords: [{ type: String }]
  }
}, { timestamps: true });

const SiteConfig = models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);
export default SiteConfig;