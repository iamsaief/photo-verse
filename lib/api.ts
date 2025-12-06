import { Photo, PicsumPhoto } from "@/types/photo";

const PICSUM_BASE_URL = "https://picsum.photos";

/**
 * Transforms Picsum API response to our Photo interface
 * This ensures type safety and consistent data structure
 */
function transformPicsumPhoto(picsumPhoto: PicsumPhoto): Photo {
  const randomLikes = Math.floor(Math.random() * 5000) + 100;

  return {
    id: picsumPhoto.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    width: picsumPhoto.width,
    height: picsumPhoto.height,
    color: "#1a1a2e",
    blur_hash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    description: `Beautiful photograph by ${picsumPhoto.author}`,
    alt_description: `Photo by ${picsumPhoto.author}`,
    urls: {
      raw: picsumPhoto.download_url,
      full: picsumPhoto.download_url,
      regular: `${PICSUM_BASE_URL}/id/${picsumPhoto.id}/1080/720`,
      small: `${PICSUM_BASE_URL}/id/${picsumPhoto.id}/640/480`,
      thumb: `${PICSUM_BASE_URL}/id/${picsumPhoto.id}/200/200`,
    },
    links: {
      self: picsumPhoto.url,
      html: picsumPhoto.url,
      download: picsumPhoto.download_url,
    },
    likes: randomLikes,
    user: {
      id: picsumPhoto.author.toLowerCase().replace(/\s+/g, "-"),
      username: picsumPhoto.author.toLowerCase().replace(/\s+/g, "_"),
      name: picsumPhoto.author,
      portfolio_url: null,
      profile_image: {
        small: `https://i.pravatar.cc/32?u=${picsumPhoto.author}`,
        medium: `https://i.pravatar.cc/64?u=${picsumPhoto.author}`,
        large: `https://i.pravatar.cc/128?u=${picsumPhoto.author}`,
      },
    },
  };
}

/**
 * Fetches photos from Picsum API
 * Server-side function for Next.js SSR
 */
export async function fetchPhotos(page: number = 1, limit: number = 12): Promise<Photo[]> {
  const response = await fetch(`${PICSUM_BASE_URL}/v2/list?page=${page}&limit=${limit}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.status}`);
  }

  const picsumPhotos: PicsumPhoto[] = await response.json();

  return picsumPhotos.map(transformPicsumPhoto);
}

/**
 * Fetches a single photo by ID
 * Server-side function for Next.js SSR
 */
export async function fetchPhotoById(id: string): Promise<Photo | null> {
  try {
    const response = await fetch(`${PICSUM_BASE_URL}/id/${id}/info`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const picsumPhoto: PicsumPhoto = await response.json();

    return transformPicsumPhoto(picsumPhoto);
  } catch (error) {
    console.error("Error fetching photo:", error);

    return null;
  }
}
