import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { useSound } from "@/hooks/useSound";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);
  const { playClick } = useSound();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      playClick(); // Play sound when splash screen completes
      setTimeout(onComplete, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete, playClick]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Logo with pulse animation */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative animate-pulse-glow">
          <img
            src={logo}
            alt="SplitSync Logo"
            className="w-32 h-32 animate-float drop-shadow-2xl"
          />
          <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse-glow" />
        </div>
        
        <h1 className="text-4xl font-display gradient-text animate-scale-in">
          SplitSync
        </h1>
        
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};