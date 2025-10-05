"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export type GalleryImage = { src: string; alt?: string };

export default function Gallery({
  images,
  ratio = "aspect-[4/3]",
  startIndex = 0,
  thumbCount = 6,
}: {
  images: GalleryImage[];
  ratio?: string;       // tailwind ratio class
  startIndex?: number;
  thumbCount?: number;  // how many thumbs to show
}) {
  const [index, setIndex] = useState(Math.min(startIndex, images.length - 1));
  const trackRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((i: number) => {
    if (!images.length) return;
    const next = (i + images.length) % images.length;
    setIndex(next);
    trackRef.current?.scrollTo({ left: next * (trackRef.current.clientWidth || 1), behavior: "smooth" });
  }, [images.length]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  // handle swipe
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  if (!images.length) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-surface-100 ${ratio} flex items-center justify-center`}>
        <svg className="w-24 h-24 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main viewer */}
      <div
        className={`relative overflow-hidden rounded-xl bg-surface-100 ${ratio}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label="Image gallery"
      >
        <div ref={trackRef} className="h-full w-full overflow-hidden">
          <div className="flex h-full w-full">
            {images.map((img, i) => (
              <div key={i} className="relative h-full w-full shrink-0 grow-0 basis-full">
                <Image
                  src={img.src}
                  alt={img.alt || `Gallery image ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand"
              onClick={() => go(index + 1)}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.slice(0, thumbCount).map((img, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md border ${i === index ? "border-brand" : "border-gray-200"}`}
            >
              <Image src={img.src} alt={img.alt || `Thumbnail ${i + 1}`} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
