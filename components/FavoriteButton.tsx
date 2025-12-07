"use client";

import { memo, useCallback } from "react";
import { Heart } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { toggleFavorite } from "@/store/favoritesSlice";
import { useFavorites } from "@/store/hooks";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  photoId: string;
  size?: "sm" | "md" | "lg";
  customClassName?: string;
}

/**
 * FavoriteButton component
 * Toggles favorite status with animation feedback
 * Memoized to prevent unnecessary re-renders
 */
const FavoriteButton = memo(function FavoriteButton({ photoId, size = "md", customClassName }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const { isFavorite } = useFavorites();
  const favorited = isFavorite(photoId);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(toggleFavorite(photoId));
    },
    [dispatch, photoId]
  );

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2.5 transition-all duration-300",
        "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        customClassName,
        favorited
          ? "bg-primary text-primary-foreground shadow-glow"
          : "bg-background/80 text-foreground backdrop-blur-sm hover:bg-background"
      )}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorited}
    >
      <Heart className={cn("h-5 w-5 transition-transform", favorited && "fill-current")} />
    </button>
  );
});

export default FavoriteButton;
