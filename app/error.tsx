"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Gallery error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 p-4 rounded-full bg-red-500/10">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-gray-400 mb-6 max-w-md">We couldn't load the photos. Please try again.</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-gray-900 font-medium hover:bg-primary transition-colors cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
