"use client";
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/Button';
import Image from 'next/image';
interface VideoPlayerProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnailUrl?: string;
  description?: string;
  duration?: string;
  showThumbnail?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  title,
  className = '',
  thumbnailUrl = 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
  description = 'Discover how we\'re transforming access to government schemes',
  duration = '2:45',
  showThumbnail = true,
}) => {
  const [showVideo, setShowVideo] = useState(!showThumbnail);

  const handleVideoPlay = () => {
    setShowVideo(true);
  };

  const videoPlayerContent = !showVideo ? (
    <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-[var(--bg-primary)] ${className}`}>
        {/* Enhanced Video Thumbnail */}
        <div className="relative aspect-video">
          <Image
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
          />

          {/* Enhanced Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-center justify-center">
            {/* Enhanced Play Button */}
            <Button
              onClick={handleVideoPlay}
              className="group relative w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
              variant="primary"
              aria-label={`Play ${title} video`}
            >
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[var(--primary)]"></div>
              <Play
                className="w-6 h-6 lg:w-8 lg:h-8 text-[var(--white)] ml-1 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
              />
            </Button>
          </div>

          {/* Video Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-[var(--white)] bg-black/50 backdrop-blur-sm">
            <span>▶ Watch Overview</span>
          </div>
        </div>

        {/* Enhanced Video Info Bar */}
        <div className="p-6 bg-[var(--bg-primary)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full animate-pulse bg-[var(--primary)]"></div>
              <div>
                <h4 className="text-base font-semibold text-[var(--text)]">
                  {title}
                </h4>
                <p className="text-sm text-[var(--sub-text)]">
                  {description}
                </p>
              </div>
            </div>
            <span className="text-sm font-medium px-2 py-1 rounded text-[var(--primary)] bg-[var(--bg-secondary)]">
              {duration}
            </span>
          </div>
        </div>
    </div>
  ) : (
    <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-[var(--bg-primary)] ${className}`}>
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Enhanced Layered Shadows */}
      <div className="relative">
        {/* Shadow Layer 3 */}
        <div className="absolute inset-0 rounded-3xl transform translate-x-6 translate-y-6 opacity-10 bg-[var(--primary)]"></div>

        {/* Shadow Layer 2 */}
        <div className="absolute inset-0 rounded-3xl transform translate-x-3 translate-y-3 opacity-20 bg-[var(--primary)]"></div>

        {/* Main Video Container */}
        {videoPlayerContent}
      </div>
    </div>
  );
};

export default VideoPlayer;
