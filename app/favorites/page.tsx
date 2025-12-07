import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import PhotoGrid from "@/components/PhotoGrid";

/**
 * Favorites page
 * Displays user's favorited photos
 * Client component for Redux state access
 */
export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="my-12 text-center">
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 p-3 mb-4">
          <Heart className="size-8 text-primary fill-primary" />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Your Favorites</h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
          Will show up in future. Please check back later.
        </p>
      </section>

      {/* Content */}
    </div>
  );
}
