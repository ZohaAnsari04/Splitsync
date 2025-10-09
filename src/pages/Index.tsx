import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { Dashboard } from "@/components/Dashboard";
import { AddExpenseModal } from "@/components/AddExpenseModal";
import { Analytics } from "@/components/Analytics";
import { Gamification } from "@/components/Gamification";
import { FinancialInsights } from "@/components/FinancialInsights";
import { EnhancedUI } from "@/components/EnhancedUI";
import { AdvancedGamification } from "@/components/AdvancedGamification";
import { SecurityPrivacy } from "@/components/SecurityPrivacy";
import { AccessibilityImprovements } from "@/components/AccessibilityImprovements";
import { NavigationMenu } from "@/components/NavigationMenu";
import { useSound } from "@/hooks/useSound";
import { toast } from "sonner";

type View = "splash" | "dashboard" | "analytics" | "gamification" | "financial-insights" | "enhanced-ui" | "advanced-gamification" | "security-privacy" | "accessibility-improvements";

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

// Define the streak type
interface Streak {
  current: number;
  longest: number;
  lastLogged: string;
}

// Define the payment reminder type
interface PaymentReminder {
  debtorName: string;
  creditorName: string;
  amount: number;
  dueDate: Date;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("splash");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const { playClick, playHover, playNotification } = useSound();
  
  // Sample recent activity data
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    { name: "Dinner at Zomato", amount: "₹1,200", split: 4, status: "pending" },
    { name: "Movie Tickets", amount: "₹800", split: 2, status: "settled" },
    { name: "Grocery Shopping", amount: "₹2,450", split: 3, status: "pending" },
    { name: "Fuel", amount: "₹1,800", split: 4, status: "pending" },
    { name: "Online Shopping", amount: "₹3,200", split: 1, status: "settled" },
  ]);
  
  // Sample balance data
  const [balances, setBalances] = useState<Balance[]>([
    { id: 1, from: "You", to: "Alice", amount: 300 },
    { id: 2, from: "Bob", to: "You", amount: 150 },
    { id: 3, from: "Alice", to: "Bob", amount: 75 },
  ]);
  
  // Sample expenses data
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  // Payment reminders data
  const [paymentReminders, setPaymentReminders] = useState<PaymentReminder[]>([
    { debtorName: "You", creditorName: "Alice", amount: 300, dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  ]);
  
  // Streak data
  const [streak, setStreak] = useState<Streak>({
    current: 15,
    longest: 28,
    lastLogged: new Date().toISOString().split('T')[0]
  });
  
  // Add a new expense to recent activity
  const addExpenseToActivity = (name: string, amount: number, split: number) => {
    const newActivity: RecentActivity = {
      name,
      amount: `₹${amount.toLocaleString()}`,
      split,
      status: "pending"
    };
    
    setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only the last 10 activities
    
    // Add the expense to the expenses list with proper participants
    const defaultParticipants = ["You", "Alice", "Bob"];
    const actualParticipants = split <= defaultParticipants.length 
      ? defaultParticipants.slice(0, split) 
      : [...defaultParticipants, ...Array(split - defaultParticipants.length).fill("Friend")];
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      name,
      amount,
      split,
      participants: actualParticipants,
      date: new Date()
    };
    
    setExpenses(prev => [...prev, newExpense]);
    
    // Update streak when expense is added
    updateStreak();
    
    // Update balances based on the new expense
    updateBalances(newExpense);
    
    // Update payment reminders based on the new expense
    updatePaymentReminders(newExpense);
    
    // Show notification
    toast.success(`New expense added: ${name} - ₹${amount.toLocaleString()}`, {
      description: `Split among ${split} people`,
      duration: 5000,
    });
    
    // Play notification sound
    playNotification();
  };

  // Function to update streak when an expense is added
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // If last logged was yesterday or today, increment current streak
    if (streak.lastLogged === yesterday || streak.lastLogged === today) {
      const newCurrentStreak = streak.lastLogged === today ? streak.current : streak.current + 1;
      const newLongestStreak = Math.max(newCurrentStreak, streak.longest);
      
      const updatedStreak = {
        current: newCurrentStreak,
        longest: newLongestStreak,
        lastLogged: today
      };
      
      setStreak(updatedStreak);
      
      // Show streak notification if it's a new day
      if (streak.lastLogged !== today) {
        toast.success(`Streak maintained! ${newCurrentStreak} days in a row! 🔥`, {
          description: `Your longest streak is ${newLongestStreak} days`,
          duration: 5000,
        });
      }
    } else if (streak.lastLogged !== today) {
      // If last logged was not today or yesterday, reset streak to 1
      const updatedStreak = {
        current: 1,
        longest: streak.longest,
        lastLogged: today
      };
      
      setStreak(updatedStreak);
      
      toast.info("New streak started! Add expenses daily to build your streak. 🔥", {
        duration: 5000,
      });
    }
  };

  // Function to update balances when a new expense is added
  const updateBalances = (expense: Expense) => {
    // Create a more realistic balance calculation
    const amountPerPerson = expense.amount / expense.split;
    
    // For demonstration, we'll show a more detailed balance summary
    let updatedBalances = [...balances];
    
    // Assume "You" is the one who paid for this expense
    const payer = "You";
    
    // For each participant (except the payer), they owe the payer
    expense.participants.forEach(participant => {
      if (participant !== payer) {
        // Check if a balance entry already exists for this pair
        const existingBalanceIndex = updatedBalances.findIndex(
          b => b.from === participant && b.to === payer
        );
        
        if (existingBalanceIndex !== -1) {
          // Update existing balance
          updatedBalances[existingBalanceIndex] = {
            ...updatedBalances[existingBalanceIndex],
            amount: updatedBalances[existingBalanceIndex].amount + amountPerPerson
          };
        } else {
          // Create new balance entry
          updatedBalances.push({
            id: updatedBalances.length + 1,
            from: participant,
            to: payer,
            amount: amountPerPerson
          });
        }
      }
    });
    
    setBalances(updatedBalances);
  };

  // Function to update payment reminders when a new expense is added
  const updatePaymentReminders = (expense: Expense) => {
    // Create a new payment reminder based on the expense
    const newReminder: PaymentReminder = {
      debtorName: "You",
      creditorName: "Alice",
      amount: expense.amount / expense.split,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Due in 7 days
    };
    
    setPaymentReminders(prev => [...prev, newReminder]);
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
      case "advanced-gamification":
        return <AdvancedGamification onBack={() => setCurrentView("dashboard")} streak={streak} />;
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
            onViewAdvancedGamification={() => setCurrentView("advanced-gamification")}
            onViewSecurityPrivacy={() => setCurrentView("security-privacy")}
            onViewAccessibilityImprovements={() => setCurrentView("accessibility-improvements")}
            recentActivity={recentActivity}
            balances={balances}
            paymentReminders={paymentReminders}
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
          onViewAdvancedGamification={navigateToAdvancedGamification}
          onViewSecurityPrivacy={navigateToSecurityPrivacy}
          onViewAccessibilityImprovements={navigateToAccessibilityImprovements}
        />
      )}
    </>
  );
};

export default Index;