"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Save, 
  Upload, 
  Settings, 
  Palette, 
  Globe, 
  Shield, 
  Tag,
  Plus,
  X,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo: string;
  favicon: string;
  theme: 'light' | 'dark' | 'auto';
  maintenanceMode: boolean;
  allowedTags: string[];
  socialLinks: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export default function AdminSettingsPage() {
  // Demo admin user
  const demoUser = {
    name: "Demo Admin",
    email: "admin@example.com",
    role: "admin"
  };

  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "MyScheme",
    siteDescription: "Government Schemes Portal for Citizens",
    siteUrl: "https://myscheme.gov.in",
    logo: "/images/logo/logo1.svg",
    favicon: "/favicon.ico",
    theme: 'light',
    maintenanceMode: false,
    allowedTags: ["Education", "Healthcare", "Agriculture", "Finance", "Women Empowerment", "Startup"],
    socialLinks: {
      twitter: "myscheme_gov",
      facebook: "myscheme.gov",
      linkedin: "myscheme-gov",
      youtube: "myscheme_official"
    },
    seoSettings: {
      metaTitle: "MyScheme - Government Schemes Portal",
      metaDescription: "Discover and access government schemes and benefits designed for Indian citizens.",
      keywords: ["government schemes", "benefits", "india", "citizens", "welfare"]
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  useEffect(() => {
    // Load settings from API
    const loadSettings = async () => {
      try {
        // Mock API call - replace with actual API
        // const response = await fetch('/api/admin/settings');
        // const data = await response.json();
        // setSettings(data);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call to save settings
      // await fetch('/api/admin/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // });
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !settings.allowedTags.includes(newTag.trim())) {
      setSettings(prev => ({
        ...prev,
        allowedTags: [...prev.allowedTags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSettings(prev => ({
      ...prev,
      allowedTags: prev.allowedTags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !settings.seoSettings.keywords.includes(newKeyword.trim())) {
      setSettings(prev => ({
        ...prev,
        seoSettings: {
          ...prev.seoSettings,
          keywords: [...prev.seoSettings.keywords, newKeyword.trim()]
        }
      }));
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setSettings(prev => ({
      ...prev,
      seoSettings: {
        ...prev.seoSettings,
        keywords: prev.seoSettings.keywords.filter(keyword => keyword !== keywordToRemove)
      }
    }));
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Site Settings</h1>
            <p className="text-[var(--sub-text)]">
              Configure your site's appearance, content, and functionality
            </p>
          </div>
          
          <Button 
            onClick={handleSave} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            ) : saved ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>

        <div className="space-y-8">
          {/* General Settings */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 text-[var(--primary)] mr-2" />
              <h2 className="text-xl font-semibold text-[var(--text)]">General Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Site URL
                </label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          {/* Branding */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center mb-4">
              <Upload className="w-5 h-5 text-[var(--primary)] mr-2" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Branding</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Logo
                </label>
                <div className="flex items-center space-x-4">
                  <Image
                    src={settings.logo}
                    alt="Site Logo"
                    width={48}
                    height={48}
                    className="rounded-lg border border-[var(--border)]"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={settings.logo}
                      onChange={(e) => setSettings(prev => ({ ...prev, logo: e.target.value }))}
                      placeholder="Logo URL"
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Favicon
                </label>
                <input
                  type="text"
                  value={settings.favicon}
                  onChange={(e) => setSettings(prev => ({ ...prev, favicon: e.target.value }))}
                  placeholder="Favicon URL"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center mb-4">
              <Palette className="w-5 h-5 text-[var(--primary)] mr-2" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Theme Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Default Theme
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenance"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                  className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-[var(--border)] rounded"
                />
                <label htmlFor="maintenance" className="ml-2 text-sm text-[var(--text)]">
                  Enable Maintenance Mode
                </label>
                {settings.maintenanceMode && (
                  <div className="ml-2 flex items-center text-orange-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span className="text-xs">Site will be unavailable to users</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags Management */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center mb-4">
              <Tag className="w-5 h-5 text-[var(--primary)] mr-2" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Allowed Tags</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add new tag"
                  className="flex-1 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {settings.allowedTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--primary)] text-white rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 text-[var(--primary)] mr-2" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Social Links</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Twitter
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.twitter || ''}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                  }))}
                  placeholder="@username"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Facebook
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.facebook || ''}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                  }))}
                  placeholder="page-name"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.linkedin || ''}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                  }))}
                  placeholder="company-name"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  YouTube
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.youtube || ''}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    socialLinks: { ...prev.socialLinks, youtube: e.target.value }
                  }))}
                  placeholder="channel-name"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-[var(--primary)] mr-2" />
              <h2 className="text-xl font-semibold text-[var(--text)]">SEO Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={settings.seoSettings.metaTitle}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    seoSettings: { ...prev.seoSettings, metaTitle: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Meta Description
                </label>
                <textarea
                  value={settings.seoSettings.metaDescription}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    seoSettings: { ...prev.seoSettings, metaDescription: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  SEO Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                    placeholder="Add SEO keyword"
                    className="flex-1 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  <Button onClick={addKeyword} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {settings.seoSettings.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}