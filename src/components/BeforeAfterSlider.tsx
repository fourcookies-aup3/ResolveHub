import { useRef, useState, useCallback, useEffect } from "react";
import { GripVertical } from "lucide-react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider = ({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) => {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      move(x);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, move]);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-video overflow-hidden rounded-xl border border-border shadow-elegant select-none cursor-ew-resize"
      onMouseDown={(e) => { setDragging(true); move(e.clientX); }}
      onTouchStart={(e) => { setDragging(true); move(e.touches[0].clientX); }}
    >
      <img src={before} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={after} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>

      <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-md bg-background/70 backdrop-blur-sm border border-border text-muted-foreground">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-md bg-primary/20 backdrop-blur-sm border border-primary/40 text-primary">
        {afterLabel}
      </span>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-glow-primary pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow-primary">
          <GripVertical className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
