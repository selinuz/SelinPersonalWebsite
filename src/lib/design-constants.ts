/**
 * Design System Constants
 * Centralized design tokens for consistent styling across the bulletin board
 */

// ============================================================================
// PUSHPIN STYLES
// ============================================================================

export const PUSHPIN = {
  // Pushpin for paper/card elements (white background)
  paper: {
    color: "bg-primary",
    size: {
      small: "0.6rem",
      medium: "1rem",
      large: "1.2rem",
    },
    shadow: "shadow-md",
  },
  // Alternative pushpin colors for variety
  colors: {
    red: "bg-destructive",
    blue: "bg-primary",
    yellow: "bg-accent",
    green: "bg-emerald-500",
    purple: "bg-primary",
  },
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const TYPOGRAPHY = {
  // Font families
  fontFamily: {
    mono: "font-mono",
    sans: "font-sans",
  },

  // Font sizes
  fontSize: {
    xs: "text-xs", // 0.75rem
    sm: "text-sm", // 0.875rem
    base: "text-base", // 1rem
    lg: "text-lg", // 1.125rem
    xl: "text-xl", // 1.25rem
    "2xl": "text-2xl", // 1.5rem
    "3xl": "text-3xl", // 1.875rem
    "4xl": "text-4xl", // 2.25rem
  },

  // Font weights
  fontWeight: {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },

  // Text colors (bulletin board theme)
  textColor: {
    primary: "text-foreground", // Main text on paper
    secondary: "text-foreground/90", // Secondary text
    muted: "text-muted-foreground", // Muted/subtle text
    light: "text-muted-foreground/70", // Very light text
    foreground: "text-foreground", // CSS variable based
  },

  // Preset text styles for common use cases
  presets: {
    heading: "text-2xl font-bold text-foreground font-mono",
    subheading: "text-xl font-semibold text-foreground font-mono",
    body: "text-sm text-foreground font-mono",
    label: "text-foreground font-mono font-semibold",
    caption: "text-foreground/80 font-mono",
  },
} as const;

// ============================================================================
// COLORS
// ============================================================================

export const COLORS = {
  // Paper/Card backgrounds
  paper: {
    white: "bg-card",
    cream: "bg-secondary",
    lightYellow: "bg-accent",
  },

  // Cork board backgrounds
  board: {
    gradient: "bg-background",
    solid: "bg-background",
  },

  // Icon colors
  icons: {
    folder: "text-primary",
    work: "text-pop-green",
    pdfFile: "text-destructive",
  },

  // Shadow colors
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  },
} as const;

// ============================================================================
// SPACING & SIZING
// ============================================================================

export const SPACING = {
  // Padding values
  padding: {
    xs: "p-2",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12",
  },

  // Gap values
  gap: {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  },

  // Margin values
  margin: {
    xs: "m-2",
    sm: "m-4",
    md: "m-6",
    lg: "m-8",
    xl: "m-12",
  },
} as const;

export const SIZING = {
  // Icon sizes
  icon: {
    sm: "w-16 h-16",
    md: "w-20 h-20 sm:w-24 sm:h-24",
    lg: "w-24 h-24 sm:w-28 sm:h-28",
  },

  // Card/Container widths
  container: {
    sm: "max-w-xs",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
  },
} as const;

// ============================================================================
// LAYOUT UTILITIES
// ============================================================================

export const LAYOUT = {
  // Flexbox utilities
  flex: {
    center: "flex items-center justify-center",
    col: "flex flex-col",
    colCenter: "flex flex-col items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-start",
  },

  // Common positioning
  position: {
    absolute: "absolute",
    relative: "relative",
    fixed: "fixed",
    center: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },

  // Overflow
  overflow: {
    hidden: "overflow-hidden",
    auto: "overflow-auto",
    scroll: "overflow-scroll",
  },
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  mobile: {
    max: 640, // matches Tailwind's sm breakpoint
  },
  tablet: {
    min: 641,
    max: 1024,
  },
  desktop: {
    min: 1025,
  },
} as const;

// ============================================================================
// PAPER/CARD STYLES
// ============================================================================

export const PAPER_STYLES = {
  // Standard paper note (like welcome card)
  note: {
    background: COLORS.paper.white,
    padding: SPACING.padding.lg,
    shadow: COLORS.shadows["2xl"],
    // Small rotation for organic look
    rotationClasses: "transform rotate-1",
  },

  // Polaroid-style card
  polaroid: {
    background: COLORS.paper.white,
    shadow: COLORS.shadows.xl,
  },
} as const;

// ============================================================================
// ANIMATIONS & INTERACTIONS
// ============================================================================

export const INTERACTIONS = {
  // Hover effects
  hover: {
    lift: "hover:scale-105 hover:-translate-y-1",
    scale: "hover:scale-105",
    shadow: "hover:shadow-2xl",
    brightness: "hover:brightness-110",
  },

  // Transitions
  transition: {
    default: "transition-transform duration-300 ease-in-out",
    all: "transition-all duration-300 ease-in-out",
    colors: "transition-colors duration-200 ease-in-out",
    fast: "transition-all duration-150 ease-in-out",
  },

  // Cursor styles
  cursor: {
    pointer: "cursor-pointer",
    default: "cursor-default",
    grab: "cursor-grab",
    grabbing: "cursor-grabbing",
  },

  // Animation classes
  animation: {
    fadeIn: "animate-in fade-in-0 duration-300",
    slideIn: "animate-in slide-in-from-top-2 duration-300",
    fadeOut: "animate-out fade-out-0 duration-200",
  },
} as const;

// ============================================================================
// COMPONENT-SPECIFIC CONSTANTS
// ============================================================================

export const POLAROID = {
  // Relative sizing ratios
  borderRatio: {
    side: 0.08,
    bottom: 0.3,
    top: 0.08,
  },
  aspectRatio: {
    portrait: 1.2,
    landscape: 0.75,
  },
  defaultWidth: 12, // in rem
} as const;

export const CORK_TEXTURE = {
  opacity: "opacity-25",
  pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23964B00' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get pushpin style for a card with background
 * @param size - Size of the pushpin (small, medium, large)
 * @param color - Color of the pushpin (optional, defaults to blue)
 */
export function getPushpinStyle(
  size: keyof typeof PUSHPIN.paper.size = "medium",
  color: keyof typeof PUSHPIN.colors = "blue"
) {
  return {
    className: `${PUSHPIN.colors[color]} rounded-full ${PUSHPIN.paper.shadow}`,
    size: PUSHPIN.paper.size[size],
  };
}

/**
 * Combine multiple class names (utility function)
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
