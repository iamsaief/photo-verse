import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Download, Heart, Eye, User, Share2, ExternalLink, ImageIcon } from "lucide-react";
import { fetchPhotoById } from "@/lib/api";
import { formatNumber } from "@/lib/utils";
import FavoriteButton from "@/components/FavoriteButton";

interface PhotoDetailPageProps {
  params: { id: string };
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PhotoDetailPageProps) {
  const { id } = await params;
  const photo = await fetchPhotoById(id);

  if (!photo) {
    return { title: "Photo Not Found" };
  }

  return {
    title: `${photo.alt_description || "Photo"} by ${photo.user.name} | Gallery`,
    description: photo.description || `Beautiful photograph by ${photo.user.name}`,
  };
}

/**
 * Photo detail page
 * Displays full-size photo with metadata
 */
export default async function PhotoDetailPage({ params }: PhotoDetailPageProps) {
  const { id } = await params;

  const photo = await fetchPhotoById(id);

  if (!photo) {
    notFound();
  }

  const formattedDate = new Date(photo.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pb-12">
        {/* Back button */}
        <div className="my-10">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Gallery</span>
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-800">
              <Image
                src={photo.urls.regular}
                alt={photo.alt_description || `Photo by ${photo.user.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Title & Description */}
            <div className="space-y-3">
              <h1 className="font-display font-bold text-foreground lg:text-3xl text-2xl">
                {photo.description || photo.alt_description || "Untitled"}
              </h1>
              {photo.alt_description && photo.description && (
                <p className="text-muted-foreground">{photo.alt_description}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {/* Favorite button */}
              <FavoriteButton
                photoId={photo.id}
                customClassName="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />

              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <a
                href={photo.urls.full}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>

            {/* Photographer info */}
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-4">
                <Image
                  src={photo.user.profile_image.medium}
                  alt={`${photo.user.name}'s profile`}
                  width={14 * 4}
                  height={14 * 4}
                  className="h-14 w-14 rounded-full ring-2 ring-border"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-foreground">{photo.user.name}</h4>
                  <p className="text-sm text-muted-foreground">@{photo.user.username}</p>
                </div>
                {photo.user.portfolio_url && (
                  <a
                    href={photo.user.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="View portfolio"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Photo metadata */}
            <div className="space-y-4">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Photo Details
              </h2>
              <dl className="grid gap-3">
                <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Published</dt>
                    <dd className="font-medium text-foreground">{formattedDate}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Resolution</dt>
                    <dd className="font-medium text-foreground">
                      {photo.width} × {photo.height}
                    </dd>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                  <Heart className="h-5 w-5 text-primary" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Likes</dt>
                    <dd className="font-medium text-foreground">{photo.likes.toLocaleString()}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Photographer</dt>
                    <dd className="font-medium text-foreground">{photo.user.name}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
