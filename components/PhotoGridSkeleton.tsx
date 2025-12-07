import { cn } from "@/lib/utils";

/**
 * PhotoGridSkeleton Component
 * Loading state placeholder for the photo grid
 * Creates visual consistency during data fetching
 */
export function PhotoGridSkeleton() {
  // Generate varied heights for skeleton cards
  const skeletonCards = [
    { rowSpan: "row-span-2" },
    { rowSpan: "row-span-1" },
    { rowSpan: "row-span-1" },
    { rowSpan: "row-span-2" },
    { rowSpan: "row-span-1" },
    { rowSpan: "row-span-2" },
    { rowSpan: "row-span-1" },
    { rowSpan: "row-span-1" },
  ];

  return (
    <div
      className="grid auto-rows-[200px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading photos"
    >
      {skeletonCards.map((card, index) => (
        <div
          key={index}
          className={cn("relative overflow-hidden rounded-lg bg-card", card.rowSpan, "animate-pulse")}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Gradient shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />

          {/* Content skeleton */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted-foreground/10" />
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-muted-foreground/10" />
              <div className="h-3 w-24 rounded bg-muted-foreground/10" />
            </div>
          </div>

          {/* Favorite button skeleton */}
          <div className="absolute right-3 top-3 h-10 w-10 rounded-full bg-muted-foreground/10" />
        </div>
      ))}
    </div>
  );
}
