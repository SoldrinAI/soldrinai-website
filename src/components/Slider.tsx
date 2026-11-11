/**
 * Slider.tsx – reusable carousel built on Embla Carousel 8.5.1.
 *
 * Props
 * -----
 * slides          ReactNode[]        content for each slide
 * label           string             aria-label for the region (required)
 * autoplay?       boolean | number   true = 4 s, number = ms (default: false)
 * loop?           boolean            (default: true)
 * slidesPerView?  number | {sm?:number; md?:number; lg?:number}
 *                                    slides visible at once (default: 1)
 * arrows?         boolean            show prev/next buttons (default: true)
 * dots?           boolean            show dot nav (default: true)
 * progress?       boolean            show autoplay-progress bar (default: false)
 * align?          "start"|"center"   Embla align (default: "center")
 * gap?            number             gap in px between slides (default: 24)
 *
 * Usage
 * -----
 *   <Slider label="Featured products" autoplay loop slidesPerView={{sm:1,md:2,lg:3}}>
 *     {items.map(i => <Card key={i.id} {...i} />)}
 *   </Slider>
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  Children,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import EmblaAutoplay from "embla-carousel-autoplay";
import { reduced } from "./Motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Breakpoints = { sm?: number; md?: number; lg?: number };

export interface SliderProps {
  children: ReactNode | ReactNode[];
  label: string;
  autoplay?: boolean | number;
  loop?: boolean;
  slidesPerView?: number | Breakpoints;
  arrows?: boolean;
  dots?: boolean;
  progress?: boolean;
  align?: "start" | "center";
  gap?: number;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useBreakpointSlidesPerView(spv: number | Breakpoints): number {
  const getVal = useCallback(() => {
    if (typeof spv === "number") return spv;
    const w = window.innerWidth;
    if (w >= 1024) return spv.lg ?? spv.md ?? spv.sm ?? 1;
    if (w >= 640) return spv.md ?? spv.sm ?? 1;
    return spv.sm ?? 1;
  }, [spv]);

  const [val, setVal] = useState(() => (typeof window !== "undefined" ? getVal() : 1));

  useEffect(() => {
    const update = () => setVal(getVal());
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [getVal]);

  return val;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Slider({
  children,
  label,
  autoplay = false,
  loop = true,
  slidesPerView = 1,
  arrows = true,
  dots = true,
  progress = false,
  align = "center",
  gap = 24,
  className = "",
}: SliderProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const isReduced = reduced();

  const spv = useBreakpointSlidesPerView(slidesPerView);

  // Autoplay plugin – disabled when prefers-reduced-motion is set
  const autoplayMs =
    autoplay === false || isReduced
      ? null
      : autoplay === true
      ? 4000
      : autoplay;

  const plugins = autoplayMs
    ? [EmblaAutoplay({ delay: autoplayMs, stopOnInteraction: false, stopOnMouseEnter: true })]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align,
      dragFree: false,
      slidesToScroll: 1,
      duration: isReduced ? 0 : 28, // Embla uses a ~speed value, not ms
    },
    plugins
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const progressRafRef = useRef<number>(0);
  const progressTimerRef = useRef<number>(0);

  // ── Sync state ──────────────────────────────────────────────────────────────
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // ── Reinit Embla when slides-per-view breakpoint changes ────────────────────
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, spv]);

  // ── Progress bar (autoplay) ─────────────────────────────────────────────────
  useEffect(() => {
    if (!progress || !autoplayMs || isReduced || !emblaApi) return;

    const start = () => {
      let t0 = performance.now();
      progressTimerRef.current = window.setTimeout(() => {}, autoplayMs);
      const tick = (now: number) => {
        const elapsed = now - t0;
        setProgressPct(Math.min(elapsed / autoplayMs, 1) * 100);
        if (elapsed < autoplayMs) {
          progressRafRef.current = requestAnimationFrame(tick);
        }
      };
      progressRafRef.current = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(progressRafRef.current);
        clearTimeout(progressTimerRef.current);
      };
    };

    let cleanup: (() => void) | undefined;
    const reset = () => {
      if (cleanup) cleanup();
      setProgressPct(0);
      cleanup = start();
    };

    emblaApi.on("select", reset);
    reset();

    return () => {
      if (cleanup) cleanup();
      emblaApi.off("select", reset);
    };
  }, [emblaApi, progress, autoplayMs, isReduced]);

  // ── Pause when hidden / offscreen ───────────────────────────────────────────
  const regionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!emblaApi || !autoplayMs) return;
    const autoplayPlugin = emblaApi.plugins().autoplay;
    if (!autoplayPlugin) return;

    const handleVisibility = () => {
      if (document.hidden) {
        autoplayPlugin.stop();
      } else {
        autoplayPlugin.play();
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          autoplayPlugin.play();
        } else {
          autoplayPlugin.stop();
        }
      },
      { threshold: 0.1 }
    );

    document.addEventListener("visibilitychange", handleVisibility);
    if (regionRef.current) io.observe(regionRef.current);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      io.disconnect();
    };
  }, [emblaApi, autoplayMs]);

  // ── Keyboard ────────────────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!emblaApi) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); emblaApi.scrollPrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); emblaApi.scrollNext(); }
    },
    [emblaApi]
  );

  // ── Mouse-wheel horizontal ───────────────────────────────────────────────────
  useEffect(() => {
    const el = regionRef.current;
    if (!el || !emblaApi) return;
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 20) emblaApi.scrollNext();
        else if (e.deltaX < -20) emblaApi.scrollPrev();
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [emblaApi]);

  const scrollTo = useCallback(
    (idx: number) => { if (emblaApi) emblaApi.scrollTo(idx); },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);

  // ── slide width CSS var ─────────────────────────────────────────────────────
  const slideStyle: React.CSSProperties = {
    flex: `0 0 calc(${100 / spv}% - ${gap - gap / spv}px)`,
    minWidth: 0,
  };

  const trackStyle: React.CSSProperties = {
    display: "flex",
    gap: `${gap}px`,
    touchAction: "pan-y",
    backfaceVisibility: "hidden",
  };

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={`slider ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Viewport */}
      <div className="slider-viewport" ref={emblaRef}>
        <div className="slider-track" style={trackStyle}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className="slider-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              style={slideStyle}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {progress && autoplayMs && !isReduced && (
        <div className="slider-progress" aria-hidden="true">
          <div className="slider-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      )}

      {/* Controls */}
      {(arrows || dots) && (
        <div className="slider-controls" aria-label={`${label} controls`}>
          {arrows && (
            <button
              className="slider-btn prev"
              onClick={scrollPrev}
              disabled={!loop && !canScrollPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </button>
          )}

          {dots && count > 1 && (
            <div className="slider-dots" role="tablist" aria-label="Slides">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === selectedIndex}
                  aria-label={`Slide ${i + 1}`}
                  className={`slider-dot ${i === selectedIndex ? "active" : ""}`}
                  onClick={() => scrollTo(i)}
                />
              ))}
            </div>
          )}

          {arrows && (
            <button
              className="slider-btn next"
              onClick={scrollNext}
              disabled={!loop && !canScrollNext}
              aria-label="Next slide"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
