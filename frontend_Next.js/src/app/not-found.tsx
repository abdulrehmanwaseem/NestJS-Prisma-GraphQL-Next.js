"use client";

import { HomeIcon, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 text-white">
      <div className="max-w-md w-full space-y-8 text-center text-white">
        {/* Glitch effect for 404 */}
        <div className="relative">
          <h1 className="text-[150px] font-bold text-primary/10 select-none">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Oops! Page not found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4  justify-center pt-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-full text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <span>Go Back</span>
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-full gradient-primary gradient-hover text-white transition-all"
          >
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
