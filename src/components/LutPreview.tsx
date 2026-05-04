import { useMemo } from "react";
import type { Lut } from "@/data/luts";
import portrait from "@/assets/preview-portrait.jpg";
import landscape from "@/assets/preview-landscape.jpg";
import city from "@/assets/preview-city.jpg";
import interior from "@/assets/preview-interior.jpg";
import product from "@/assets/preview-product.jpg";

const PREVIEWS = [portrait, landscape, city, interior, product];

/**
 * Picks a stable preview image for a given LUT slug.
 * City scenes for Moody, portraits for Skin/Natural, landscape for Cinematic, etc.
 */
const pickImage = (l: Lut) => {
  const c = l.category;
  if (c === "Moody") return city;
  if (c === "Natural" || c === "B&W") return portrait;
  if (c === "Cinematic") return landscape;
  if (c === "Vintage") return interior;
  if (c === "Stylized") return product;
  // Log Convert and fallback
  return PREVIEWS[Math.abs(hash(l.slug)) % PREVIEWS.length];
};

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
};

/** Build a CSS filter approximation from LUT grading parameters. */
const lutToCssFilter = (l: Lut): string => {
  const avgGain = (l.gain[0] + l.gain[1] + l.gain[2]) / 3;
  const avgLift = (l.lift[0] + l.lift[1] + l.lift[2]) / 3;
  const brightness = 1 + avgGain * 0.6 + avgLift * 0.3;
  const contrast = l.contrast;
  const saturate = l.saturation;
  // Rough hue rotation: temp warm shifts hue toward orange (~30°), tint magenta toward 320°
  const hue = l.temp * 40 + l.tint * 30 - (l.gain[2] - l.gain[0]) * 30;
  const sepia = l.saturation < 0.4 && l.category === "Vintage" ? 0.3 : 0;
  return `brightness(${brightness.toFixed(3)}) contrast(${contrast.toFixed(3)}) saturate(${saturate.toFixed(3)}) hue-rotate(${hue.toFixed(1)}deg) sepia(${sepia})`;
};

interface Props {
  lut: Lut;
  className?: string;
  showLabels?: boolean;
}

const LutPreview = ({ lut, className = "", showLabels = true }: Props) => {
  const img = useMemo(() => pickImage(lut), [lut.slug]);
  const filter = useMemo(() => lutToCssFilter(lut), [lut]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Before (left half) */}
      <img
        src={img}
        alt={`${lut.name} – ungraded`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        width={1280}
        height={720}
      />
      {/* After overlay (right half), same source with filter */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0 0 0 50%)" }}>
        <img
          src={img}
          alt={`${lut.name} – graded`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter }}
          loading="lazy"
          width={1280}
          height={720}
        />
      </div>
      {/* Divider line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary/80 shadow-glow-primary pointer-events-none" />
      {showLabels && (
        <>
          <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 text-[10px] font-medium rounded bg-background/70 backdrop-blur-sm border border-border text-muted-foreground">
            BEFORE
          </span>
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/20 backdrop-blur-sm border border-primary/40 text-primary">
            AFTER
          </span>
        </>
      )}
    </div>
  );
};

export default LutPreview;
