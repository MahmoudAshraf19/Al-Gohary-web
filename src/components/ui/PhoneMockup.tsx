import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

interface PhoneMockupProps {
  images?: string[];
  imageSrcEn?: string; // legacy support
  imageSrcAr?: string; // legacy support
  alt: string;
  className?: string;
}

export function PhoneMockup({
  images = [],
  imageSrcEn,
  imageSrcAr,
  alt,
  className,
}: PhoneMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayImages = images.length > 0 
    ? images 
    : [imageSrcEn || imageSrcAr || ""];

  useEffect(() => {
    if (displayImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [displayImages.length]);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[280px] sm:max-w-[320px] shrink-0",
        className
      )}
    >
      {/* Outer Phone Frame */}
      <div className="relative rounded-[3rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl overflow-hidden ring-1 ring-white/10 dark:ring-white/5">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-20 pt-2">
          <div className="w-24 h-6 bg-black rounded-full flex items-center justify-end px-2">
            {/* Camera dot */}
            <div className="w-2 h-2 rounded-full bg-white/10 shadow-[inset_0_0_2px_rgba(255,255,255,0.5)]"></div>
          </div>
        </div>
        
        {/* Screen Content */}
        <div className="relative rounded-[2.25rem] overflow-hidden bg-black aspect-[9/19.5]">
          {displayImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={alt}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
        
        {/* Side Buttons (Volume/Power) - Decorative */}
        <div className="absolute -left-[14px] top-24 w-1 h-12 bg-neutral-800 rounded-l-md"></div>
        <div className="absolute -left-[14px] top-40 w-1 h-12 bg-neutral-800 rounded-l-md"></div>
        <div className="absolute -right-[14px] top-32 w-1 h-16 bg-neutral-800 rounded-r-md"></div>
      </div>
    </div>
  );
}
