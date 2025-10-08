import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/useSound";

const NotFound = () => {
  const location = useLocation();
  const { playClick, playHover } = useSound();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center glass p-8 rounded-lg">
        <h1 className="mb-4 text-4xl font-display gradient-text">404</h1>
        <p className="mb-4 text-xl text-foreground">Oops! Page not found</p>
        <Button 
          asChild 
          className="glass-strong hover-scale"
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
        >
          <a href="/">
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;