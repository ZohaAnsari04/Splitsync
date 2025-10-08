import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Eye,
  Keyboard,
  Contrast,
  Volume2,
  Settings,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useSound } from "@/hooks/useSound";

interface AccessibilitySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
}

export const AccessibilityImprovements = ({ onBack }: { onBack: () => void }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState(true);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(true);
  const { playClick, playHover } = useSound();
  
  // Accessibility settings
  const accessibilitySettings: AccessibilitySetting[] = [
    {
      id: "1",
      name: "Voice Commands",
      description: "Navigate the app using voice commands",
      enabled: voiceCommands,
      icon: <Mic className="w-5 h-5" />
    },
    {
      id: "2",
      name: "Screen Reader",
      description: "Optimize interface for screen readers",
      enabled: screenReader,
      icon: <Volume2 className="w-5 h-5" />
    },
    {
      id: "3",
      name: "High Contrast Mode",
      description: "Increase color contrast for better visibility",
      enabled: highContrast,
      icon: <Contrast className="w-5 h-5" />
    },
    {
      id: "4",
      name: "Keyboard Navigation",
      description: "Navigate using keyboard shortcuts",
      enabled: keyboardNav,
      icon: <Keyboard className="w-5 h-5" />
    }
  ];

  // Toggle accessibility setting
  const toggleSetting = (id: string) => {
    playClick();
    switch (id) {
      case "1":
        setVoiceCommands(!voiceCommands);
        break;
      case "2":
        setScreenReader(!screenReader);
        break;
      case "3":
        setHighContrast(!highContrast);
        break;
      case "4":
        setKeyboardNav(!keyboardNav);
        break;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-6">
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-display gradient-text">Accessibility Improvements</h1>
            <p className="text-muted-foreground">Enhance usability for all users</p>
          </div>
          <Button 
            onClick={() => {
              playClick();
              onBack();
            }} 
            variant="outline" 
            className="glass hover-scale"
            onMouseEnter={() => playHover()}
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Accessibility Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Mic className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-lg font-display font-bold gradient-text">
              {voiceCommands ? "Active" : "Inactive"}
            </div>
            <div className="text-sm text-muted-foreground">Voice Commands</div>
          </Card>
          
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Eye className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-lg font-display font-bold gradient-text">
              {screenReader ? "Active" : "Inactive"}
            </div>
            <div className="text-sm text-muted-foreground">Screen Reader</div>
          </Card>
          
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Contrast className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-lg font-display font-bold gradient-text">
              {highContrast ? "Active" : "Inactive"}
            </div>
            <div className="text-sm text-muted-foreground">High Contrast</div>
          </Card>
          
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Keyboard className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-display font-bold gradient-text">
              {keyboardNav ? "Active" : "Inactive"}
            </div>
            <div className="text-sm text-muted-foreground">Keyboard Nav</div>
          </Card>
        </div>

        {/* Voice Commands */}
        <Card className="glass-strong p-6 mb-8 hover-scale">
          <div className="flex items-center gap-3 mb-4">
            <Mic className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-display gradient-text">Voice Commands</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Control the app using voice commands for hands-free operation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Available Commands</h3>
              <div className="space-y-3">
                <div 
                  className="p-3 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="font-mono text-sm">"Add new expense"</div>
                  <div className="text-sm text-muted-foreground">Create a new expense entry</div>
                </div>
                <div 
                  className="p-3 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="font-mono text-sm">"Show dashboard"</div>
                  <div className="text-sm text-muted-foreground">Navigate to the main dashboard</div>
                </div>
                <div 
                  className="p-3 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="font-mono text-sm">"View analytics"</div>
                  <div className="text-sm text-muted-foreground">Open financial insights</div>
                </div>
                <div 
                  className="p-3 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="font-mono text-sm">"Search expenses"</div>
                  <div className="text-sm text-muted-foreground">Search through your expenses</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Voice Command Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 glass rounded">
                  <div>
                    <div className="font-semibold">Voice Commands</div>
                    <div className="text-sm text-muted-foreground">Enable/disable voice control</div>
                  </div>
                  <Button 
                    variant={voiceCommands ? "default" : "outline"}
                    onClick={() => {
                      playClick();
                      setVoiceCommands(!voiceCommands);
                    }}
                    className={voiceCommands ? "glass-strong" : "glass"}
                    onMouseEnter={() => playHover()}
                  >
                    {voiceCommands ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Screen Reader Optimization */}
        <Card className="glass-strong p-6 mb-8 hover-scale">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-8 h-8 text-secondary" />
            <h2 className="text-xl font-display gradient-text">Screen Reader Optimization</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Ensure all interface elements are properly labeled for screen readers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Optimization Features</h3>
              <div className="space-y-3">
                <div 
                  className="flex items-center gap-2 p-3 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-semibold">Semantic HTML</div>
                    <div className="text-sm text-muted-foreground">Properly structured markup</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-2 p-3 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-semibold">ARIA Labels</div>
                    <div className="text-sm text-muted-foreground">Accessible rich internet applications</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-2 p-3 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-semibold">Focus Indicators</div>
                    <div className="text-sm text-muted-foreground">Visible keyboard focus</div>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-2 p-3 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-semibold">Contrast Ratios</div>
                    <div className="text-sm text-muted-foreground">Some areas need improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* High Contrast Mode */}
        <Card className="glass-strong p-6 mb-8 hover-scale">
          <div className="flex items-center gap-3 mb-4">
            <Contrast className="w-8 h-8 text-accent" />
            <h2 className="text-xl font-display gradient-text">High Contrast Mode</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Increase color contrast for better visibility for users with visual impairments.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-semibold mb-3">Preview</h3>
              <div 
                className={`rounded-lg p-6 ${highContrast ? "bg-foreground text-background" : "bg-secondary/20"} cursor-pointer hover-scale`}
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="font-display text-xl mb-2">Sample Interface</div>
                <div className="mb-4">This is how the interface appears with current settings</div>
                <div className="flex gap-2">
                  <Button 
                    variant={highContrast ? "secondary" : "default"} 
                    className={highContrast ? "" : "glass"}
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                    }}
                    onMouseEnter={() => playHover()}
                  >
                    Primary Button
                  </Button>
                  <Button 
                    variant="outline" 
                    className={highContrast ? "border-foreground text-foreground" : "glass"}
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                    }}
                    onMouseEnter={() => playHover()}
                  >
                    Secondary Button
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold mb-3">High Contrast Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 glass rounded">
                  <div>
                    <div className="font-semibold">High Contrast Mode</div>
                    <div className="text-sm text-muted-foreground">Increase color contrast</div>
                  </div>
                  <Button 
                    variant={highContrast ? "default" : "outline"}
                    onClick={() => {
                      playClick();
                      setHighContrast(!highContrast);
                    }}
                    className={highContrast ? "glass-strong" : "glass"}
                    onMouseEnter={() => playHover()}
                  >
                    {highContrast ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="p-3 glass rounded">
                  <div className="font-semibold mb-2">Contrast Level</div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${!highContrast ? "glass-strong" : "glass"}`}
                      onClick={() => {
                        playClick();
                        setHighContrast(false);
                      }}
                      onMouseEnter={() => playHover()}
                    >
                      Standard
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${highContrast ? "glass-strong" : "glass"}`}
                      onClick={() => {
                        playClick();
                        setHighContrast(true);
                      }}
                      onMouseEnter={() => playHover()}
                    >
                      High
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};