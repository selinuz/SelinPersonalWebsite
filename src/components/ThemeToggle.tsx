"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 sm:top-6 sm:right-6 z-50 sm:p-3 rounded-full bg-card border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group active:scale-95"
      aria-label="Toggle theme">
      {theme === "light" ? (
        <Moon className="h-5 w-5 sm:h-5 sm:w-5 text-primary transition-transform group-hover:rotate-12" />
      ) : (
        <Sun className="h-5 w-5 sm:h-5 sm:w-5 text-primary transition-transform group-hover:rotate-12" />
      )}
    </button>
  );
}
