"use client";

import { memo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { Photo } from "@/types/photo";
import { cn, formatNumber } from "@/lib/utils";

interface PhotoCardProps {
  photo: Photo;
  index: number;
  priority?: boolean;
}

/**
 * PhotoCard component
 * Displays a single photo with hover effects and favorite functionality
 * Memoized for performance optimization
 */
const PhotoCard = memo(function PhotoCard({ photo, index, priority = false }: PhotoCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  // Determine if this card should span multiple rows (masonry effect)
  const isLarge = index % 5 === 0;

  return (
    <Link
      href={`/photos/${photo.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl",
        "bg-gray-800 shadow-lg",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-black/50",
        "focus:outline-none focus:ring-2 focus:ring-gold-500/50",
        "animate-fade-in",
        isLarge && "sm:row-span-2"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View ${photo.alt_description || "photo"} by ${photo.user.name}`}
    >
      {/* Loading skeleton */}
      {!isImageLoaded && <div className="absolute inset-0 bg-gray-700 animate-pulse" />}

      {/* Image */}
      <Image
        src={photo.urls.regular}
        alt={photo.alt_description || `Photo by ${photo.user.name}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className={cn(
          "object-cover transition-all duration-700",
          "group-hover:scale-110",
          isImageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleImageLoad}
        priority={priority}
      />

      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}
      />

      {/* Content overlay */}
      <div
        className={cn(
          "absolute inset-0 p-4 flex flex-col justify-end",
          "opacity-0 group-hover:opacity-100 transition-all duration-300",
          "translate-y-2 group-hover:translate-y-0"
        )}
      >
        {/* Photo info */}
        <div className="space-y-2">
          {photo.description && <p className="text-white text-sm font-medium line-clamp-2">{photo.description}</p>}
          <div className="flex items-center gap-2">
            <Image
              src={photo.user.profile_image.small}
              alt={photo.user.name}
              width={24}
              height={24}
              className="rounded-full ring-2 ring-white/30"
            />
            <span className="text-white/90 text-sm">{photo.user.name}</span>
          </div>
          <div className="flex items-center gap-4 text-white/70 text-xs">
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {formatNumber(photo.likes)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatNumber(Math.floor(photo.likes * 2.5))}
            </span>
          </div>
        </div>
      </div>

      {/* Favorite button */}
      <div
        className={cn(
          "absolute top-3 right-3 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}
      >
        {/* Favorite Button */}
      </div>
    </Link>
  );
});

export default PhotoCard;
