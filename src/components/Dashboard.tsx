import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Users, Wallet, Zap, BarChart3, Trophy, PieChart, Shield, Settings, Users as UsersIcon, Bell, FolderOpen, Activity } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.png";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { useSound } from "@/hooks/useSound";
import { PaymentReminder } from "./PaymentReminder";
import { toast } from "sonner";

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

interface DashboardProps {
  onAddExpense: () => void;
  onViewAnalytics: () => void;
  onViewGamification: () => void;
  onViewFinancialInsights?: () => void;
  onViewEnhancedUI?: () => void;
  onViewAdvancedGamification?: () => void;
  onViewSecurityPrivacy?: () => void;
  onViewAccessibilityImprovements?: () => void;
  onViewExpenseGroups?: () => void;
  onViewPaymentReminders?: () => void;
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
  paymentReminders?: PaymentReminder[];
  onMarkPaymentAsPaid?: (reminderId: string) => void;
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
  onViewExpenseGroups,
  onViewPaymentReminders,
  recentActivity = [],
  balances = [
    { id: 1, from: "You", to: "Alice", amount: 300 },
    { id: 2, from: "Bob", to: "You", amount: 150 },
    { id: 3, from: "Alice", to: "Bob", amount: 75 },
  ],
  paymentReminders = [
    { 
      id: "1", 
      debtorName: "You", 
      creditorName: "Alice", 
      amount: 300, 
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "pending"
    },
  ],
  onMarkPaymentAsPaid
}: DashboardProps) => {
  const { theme, resolvedTheme } = useTheme();
  const { playClick, playHover, playNotification } = useSound();
  const [showPaymentReminder, setShowPaymentReminder] = useState(false);
  const [paymentKey, setPaymentKey] = useState(0); // Key to force re-render
  const [currentPaymentReminder, setCurrentPaymentReminder] = useState<PaymentReminder | null>(null);
  
  useEffect(() => {
    console.log("Dashboard - Current theme:", theme);
    console.log("Dashboard - Resolved theme:", resolvedTheme);
  }, [theme, resolvedTheme]);

  // Feature categories for navigation
  const featureCategories = [
    {
      name: "Payment Reminders",
      icon: <Bell className="w-5 h-5" />,
      action: onViewPaymentReminders,
      color: "bg-purple-500/20 text-purple-500"
    },
    {
      name: "Expense Groups",
      icon: <FolderOpen className="w-5 h-5" />,
      action: onViewExpenseGroups,
      color: "bg-green-500/20 text-green-500"
    },
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

  // Function to show the next due payment
  const showNextPaymentReminder = () => {
    if (paymentReminders && paymentReminders.length > 0) {
      // Get the next due payment (closest to current date)
      const now = new Date();
      const upcomingPayments = paymentReminders.filter(reminder =>
        reminder.status === "pending" && reminder.dueDate > now
      );

      if (upcomingPayments.length > 0) {
        const nextPayment = upcomingPayments.reduce((closest, current) => {
          if (!closest) return current;
          return current.dueDate < closest.dueDate ? current : closest;
        }, upcomingPayments[0]);

        setCurrentPaymentReminder(nextPayment);
        setPaymentKey(prev => prev + 1); // Force re-render to get new meme
        setShowPaymentReminder(true);
      } else {
        // If no upcoming payments, show a message
        toast.info("No upcoming payments due!", {
          description: "All caught up! 🎉"
        });
      }
    } else {
      // If no payment reminders, show a message
      toast.info("No payment reminders yet", {
        description: "Add some expenses to create payment reminders"
      });
    }
  };

  // Calculate payment reminder summary
  const paymentSummary = useMemo(() => {
    if (!paymentReminders || paymentReminders.length === 0) {
      return { total: 0, pending: 0, overdue: 0, completed: 0 };
    }

    const now = new Date();
    return paymentReminders.reduce((acc, reminder) => {
      acc.total++;
      if (reminder.status === "pending") acc.pending++;
      else if (reminder.status === "overdue") acc.overdue++;
      else if (reminder.status === "completed") acc.completed++;
      return acc;
    }, { total: 0, pending: 0, overdue: 0, completed: 0 });
  }, [paymentReminders]);

  // Function to mark payment reminder as paid
  const markPaymentAsPaid = (reminderId: string) => {
    // Update the paymentReminders state to mark the reminder as completed
    // This will be passed down from the parent component
    // For now, we'll just show a success message and close the modal
    toast.success("Payment marked as completed!");
    setShowPaymentReminder(false);
  };

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
              <span className="font-mono text-foreground">Karma: 1,234</span>
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
          
          {/* Payment Reminder Button */}
          <Button
            onClick={() => {
              playClick();
              playNotification(); // Play notification sound
              showNextPaymentReminder();
            }}
            className="h-24 text-lg font-display glass-strong hover-scale glow-purple border-2 border-primary/30 hover:border-primary/60 transition-all text-foreground relative overflow-hidden"
            onMouseEnter={() => playHover()}
          >
            <Bell className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Payment Reminders</div>
              <div className="text-sm text-foreground/80">
                {paymentSummary.pending > 0 ? `${paymentSummary.pending} pending` : "All caught up"}
              </div>
            </div>
            {paymentSummary.pending > 0 && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            )}
            {paymentSummary.overdue > 0 && (
              <span className="absolute top-2 right-8 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
            )}
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
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="glass-strong p-6 animate-slide-up border-primary/20 mb-8" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-display mb-4 gradient-text">Recent Activity</h2>
          
          {recentActivity.length > 0 ? (
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
                    <p className="font-semibold text-foreground">{activity.name}</p>
                    <p className="text-sm text-foreground/70">Split among {activity.split} people</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-mono font-bold gradient-text">{activity.amount}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === "settled"
                          ? "bg-accent/20 text-accent-foreground"
                          : "bg-primary/20 text-primary-foreground"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-foreground">No recent activity</h4>
              <p className="text-foreground/80 mb-4">
                Add some expenses to see your recent activity here.
              </p>
              <Button
                onClick={() => {
                  playClick();
                  onAddExpense?.();
                }}
                className="glass-strong hover-scale text-foreground"
                onMouseEnter={() => playHover()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Expense
              </Button>
            </div>
          )}
        </Card>

      </div>
      
      {/* Payment Reminder Modal */}
      {showPaymentReminder && currentPaymentReminder && (
        <PaymentReminder
          key={paymentKey} // This forces a re-render with a new meme
          id={currentPaymentReminder.id}
          debtorName={currentPaymentReminder.debtorName}
          creditorName={currentPaymentReminder.creditorName}
          amount={currentPaymentReminder.amount}
          dueDate={currentPaymentReminder.dueDate}
          groupId={currentPaymentReminder.groupId}
          expenseId={currentPaymentReminder.expenseId}
          status={currentPaymentReminder.status}
          onPayNow={() => {
            if (onMarkPaymentAsPaid) {
              onMarkPaymentAsPaid(currentPaymentReminder.id);
            }
            // Always close the payment reminder modal
            setShowPaymentReminder(false);
          }}
          onDismiss={() => setShowPaymentReminder(false)}
        />
      )}
    </div>
  );
};