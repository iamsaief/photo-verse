import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, RootState, AppStore } from "./store";

/**
 * Typed hooks for Redux
 * Use these instead of plain useDispatch/useSelector
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

/**
 * Custom hook for favorites functionality
 */
export const useFavorites = () => {
  const favorites = useAppSelector((state) => state.favorites.ids);

  const isFavorite = (id: string): boolean => {
    return favorites.includes(id);
  };

  return {
    favorites,
    isFavorite,
  };
};
