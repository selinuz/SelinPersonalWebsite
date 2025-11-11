"use client";

import {
  COLORS,
  TYPOGRAPHY,
  getPushpinStyle,
  cn,
} from "@/lib/design-constants";

interface SpotifyPlayerProps {
  playlistId: string;
  width?: number;
  height?: number;
  isMobile?: boolean;
  theme?: 0 | 1; // 0 = light theme, 1 = dark theme
}

export default function SpotifyPlayer({
  playlistId,
  width = 300,
  height = 200,
  isMobile = false,
  theme = 0,
}: SpotifyPlayerProps) {
  const pushpinStyle = getPushpinStyle("small", "blue");

  // Adjust dimensions for mobile
  const playerWidth = isMobile ? Math.min(width, 200) : width;
  const playerHeight = height;

  return (
    <div
      className={cn(
        COLORS.paper.white,
        COLORS.shadows["2xl"],
        "relative rounded-md overflow-hidden"
      )}
      style={{ width: `${playerWidth}px`, height: `${playerHeight}px` }}>
      {/* Push pin */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 z-10",
          pushpinStyle.className
        )}
        style={{
          width: pushpinStyle.size,
          height: pushpinStyle.size,
          top: `-${pushpinStyle.size}`,
        }}></div>

      {/* Title */}
      <div className={cn("px-3 py-1.5 bg-card")}>
        <h3 className={cn(TYPOGRAPHY.presets.label, "text-sm text-center")}>
          Website Jam
        </h3>
      </div>

      {/* Spotify Embed */}
      <iframe
        style={{ borderRadius: "0" }}
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}`}
        width="100%"
        height={playerHeight}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist Player"></iframe>
    </div>
  );
}
