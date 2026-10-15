"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Lang, ProjectImage } from "@/data/resume";

type Props = {
  images: ProjectImage[];
  url?: string;
  lang: Lang;
};

function hostOf(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

export default function ProjectGallery({ images, url, lang }: Props) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images.length;
  const current = images[active];

  const go = useCallback(
    (step: number) => setActive((i) => (i + step + count) % count),
    [count],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  return (
    <div className="mt-5">
      {/* Browser-frame preview */}
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 truncate rounded-md bg-background px-3 py-1 text-center font-mono text-xs text-muted">
            {hostOf(url)}
          </div>
          <span className="hidden text-xs text-muted sm:inline">
            {active + 1} / {count}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block aspect-[16/8.5] w-full overflow-hidden bg-white"
          aria-label={lang === "th" ? "ดูภาพขนาดใหญ่" : "View full size"}
        >
          {images.map((img, i) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.caption[lang]}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className={`object-cover object-top transition duration-500 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              priority={i === 0}
            />
          ))}
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/80 via-black/30 to-transparent px-4 pb-3 pt-10 text-left">
            <span className="text-sm font-semibold text-white">{current.caption[lang]}</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
              {lang === "th" ? "คลิกเพื่อขยาย" : "Click to enlarge"}
            </span>
          </span>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={img.caption[lang]}
            aria-current={i === active}
            className={`relative aspect-video w-24 shrink-0 overflow-hidden rounded-md border-2 bg-white transition sm:w-28 ${
              i === active
                ? "border-accent opacity-100"
                : "border-transparent opacity-50 hover:opacity-90"
            }`}
          >
            <Image src={img.src} alt="" fill sizes="112px" className="object-cover object-top" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption[lang]}
          className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p className="text-sm font-semibold">
              <span className="mr-2 text-accent-2">
                {active + 1}/{count}
              </span>
              {current.caption[lang]}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
            >
              ✕ {lang === "th" ? "ปิด" : "Close"}
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-2 pb-6 sm:px-16">
            <Image
              src={current.src}
              alt={current.caption[lang]}
              width={current.width}
              height={current.height}
              sizes="100vw"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-accent sm:left-4"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-accent sm:right-4"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
