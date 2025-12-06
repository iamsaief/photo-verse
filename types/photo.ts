/**
 * Photo type definitions for the gallery application
 * Strong TypeScript interfaces following best practices
 */

export interface PhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface PhotoUser {
  id: string;
  username: string;
  name: string;
  portfolio_url: string | null;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface Photo {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: PhotoUrls;
  links: {
    self: string;
    html: string;
    download: string;
  };
  likes: number;
  user: PhotoUser;
}

export interface PhotosResponse {
  photos: Photo[];
  total: number;
  totalPages: number;
}

// API response type from Picsum
export interface PicsumPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
