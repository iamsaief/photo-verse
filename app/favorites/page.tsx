"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { useFavorites } from "@/store/hooks";
import { fetchPhotoById } from "@/lib/api";
import { Photo } from "@/types/photo";
import PhotoGrid from "@/components/PhotoGrid";
import { PhotoGridSkeleton } from "@/components/PhotoGridSkeleton";

/**
 * Favorites page
 * Displays user's favorited photos
 * Client component for Redux state access
 */
export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavoritePhotos() {
      setIsLoading(true);
      const photoPromises = favorites.map((id) => fetchPhotoById(id));
      const results = await Promise.all(photoPromises);
      setPhotos(results.filter((photo) => photo !== null));
      setIsLoading(false);
    }

    loadFavoritePhotos();
  }, [favorites]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="my-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Gallery</span>
        </Link>
      </div>

      {/* Content */}
      <section aria-label="Favorite photos">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 rounded-full bg-muted p-8">
              <Heart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">No favorites yet</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Browse the gallery and click the heart icon on photos you love to add them to your collection.
            </p>
          </div>
        ) : (
          <>
            {isLoading && <PhotoGridSkeleton />}
            {photos.length > 0 && <PhotoGrid photos={photos} />}
          </>
        )}
      </section>
    </main>
  );
}
