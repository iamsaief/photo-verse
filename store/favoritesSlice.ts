import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Favorites slice for Redux Toolkit
 * Manages the list of favorited photo IDs
 */
interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = {
  ids: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    /**
     * Adds a photo ID to favorites
     */
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    /**
     * Removes a photo ID from favorites
     */
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    /**
     * Toggles a photo's favorite status
     */
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.ids.indexOf(action.payload);
      if (index === -1) {
        state.ids.push(action.payload);
      } else {
        state.ids.splice(index, 1);
      }
    },
    /**
     * Sets all favorites (used for hydration from localStorage)
     */
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.ids = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
