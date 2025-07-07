"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { StaticImageData } from "next/image";

interface CarouselImage {
  src: string | StaticImageData;
  link?: string;
}

interface CarouselProps {
  images: (string | StaticImageData | CarouselImage)[];
  autoSlideInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoSlideInterval = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoSlideInterval, isAutoPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide, isAutoPlaying]);

  // Touch/swipe support
  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = startX - endX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    const carousel = document.querySelector(".carousel-container");
    if (carousel) {
      carousel.addEventListener(
        "touchstart",
        handleTouchStart as EventListener,
        { passive: true }
      );
      carousel.addEventListener("touchmove", handleTouchMove as EventListener, {
        passive: true,
      });
      carousel.addEventListener("touchend", handleTouchEnd as EventListener, {
        passive: true,
      });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener(
          "touchstart",
          handleTouchStart as EventListener
        );
        carousel.removeEventListener(
          "touchmove",
          handleTouchMove as EventListener
        );
        carousel.removeEventListener(
          "touchend",
          handleTouchEnd as EventListener
        );
      }
    };
  }, [nextSlide, prevSlide]);

  const slideContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-[50vh] xs:h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen overflow-hidden carousel-container">
      {/* Carousel Container */}
      <div
        ref={slideContainerRef}
        className="relative w-full h-full overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: 'transform'
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full relative">
              <div className="relative w-full h-full">
                {typeof image === "object" && "link" in image ? (
                  <a href={image.link} className="block w-full h-full">
                    <Image
                      src={image.src}
                      alt={`Slide ${index + 1}`}
                      // fill
                      width={1920}
                      height={1080}
                      priority={index === 0}
                      className="w-full h-full object-cover xs:object-contain sm:object-cover transition-opacity duration-700 ease-in-out"
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 100vw"
                      style={{
                        opacity: index === currentSlide ? 1 : 0,
                        transition: "opacity 700ms ease-in-out",
                      }}
                      loading={index < 2 ? 'eager' : 'lazy'}
                    />
                  </a>
                ) : (
                  <Image
                    src={image as string | StaticImageData}
                    alt={`Slide ${index + 1}`}
                    // fill
                    width={1920}
                    height={1080}
                    priority={index === 1}
                    className="w-full h-full object-cover xs:object-contain sm:object-cover transition-opacity duration-700 ease-in-out"
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 100vw"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      transition: "opacity 700ms ease-in-out",
                    }}
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-1 sm:left-2 md:left-4 -translate-y-1/2 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--border)] text-[var(--text)] hover:bg-[var(--gray)] hover:text-[var(--white)] backdrop-blur-md border-none p-2 sm:p-3 md:p-3 lg:p-4 cursor-pointer transition-all duration-200 ease-in-out z-10 shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]"
          style={{
            minWidth: '2.5rem',
            minHeight: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-1 sm:right-2 md:right-4 -translate-y-1/2 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--border)] text-[var(--text)] hover:bg-[var(--gray)] hover:text-[var(--white)] backdrop-blur-md border-none p-2 sm:p-3 md:p-3 lg:p-4 cursor-pointer transition-all duration-200 ease-in-out z-10 shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]"
          style={{
            minWidth: '2.5rem',
            minHeight: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 rounded-full cursor-pointer transition-all duration-200 ease-in-out border-2 ${
                index === currentSlide
                  ? "bg-[var(--primary)] scale-125 border-[var(--text)]"
                  : "bg-[var(--bg-primary)] hover:bg-[var(--primary)] hover:scale-110"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
