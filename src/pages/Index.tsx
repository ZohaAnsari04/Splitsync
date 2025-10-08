import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { Dashboard } from "@/components/Dashboard";
import { AddExpenseModal } from "@/components/AddExpenseModal";
import { Analytics } from "@/components/Analytics";
import { Gamification } from "@/components/Gamification";
import { FinancialInsights } from "@/components/FinancialInsights";
import { EnhancedUI } from "@/components/EnhancedUI";
import { MobileFeatures } from "@/components/MobileFeatures";
import { AdvancedGamification } from "@/components/AdvancedGamification";
import { SecurityPrivacy } from "@/components/SecurityPrivacy";
import { AccessibilityImprovements } from "@/components/AccessibilityImprovements";
import { NavigationMenu } from "@/components/NavigationMenu";
import { useSound } from "@/hooks/useSound";
import { toast } from "sonner";

type View = "splash" | "dashboard" | "analytics" | "gamification" | "financial-insights" | "enhanced-ui" | "mobile-features" | "advanced-gamification" | "security-privacy" | "accessibility-improvements";

// Define the recent activity type
interface RecentActivity {
  name: string;
  amount: string;
  split: number;
  status: "pending" | "settled";
}

// Define the balance type
interface Balance {
  id: number;
  from: string;
  to: string;
  amount: number;
}

// Define the expense type
interface Expense {
  id: string;
  name: string;
  amount: number;
  split: number;
  participants: string[];
  date: Date;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("splash");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    { name: "Dinner at Zomato", amount: "₹1,200", split: 4, status: "pending" },
    { name: "Movie Tickets", amount: "₹800", split: 2, status: "settled" },
    { name: "Grocery Shopping", amount: "₹2,450", split: 3, status: "pending" },
  ]);
  const [balances, setBalances] = useState<Balance[]>([
    { id: 1, from: "You", to: "Alice", amount: 300 },
    { id: 2, from: "Bob", to: "You", amount: 150 },
    { id: 3, from: "Alice", to: "Bob", amount: 75 },
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { playClick, playNotification } = useSound();

  // Function to add a new expense to recent activity
  const addExpenseToActivity = (name: string, amount: number, split: number) => {
    const newActivity: RecentActivity = {
      name,
      amount: `₹${amount.toLocaleString()}`,
      split,
      status: "pending"
    };
    
    setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only the last 10 activities
    
    // Add the expense to the expenses list
    const newExpense: Expense = {
      id: Date.now().toString(),
      name,
      amount,
      split,
      participants: ["You", "Alice", "Bob"], // Default participants for now
      date: new Date()
    };
    
    setExpenses(prev => [...prev, newExpense]);
    
    // Update balances based on the new expense
    updateBalances(newExpense);
    
    // Show notification
    toast.success(`New expense added: ${name} - ₹${amount.toLocaleString()}`, {
      description: `Split among ${split} people`,
      duration: 5000,
    });
    
    // Play notification sound
    playNotification();
  };

  // Function to update balances when a new expense is added
  const updateBalances = (expense: Expense) => {
    // This is a simplified calculation - in a real app, this would be more complex
    // For now, we'll just simulate some balance changes
    
    // Simulate that "You" owe more to Alice
    const updatedBalances = [...balances];
    const aliceBalance = updatedBalances.find(b => b.from === "You" && b.to === "Alice");
    
    if (aliceBalance) {
      aliceBalance.amount += expense.amount / expense.split;
    } else {
      updatedBalances.push({
        id: updatedBalances.length + 1,
        from: "You",
        to: "Alice",
        amount: expense.amount / expense.split
      });
    }
    
    setBalances(updatedBalances);
  };

  const renderView = () => {
    switch (currentView) {
      case "splash":
        return <SplashScreen onComplete={() => setCurrentView("dashboard")} />;
      case "analytics":
        return <Analytics onBack={() => setCurrentView("dashboard")} />;
      case "gamification":
        return <Gamification onBack={() => setCurrentView("dashboard")} />;
      case "financial-insights":
        return <FinancialInsights onBack={() => setCurrentView("dashboard")} />;
      case "enhanced-ui":
        return <EnhancedUI onBack={() => setCurrentView("dashboard")} />;
      case "mobile-features":
        return <MobileFeatures onBack={() => setCurrentView("dashboard")} />;
      case "advanced-gamification":
        return <AdvancedGamification onBack={() => setCurrentView("dashboard")} />;
      case "security-privacy":
        return <SecurityPrivacy onBack={() => setCurrentView("dashboard")} />;
      case "accessibility-improvements":
        return <AccessibilityImprovements onBack={() => setCurrentView("dashboard")} />;
      case "dashboard":
      default:
        return (
          <Dashboard
            onAddExpense={() => setShowAddExpense(true)}
            onViewAnalytics={() => setCurrentView("analytics")}
            onViewGamification={() => setCurrentView("gamification")}
            onViewFinancialInsights={() => setCurrentView("financial-insights")}
            onViewEnhancedUI={() => setCurrentView("enhanced-ui")}
            onViewMobileFeatures={() => setCurrentView("mobile-features")}
            onViewAdvancedGamification={() => setCurrentView("advanced-gamification")}
            onViewSecurityPrivacy={() => setCurrentView("security-privacy")}
            onViewAccessibilityImprovements={() => setCurrentView("accessibility-improvements")}
            recentActivity={recentActivity}
            balances={balances}
          />
        );
    }
  };

  // Navigation functions
  const navigateToDashboard = () => {
    playClick();
    setCurrentView("dashboard");
  };
  const navigateToAnalytics = () => {
    playClick();
    setCurrentView("analytics");
  };
  const navigateToGamification = () => {
    playClick();
    setCurrentView("gamification");
  };
  const navigateToFinancialInsights = () => {
    playClick();
    setCurrentView("financial-insights");
  };
  const navigateToEnhancedUI = () => {
    playClick();
    setCurrentView("enhanced-ui");
  };
  const navigateToMobileFeatures = () => {
    playClick();
    setCurrentView("mobile-features");
  };
  const navigateToAdvancedGamification = () => {
    playClick();
    setCurrentView("advanced-gamification");
  };
  const navigateToSecurityPrivacy = () => {
    playClick();
    setCurrentView("security-privacy");
  };
  const navigateToAccessibilityImprovements = () => {
    playClick();
    setCurrentView("accessibility-improvements");
  };

  return (
    <>
      {renderView()}
      <AddExpenseModal 
        open={showAddExpense} 
        onOpenChange={setShowAddExpense} 
        onExpenseAdded={addExpenseToActivity}
      />
      {currentView !== "splash" && (
        <NavigationMenu
          onViewDashboard={navigateToDashboard}
          onViewAnalytics={navigateToAnalytics}
          onViewGamification={navigateToGamification}
          onViewFinancialInsights={navigateToFinancialInsights}
          onViewEnhancedUI={navigateToEnhancedUI}
          onViewMobileFeatures={navigateToMobileFeatures}
          onViewAdvancedGamification={navigateToAdvancedGamification}
          onViewSecurityPrivacy={navigateToSecurityPrivacy}
          onViewAccessibilityImprovements={navigateToAccessibilityImprovements}
        />
      )}
    </>
  );
};

export default Index;