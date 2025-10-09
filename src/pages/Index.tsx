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
import { ExpenseGroups } from "@/components/ExpenseGroups";
import { PaymentReminders } from "@/components/PaymentReminders";
import { useSound } from "@/hooks/useSound";
import { toast } from "sonner";

type View = "splash" | "dashboard" | "analytics" | "gamification" | "financial-insights" | "enhanced-ui" | "advanced-gamification" | "security-privacy" | "accessibility-improvements" | "expense-groups" | "payment-reminders";

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
  groupId?: string; // Optional field to associate expense with a group
}

// Define the streak type
interface Streak {
  current: number;
  longest: number;
  lastLogged: string;
}

// Define the payment reminder type
interface PaymentReminder {
  id: string;
  debtorName: string;
  creditorName: string;
  amount: number;
  dueDate: Date;
  groupId?: string;
  expenseId?: string;
  status: "pending" | "overdue" | "completed";
}

// Define the expense group type
interface ExpenseGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  participants: string[];
  createdDate: Date;
  totalExpenses: number;
  totalAmount: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("splash");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const { playClick, playHover, playNotification } = useSound();
  
  // Load recent activity data from localStorage or use sample data
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(() => {
    const savedActivity = localStorage.getItem('recentActivity');
    if (savedActivity) {
      try {
        const parsedActivity = JSON.parse(savedActivity);
        // Remove duplicates based on name and amount, keeping the first occurrence
        const seen = new Set();
        const uniqueActivity = parsedActivity.filter((activity: RecentActivity) => {
          const key = `${activity.name}-${activity.amount}`;
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        });
        return uniqueActivity;
      } catch (e) {
        console.error('Failed to parse recent activity from localStorage', e);
      }
    }
    // Default sample data
    return [
      { name: "Dinner at Zomato", amount: "₹1,200", split: 4, status: "pending" },
      { name: "Movie Tickets", amount: "₹800", split: 2, status: "settled" },
      { name: "Grocery Shopping", amount: "₹2,450", split: 3, status: "pending" },
      { name: "Fuel", amount: "₹1,800", split: 4, status: "pending" },
      { name: "Online Shopping", amount: "₹3,200", split: 1, status: "settled" },
    ];
  });
  
  // Sample balance data
  const [balances, setBalances] = useState<Balance[]>([
    { id: 1, from: "You", to: "Alice", amount: 300 },
    { id: 2, from: "Bob", to: "You", amount: 150 },
    { id: 3, from: "Alice", to: "Bob", amount: 75 },
  ]);
  
  // Sample expenses data
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Expense groups data with localStorage persistence
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroup[]>(() => {
    const savedGroups = localStorage.getItem('expenseGroups');
    if (savedGroups) {
      try {
        const parsedGroups = JSON.parse(savedGroups);
        // Convert date strings back to Date objects
        return parsedGroups.map((group: any) => ({
          ...group,
          createdDate: new Date(group.createdDate)
        }));
      } catch (e) {
        console.error('Failed to parse expense groups from localStorage', e);
      }
    }
    // Default sample groups
    return [
      {
        id: 'group-1',
        name: 'Roommates',
        description: 'Monthly shared expenses for apartment',
        color: 'from-blue-500 to-cyan-500',
        participants: ['You', 'Alice', 'Bob'],
        createdDate: new Date(),
        totalExpenses: 3,
        totalAmount: 4500
      },
      {
        id: 'group-2',
        name: 'Trip to Goa',
        description: 'Vacation expenses for Goa trip',
        color: 'from-green-500 to-emerald-500',
        participants: ['You', 'Alice', 'Charlie'],
        createdDate: new Date(),
        totalExpenses: 2,
        totalAmount: 12000
      }
    ];
  });

  // Save expense groups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenseGroups', JSON.stringify(expenseGroups));
  }, [expenseGroups]);

  // Function to create a new expense group
  const createExpenseGroup = (name: string, description: string, participants: string[], color: string) => {
    const newGroup: ExpenseGroup = {
      id: `group-${Date.now()}`,
      name,
      description,
      color,
      participants,
      createdDate: new Date(),
      totalExpenses: 0,
      totalAmount: 0
    };

    setExpenseGroups(prev => [...prev, newGroup]);
    toast.success(`Expense group "${name}" created successfully!`, {
      description: `Added ${participants.length} participants`,
      duration: 4000,
    });
  };

  // Function to update an expense group
  const updateExpenseGroup = (groupId: string, updates: Partial<ExpenseGroup>) => {
    setExpenseGroups(prev => prev.map(group =>
      group.id === groupId ? { ...group, ...updates } : group
    ));
    toast.success("Expense group updated successfully!");
  };

  // Function to delete an expense group
  const deleteExpenseGroup = (groupId: string) => {
    const groupToDelete = expenseGroups.find(group => group.id === groupId);
    setExpenseGroups(prev => prev.filter(group => group.id !== groupId));

    // Remove group association from expenses
    setExpenses(prev => prev.map(expense =>
      expense.groupId === groupId ? { ...expense, groupId: undefined } : expense
    ));

    toast.success(`Expense group "${groupToDelete?.name}" deleted successfully!`);
  };

  // Payment reminders data with localStorage persistence
  const [paymentReminders, setPaymentReminders] = useState<PaymentReminder[]>(() => {
    const savedReminders = localStorage.getItem('paymentReminders');
    if (savedReminders) {
      try {
        const parsedReminders = JSON.parse(savedReminders);
        // Convert date strings back to Date objects
        return parsedReminders.map((reminder: any) => ({
          ...reminder,
          dueDate: new Date(reminder.dueDate)
        }));
      } catch (e) {
        console.error('Failed to parse payment reminders from localStorage', e);
      }
    }
    // Default sample data
    return [
      { debtorName: "You", creditorName: "Alice", amount: 300, dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    ];
  });

  // Save payment reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('paymentReminders', JSON.stringify(paymentReminders));
  }, [paymentReminders]);

  // Function to clear all payment reminders
  const clearPaymentReminders = () => {
    setPaymentReminders([]);
  };

  // Streak data
  const [streak, setStreak] = useState<Streak>({
    current: 15,
    longest: 28,
    lastLogged: new Date().toISOString().split('T')[0]
  });
  
  // Function to clear all recent activity
  const clearRecentActivity = () => {
    setRecentActivity([]);
  };

  // Save recent activity to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentActivity', JSON.stringify(recentActivity));
  }, [recentActivity]);
  
  // Add a new expense to recent activity
  const addExpenseToActivity = (name: string, amount: number, participants: string[], groupId?: string) => {
    const newActivity: RecentActivity = {
      name,
      amount: `₹${amount.toLocaleString()}`,
      split: participants.length,
      status: "pending"
    };

    setRecentActivity(prev => {
      // Check if an activity with the same name and amount already exists at the top
      if (prev.length > 0 && 
          prev[0].name === newActivity.name && 
          prev[0].amount === newActivity.amount) {
        // If it's the same as the most recent activity, don't add it again
        return prev;
      }
      
      // Add the new activity and keep only the last 10 unique activities
      return [newActivity, ...prev].slice(0, 10);
    });

    // Add the expense to the expenses list with the provided participants
    const newExpense: Expense = {
      id: Date.now().toString(),
      name,
      amount,
      split: participants.length,
      participants: participants,
      date: new Date(),
      groupId
    };

    setExpenses(prev => [...prev, newExpense]);

    // Update group totals if expense belongs to a group
    if (groupId) {
      setExpenseGroups(prev => prev.map(group =>
        group.id === groupId
          ? {
              ...group,
              totalExpenses: group.totalExpenses + 1,
              totalAmount: group.totalAmount + amount
            }
          : group
      ));
    }
    
    // Update streak when expense is added
    updateStreak();
    
    // Update balances based on the new expense
    updateBalances(newExpense);
    
    // Update payment reminders based on the new expense
    updatePaymentReminders(newExpense);
    
    // Show notification
    toast.success(`New expense added: ${name} - ₹${amount.toLocaleString()}`, {
      description: `Split among ${participants.length} people`,
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
    // Create payment reminders for each participant who owes money
    const amountPerPerson = expense.amount / expense.participants.length;
    const payer = expense.participants[0]; // Assume first participant paid

    // Create reminders for each participant (except the payer)
    const newReminders: PaymentReminder[] = [];

    expense.participants.forEach(participant => {
      if (participant !== payer) {
        newReminders.push({
          id: `${expense.id}-${participant}-${payer}`,
          debtorName: participant,
          creditorName: payer,
          amount: amountPerPerson,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 7 days
          groupId: expense.groupId,
          expenseId: expense.id,
          status: "pending"
        });
      }
    });

    // Add all new reminders to the existing ones
    setPaymentReminders(prev => [...prev, ...newReminders]);
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
      case "expense-groups":
        return (
          <ExpenseGroups
            groups={expenseGroups}
            expenses={expenses}
            onCreateGroup={createExpenseGroup}
            onUpdateGroup={updateExpenseGroup}
            onDeleteGroup={deleteExpenseGroup}
            onBack={() => setCurrentView("dashboard")}
            onExpenseAdded={addExpenseToActivity}
          />
        );
      case "payment-reminders":
        return (
          <PaymentReminders
            paymentReminders={paymentReminders}
            expenses={expenses}
            groups={expenseGroups}
            onBack={() => setCurrentView("dashboard")}
            onMarkAsPaid={(reminderId) => {
              setPaymentReminders(prev => prev.map(r =>
                r.id === reminderId ? { ...r, status: "completed" } : r
              ));
            }}
            onDeleteReminder={(reminderId) => {
              setPaymentReminders(prev => prev.filter(r => r.id !== reminderId));
            }}
          />
        );
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
            onViewExpenseGroups={() => setCurrentView("expense-groups")}
            onViewPaymentReminders={() => setCurrentView("payment-reminders")}
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
  const navigateToExpenseGroups = () => {
    playClick();
    setCurrentView("expense-groups");
  };
  const navigateToPaymentReminders = () => {
    playClick();
    setCurrentView("payment-reminders");
  };

  return (
    <>
      {renderView()}
      <AddExpenseModal
        open={showAddExpense}
        onOpenChange={setShowAddExpense}
        onExpenseAdded={addExpenseToActivity}
        expenseGroups={expenseGroups}
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
          onViewExpenseGroups={navigateToExpenseGroups}
          onViewPaymentReminders={navigateToPaymentReminders}
        />
      )}
    </>
  );
};

export default Index;