import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useSound } from "@/hooks/useSound";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { playClick, playHover } = useSound();

  // Debugging: log theme changes
  useEffect(() => {
    console.log("Current theme:", theme);
    console.log("Resolved theme:", resolvedTheme);
    console.log("Document class list:", document.documentElement.classList);
    console.log("Background color:", getComputedStyle(document.documentElement).getPropertyValue('--background'));
  }, [theme, resolvedTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("Toggling theme to:", newTheme);
    playClick();
    setTheme(newTheme);
  };

  // Show a loading state while theme is being resolved
  if (theme === undefined) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative overflow-hidden group hover-scale opacity-50"
        disabled
      >
        <Sun className="h-5 w-5" />
        <Moon className="absolute h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden group hover-scale"
      onMouseEnter={() => playHover()}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
    </Button>
  );
};