import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { fetchPhotos } from "@/lib/api";
import PhotoGrid from "@/components/PhotoGrid";
import { randomBetween } from "@/lib/utils";
import { PhotoGridSkeleton } from "@/components/PhotoGridSkeleton";

/**
 * Home page - displays the photo gallery
 * Uses SSR for optimal SEO and performance
 */
export default async function HomePage() {
  //   const photos = await fetchPhotos(randomBetween(1, 20), 16);
  const photos = await fetchPhotos(5, 16);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">Curated Collection</span>
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Discover <span className="text-gradient">Extraordinary</span> Moments
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore a handpicked selection of stunning photographs from talented artists around the world. Click any image
          to view details or save your favorites.
        </p>
      </section>

      {/* Photo Grid */}
      <Suspense fallback={<PhotoGridSkeleton />}>
        <PhotoGrid photos={photos} />
      </Suspense>

      {/* Stats Section */}
      {photos && photos.length > 0 && (
        <section className="mt-16 border-t border-border/50 pt-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-foreground">{photos.length}</p>
              <p className="mt-1 text-sm text-muted-foreground">Photos</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-foreground">
                {new Set(photos.map((p) => p.user.id)).size}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Artists</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-foreground">
                {photos.reduce((sum, p) => sum + p.likes, 0).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Total Likes</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-primary">∞</p>
              <p className="mt-1 text-sm text-muted-foreground">Inspiration</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
