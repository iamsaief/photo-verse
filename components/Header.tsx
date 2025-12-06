"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Heart, Home } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Header Component
 * Main navigation header with logo and nav links
 * Shows favorites count badge
 */
export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Gallery", icon: Home },
    { path: "/favorites", label: "Favorites", icon: Heart },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-colors hover:text-primary"
            aria-label="Lumière Gallery - Home"
          >
            <div className="relative">
              <Camera className="h-7 w-7 transition-transform group-hover:scale-110" />
              <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">Lumière</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {navItems.map(({ path, label, icon: Icon, count }) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    "relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                    "hover:bg-secondary hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                  {count !== undefined && count > 0 && (
                    <span
                      className={cn(
                        "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center",
                        "rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
                        "animate-scale-in"
                      )}
                      aria-label={`${count} favorites`}
                    >
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
