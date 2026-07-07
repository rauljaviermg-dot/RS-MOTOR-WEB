"use client";

import { useState } from "react";
import Image from "next/image";

export default function PhotoGallery({
  fotos,
  alt,
}: {
  fotos: string[];
  alt: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function showPrev() {
    setOpenIndex((i) => (i === null ? null : (i - 1 + fotos.length) % fotos.length));
  }

  function showNext() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % fotos.length));
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {fotos.map((foto, i) => (
          <button
            key={foto}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-lg"
          >
            <Image
              src={foto}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setOpenIndex(null)}
            className="absolute right-4 top-4 text-3xl text-white"
          >
            ×
          </button>

          {fotos.length > 1 && (
            <button
              type="button"
              aria-label="Anterior"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 text-4xl text-white"
            >
              ‹
            </button>
          )}

          <div
            className="relative h-full max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fotos[openIndex]}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {fotos.length > 1 && (
            <button
              type="button"
              aria-label="Siguiente"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 text-4xl text-white"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
