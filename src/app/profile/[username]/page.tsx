"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  User, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Mail,
  Twitter,
  Github,
  Linkedin,
  Globe,
  FileText,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import SchemeCard from "@/components/schemes/SchemeCard";

interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  joinedDate: string;
  schemesCount: number;
  bookmarksCount: number;
  schemes: any[];
}

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'schemes' | 'bookmarks'>('schemes');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Mock data - replace with actual API call
        const mockProfile: UserProfile = {
          id: '1',
          username: username,
          name: 'John Doe',
          email: 'john@example.com',
          bio: 'Government schemes enthusiast helping citizens access their benefits. Passionate about digital governance and public welfare.',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('John Doe')}&background=16a34a&color=fff&size=200`,
          location: 'New Delhi, India',
          website: 'https://johndoe.com',
          twitter: 'johndoe',
          github: 'johndoe',
          linkedin: 'johndoe',
          joinedDate: '2023-01-15',
          schemesCount: 12,
          bookmarksCount: 45,
          schemes: []
        };
        
        setProfile(mockProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!profile) {
    notFound();
  }

  const socialLinks = [
    { icon: Globe, url: profile.website, label: 'Website' },
    { icon: Twitter, url: profile.twitter ? `https://twitter.com/${profile.twitter}` : null, label: 'Twitter' },
    { icon: Github, url: profile.github ? `https://github.com/${profile.github}` : null, label: 'GitHub' },
    { icon: Linkedin, url: profile.linkedin ? `https://linkedin.com/in/${profile.linkedin}` : null, label: 'LinkedIn' },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={profile.avatar || '/images/default-avatar.png'}
                alt={profile.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-[var(--primary)]"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[var(--text)] mb-1">
                    {profile.name}
                  </h1>
                  <p className="text-[var(--sub-text)] text-lg">@{profile.username}</p>
                </div>
                
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="primary" size="sm">
                    Follow
                  </Button>
                </div>
              </div>

              {profile.bio && (
                <p className="text-[var(--text)] mb-4 leading-relaxed">
                  {profile.bio}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--sub-text)] mb-4">
                {profile.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profile.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </div>
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex gap-3">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                      title={link.label}
                    >
                      <link.icon className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[var(--border)]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">
                {profile.schemesCount}
              </div>
              <div className="text-sm text-[var(--sub-text)]">Schemes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">
                {profile.bookmarksCount}
              </div>
              <div className="text-sm text-[var(--sub-text)]">Bookmarks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">
                1.2K
              </div>
              <div className="text-sm text-[var(--sub-text)]">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">
                234
              </div>
              <div className="text-sm text-[var(--sub-text)]">Following</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]">
          {/* Tab Navigation */}
          <div className="border-b border-[var(--border)]">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('schemes')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'schemes'
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--sub-text)] hover:text-[var(--text)]'
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Published Schemes ({profile.schemesCount})
              </button>
              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'bookmarks'
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--sub-text)] hover:text-[var(--text)]'
                }`}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmarked ({profile.bookmarksCount})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'schemes' && (
              <div>
                {profile.schemes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profile.schemes.map((scheme) => (
                      <SchemeCard
                        key={scheme.id}
                        {...scheme}
                        onClick={(id) => window.open(`/schemes/${id}`, '_blank')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-[var(--sub-text)] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-[var(--text)] mb-2">
                      No schemes published yet
                    </h3>
                    <p className="text-[var(--sub-text)]">
                      {profile.name} hasn't published any schemes yet.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookmarks' && (
              <div className="text-center py-12">
                <Bookmark className="w-16 h-16 text-[var(--sub-text)] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[var(--text)] mb-2">
                  Bookmarked schemes are private
                </h3>
                <p className="text-[var(--sub-text)]">
                  Only {profile.name} can see their bookmarked schemes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}