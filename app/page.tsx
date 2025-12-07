import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { fetchPhotos } from "@/lib/api";
import PhotoGrid from "@/components/PhotoGrid";
import { randomBetween } from "@/lib/utils";

/**
 * Home page - displays the photo gallery
 * Uses SSR for optimal SEO and performance
 */
export default async function HomePage() {
  const photos = await fetchPhotos(randomBetween(1, 20), 16);

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
      <Suspense fallback={"Loading photos..."}>
        <PhotoGrid photos={photos} />
      </Suspense>
    </div>
  );
}
