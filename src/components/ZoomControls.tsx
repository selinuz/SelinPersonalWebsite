import { cn, INTERACTIONS } from "@/lib/design-constants";

interface ZoomProps {
  zoom: number;
  setZoom: (value: number) => void;
}

export default function ZoomControls({ zoom, setZoom }: ZoomProps) {
  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  return (
    <>
      <button
        onClick={() => setZoom(clamp(zoom + 0.1, 0.5, 2))}
        className={cn(
          "w-6 h-6 text-sm rounded-full",
          "bg-primary text-primary-foreground",
          "border-none",
          INTERACTIONS.cursor.pointer,
          INTERACTIONS.transition.all,
          "hover:scale-110 hover:bg-accent hover:text-accent-foreground"
        )}>
        +
      </button>
      <button
        onClick={() => setZoom(clamp(zoom - 0.1, 0.5, 2))}
        className={cn(
          "w-6 h-6 text-sm rounded-full",
          "bg-primary text-primary-foreground",
          "border-none",
          INTERACTIONS.cursor.pointer,
          INTERACTIONS.transition.all,
          "hover:scale-110 hover:bg-accent hover:text-accent-foreground"
        )}>
        −
      </button>
    </>
  );
}
