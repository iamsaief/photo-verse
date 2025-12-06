import { memo } from "react";
import { ImageOff } from "lucide-react";
import { Photo } from "@/types/photo";
import PhotoCard from "./PhotoCard";

interface PhotoGridProps {
  photos: Photo[];
}

/**
 * PhotoGrid component
 * Responsive masonry-style grid layout
 * Server component for optimal SSR
 */
const PhotoGrid = memo(function PhotoGrid({ photos }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-gray-800 p-6">
          <ImageOff className="h-12 w-12 text-gray-500" />
        </div>
        <h3 className="font-display text-xl font-semibold text-white">No photos found</h3>
        <p className="mt-2 text-gray-400">Check back later for new additions to the gallery.</p>
      </div>
    );
  }

  return (
    <div
      className="grid auto-rows-[200px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="list"
      aria-label="Photo gallery"
    >
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          index={index}
          priority={index < 4} // Prioritize first 4 images for LCP
        />
      ))}
    </div>
  );
});

export default PhotoGrid;
