import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Users, Wallet, Zap, BarChart3, Trophy, PieChart, Shield, Settings, Users as UsersIcon, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSound } from "@/hooks/useSound";
import { BalanceSummary } from "./BalanceSummary";
import { PaymentReminder } from "./PaymentReminder";

interface DashboardProps {
  onAddExpense: () => void;
  onViewAnalytics: () => void;
  onViewGamification: () => void;
  onViewFinancialInsights?: () => void;
  onViewEnhancedUI?: () => void;
  onViewAdvancedGamification?: () => void;
  onViewSecurityPrivacy?: () => void;
  onViewAccessibilityImprovements?: () => void;
  recentActivity?: {
    name: string;
    amount: string;
    split: number;
    status: "pending" | "settled";
  }[];
  balances?: {
    id: number;
    from: string;
    to: string;
    amount: number;
  }[];
}

export const Dashboard = ({ 
  onAddExpense, 
  onViewAnalytics, 
  onViewGamification,
  onViewFinancialInsights,
  onViewEnhancedUI,
  onViewAdvancedGamification,
  onViewSecurityPrivacy,
  onViewAccessibilityImprovements,
  recentActivity = [
    { name: "Dinner at Zomato", amount: "₹1,200", split: 4, status: "pending" },
    { name: "Movie Tickets", amount: "₹800", split: 2, status: "settled" },
    { name: "Grocery Shopping", amount: "₹2,450", split: 3, status: "pending" },
  ],
  balances = [
    { id: 1, from: "You", to: "Alice", amount: 300 },
    { id: 2, from: "Bob", to: "You", amount: 150 },
    { id: 3, from: "Alice", to: "Bob", amount: 75 },
  ]
}: DashboardProps) => {
  const { theme, resolvedTheme } = useTheme();
  const { playClick, playHover, playNotification } = useSound();
  const [showPaymentReminder, setShowPaymentReminder] = useState(false);
  const [paymentKey, setPaymentKey] = useState(0); // Key to force re-render
  
  useEffect(() => {
    console.log("Dashboard - Current theme:", theme);
    console.log("Dashboard - Resolved theme:", resolvedTheme);
  }, [theme, resolvedTheme]);

  // Feature categories for navigation
  const featureCategories = [
    {
      name: "Financial Insights",
      icon: <PieChart className="w-5 h-5" />,
      action: onViewFinancialInsights,
      color: "bg-blue-500/20 text-blue-500"
    },
    {
      name: "Enhanced UI",
      icon: <Zap className="w-5 h-5" />,
      action: onViewEnhancedUI,
      color: "bg-purple-500/20 text-purple-500"
    },
    {
      name: "Advanced Gamification",
      icon: <Trophy className="w-5 h-5" />,
      action: onViewAdvancedGamification,
      color: "bg-yellow-500/20 text-yellow-500"
    },
    {
      name: "Security & Privacy",
      icon: <Shield className="w-5 h-5" />,
      action: onViewSecurityPrivacy,
      color: "bg-red-500/20 text-red-500"
    },
    {
      name: "Accessibility",
      icon: <UsersIcon className="w-5 h-5" />,
      action: onViewAccessibilityImprovements,
      color: "bg-teal-500/20 text-teal-500"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10 container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-slide-up">
          <div className="flex items-center gap-4">
            <img src={logo} alt="SplitSync" className="w-12 h-12 animate-pulse-glow" />
            <h1 className="text-3xl font-display gradient-text">SplitSync</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                playClick();
                onViewGamification();
              }}
              className="glass hover-scale border-primary/20"
              onMouseEnter={() => playHover()}
            >
              <Trophy className="w-4 h-4 mr-2" />
              <span className="font-mono">Karma: 1,234</span>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Button
            onClick={() => {
              playClick();
              onAddExpense();
            }}
            className="h-24 text-lg font-display glass-strong hover-scale glow-purple border-2 border-primary/30 hover:border-primary/60 transition-all text-foreground"
            onMouseEnter={() => playHover()}
          >
            <Plus className="w-6 h-6 mr-3" />
            Add New Expense
            <Zap className="w-5 h-5 ml-3 animate-pulse" />
          </Button>
          
          <Button
            onClick={() => {
              playClick();
              onViewAnalytics();
            }}
            className="h-24 text-lg font-display glass-strong hover-scale glow-purple border-2 border-primary/30 hover:border-primary/60 transition-all text-foreground"
            onMouseEnter={() => playHover()}
          >
            <BarChart3 className="w-6 h-6 mr-3" />
            View Analytics
          </Button>
          
          {/* Fun Payment Reminder Button */}
          <Button
            onClick={() => {
              playClick();
              playNotification(); // Play notification sound
              setPaymentKey(prev => prev + 1); // Force re-render to get new meme
              setShowPaymentReminder(true);
            }}
            className="h-24 text-lg font-display glass-strong hover-scale glow-purple border-2 border-primary/30 hover:border-primary/60 transition-all text-foreground relative overflow-hidden"
            onMouseEnter={() => playHover()}
          >
            <Bell className="w-6 h-6 mr-3" />
            Payment Reminder
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <Zap className="w-5 h-5 ml-3 animate-pulse" />
          </Button>
        </div>

        {/* Feature Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-display gradient-text mb-4">Feature Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="flex flex-wrap justify-center gap-4">
              {featureCategories.map((category, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    playClick();
                    if (category.action) category.action();
                  }}
                  className="glass p-4 h-auto flex flex-col items-center justify-center hover-scale min-w-[120px]"
                  variant="outline"
                  onMouseEnter={() => playHover()}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${category.color}`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="glass-strong p-6 animate-slide-up border-primary/20 mb-8" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-display mb-4 gradient-text">Recent Activity</h2>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg hover-scale cursor-pointer group transition-all hover:border-primary/40 border border-transparent"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">Split among {activity.split} people</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-mono font-bold gradient-text">{activity.amount}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === "settled"
                          ? "bg-accent/20 text-accent"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Balance Summary */}
        <BalanceSummary balances={balances} />
      </div>
      
      {/* Payment Reminder Modal */}
      {showPaymentReminder && (
        <PaymentReminder
          key={paymentKey} // This forces a re-render with a new meme
          debtorName="You"
          creditorName="Alice"
          amount={300}
          onPayNow={() => {
            setShowPaymentReminder(false);
            // In a real app, this would update the balance
            alert("Payment successful! Balance updated.");
          }}
          onDismiss={() => setShowPaymentReminder(false)}
        />
      )}
    </div>
  );
};