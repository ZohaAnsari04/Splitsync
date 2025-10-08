import { Button } from "@/components/ui/button";
import { 
  Home, 
  BarChart3, 
  Trophy, 
  PieChart, 
  Zap, 
  Smartphone, 
  Shield, 
  Settings, 
  Users,
  Menu
} from "lucide-react";
import { useState } from "react";
import { useSound } from "@/hooks/useSound";

interface NavigationMenuProps {
  onViewDashboard: () => void;
  onViewAnalytics: () => void;
  onViewGamification: () => void;
  onViewFinancialInsights: () => void;
  onViewEnhancedUI: () => void;
  onViewMobileFeatures: () => void;
  onViewAdvancedGamification: () => void;
  onViewSecurityPrivacy: () => void;
  onViewAccessibilityImprovements: () => void;
}

export const NavigationMenu = ({ 
  onViewDashboard,
  onViewAnalytics,
  onViewGamification,
  onViewFinancialInsights,
  onViewEnhancedUI,
  onViewMobileFeatures,
  onViewAdvancedGamification,
  onViewSecurityPrivacy,
  onViewAccessibilityImprovements
}: NavigationMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playClick, playHover } = useSound();
  
  const menuItems = [
    { name: "Dashboard", icon: <Home className="w-4 h-4" />, action: onViewDashboard },
    { name: "Analytics", icon: <BarChart3 className="w-4 h-4" />, action: onViewAnalytics },
    { name: "Gamification", icon: <Trophy className="w-4 h-4" />, action: onViewGamification },
    { name: "Financial Insights", icon: <PieChart className="w-4 h-4" />, action: onViewFinancialInsights },
    { name: "Enhanced UI", icon: <Zap className="w-4 h-4" />, action: onViewEnhancedUI },
    { name: "Mobile Features", icon: <Smartphone className="w-4 h-4" />, action: onViewMobileFeatures },
    { name: "Advanced Gamification", icon: <Trophy className="w-4 h-4" />, action: onViewAdvancedGamification },
    { name: "Security & Privacy", icon: <Shield className="w-4 h-4" />, action: onViewSecurityPrivacy },
    { name: "Accessibility", icon: <Users className="w-4 h-4" />, action: onViewAccessibilityImprovements }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        className="glass-strong hover-scale mb-2 mx-auto block"
        size="icon"
        onMouseEnter={() => playHover()}
      >
        <Menu className="w-5 h-5" />
      </Button>
      
      {isOpen && (
        <div className="glass-strong rounded-lg p-2 grid grid-cols-3 gap-2 w-80">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              onClick={() => {
                playClick();
                item.action();
                setIsOpen(false);
              }}
              variant="ghost"
              className="flex flex-col items-center justify-center h-16 hover-scale"
              onMouseEnter={() => playHover()}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-xs">{item.name}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};