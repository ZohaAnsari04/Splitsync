import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  PieChart, 
  BarChart3, 
  Wallet,
  ArrowUpDown,
  Plus
} from "lucide-react";
import { useState } from "react";
import { useSound } from "@/hooks/useSound";

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  color: string;
}

interface SpendingComparison {
  period: string;
  amount: number;
  change: number;
}

interface SpendingHabit {
  category: string;
  percentage: number;
  trend: "up" | "down" | "stable";
}

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

interface Forecast {
  month: string;
  predicted: number;
  previous: number;
}

export const FinancialInsights = ({ onBack }: { onBack: () => void }) => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");
  const { playClick, playHover } = useSound();
  
  // Sample data for budgets
  const budgets: Budget[] = [
    { id: "1", category: "Food & Dining", allocated: 5000, spent: 4200, color: "bg-red-500" },
    { id: "2", category: "Transportation", allocated: 3000, spent: 2800, color: "bg-blue-500" },
    { id: "3", category: "Entertainment", allocated: 2000, spent: 2500, color: "bg-purple-500" },
    { id: "4", category: "Utilities", allocated: 4000, spent: 3800, color: "bg-green-500" },
  ];

  // Sample data for spending comparisons
  const spendingComparisons: SpendingComparison[] = [
    { period: "This Month", amount: 13500, change: 12.5 },
    { period: "Last Month", amount: 12000, change: -5.2 },
    { period: "Same Period Last Year", amount: 11800, change: 8.3 },
  ];

  // Sample data for spending habits
  const spendingHabits: SpendingHabit[] = [
    { category: "Food & Dining", percentage: 31, trend: "up" },
    { category: "Transportation", percentage: 21, trend: "stable" },
    { category: "Entertainment", percentage: 18, trend: "up" },
    { category: "Utilities", percentage: 15, trend: "down" },
    { category: "Shopping", percentage: 10, trend: "stable" },
    { category: "Other", percentage: 5, trend: "down" },
  ];

  // Sample data for savings goals
  const savingsGoals: SavingsGoal[] = [
    { id: "1", name: "Vacation Fund", target: 50000, current: 35000, deadline: "2024-12-31" },
    { id: "2", name: "Emergency Fund", target: 100000, current: 75000, deadline: "2025-06-30" },
    { id: "3", name: "New Laptop", target: 80000, current: 20000, deadline: "2024-11-15" },
  ];

  // Sample data for forecasts
  const forecasts: Forecast[] = [
    { month: "Oct", predicted: 14500, previous: 13500 },
    { month: "Nov", predicted: 15200, previous: 14200 },
    { month: "Dec", predicted: 18500, previous: 16500 },
    { month: "Jan", predicted: 13800, previous: 14800 },
    { month: "Feb", predicted: 14200, previous: 13200 },
  ];

  // Calculate total budget vs spending
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const budgetPercentage = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  return (
    <div className="min-h-screen relative overflow-hidden p-6">
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-display gradient-text">Financial Insights</h1>
            <p className="text-muted-foreground">Track your spending patterns and financial goals</p>
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

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          <Button 
            variant={timeRange === "week" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setTimeRange("week");
            }}
            className={timeRange === "week" ? "glass-strong text-foreground" : "glass text-foreground"}
            onMouseEnter={() => playHover()}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === "month" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setTimeRange("month");
            }}
            className={timeRange === "month" ? "glass-strong text-foreground" : "glass text-foreground"}
            onMouseEnter={() => playHover()}
          >
            Month
          </Button>
          <Button 
            variant={timeRange === "quarter" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setTimeRange("quarter");
            }}
            className={timeRange === "quarter" ? "glass-strong text-foreground" : "glass text-foreground"}
            onMouseEnter={() => playHover()}
          >
            Quarter
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass-strong p-6 hover-scale">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display gradient-text flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Budget Overview
              </h2>
              <Button 
                size="sm" 
                className="glass-strong hover-scale text-foreground"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Budget
              </Button>
            </div>
            
            <div className="space-y-4">
              {budgets.map((budget) => {
                const percentage = Math.min(100, Math.round((budget.spent / budget.allocated) * 100));
                return (
                  <div key={budget.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{budget.category}</span>
                      <span className="font-mono">₹{budget.spent.toLocaleString()} / ₹{budget.allocated.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${budget.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-mono font-bold gradient-text">₹{totalSpent.toLocaleString()} / ₹{totalBudget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 mt-2">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${budgetPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Spending Comparison */}
          <Card className="glass-strong p-6 hover-scale">
            <h2 className="text-xl font-display gradient-text flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5" />
              Spending Comparison
            </h2>
            
            <div className="space-y-4">
              {spendingComparisons.map((comparison, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <span>{comparison.period}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">₹{comparison.amount.toLocaleString()}</span>
                    <Badge 
                      variant="secondary" 
                      className={comparison.change >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}
                    >
                      {comparison.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {Math.abs(comparison.change)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Spending Habits & Savings Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spending Habits */}
          <Card className="glass-strong p-6 hover-scale">
            <h2 className="text-xl font-display gradient-text flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5" />
              Spending Habits
            </h2>
            
            <div className="space-y-4">
              {spendingHabits.map((habit, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between cursor-pointer hover-scale p-2 rounded"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-display">{habit.percentage}%</span>
                    </div>
                    <span>{habit.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {habit.trend === "up" && <TrendingUp className="w-4 h-4 text-red-500" />}
                    {habit.trend === "down" && <TrendingDown className="w-4 h-4 text-green-500" />}
                    {habit.trend === "stable" && <ArrowUpDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Savings Goals */}
          <Card className="glass-strong p-6 hover-scale">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display gradient-text flex items-center gap-2">
                <Target className="w-5 h-5" />
                Savings Goals
              </h2>
              <Button 
                size="sm" 
                className="glass-strong hover-scale text-foreground"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Goal
              </Button>
            </div>
            
            <div className="space-y-4">
              {savingsGoals.map((goal) => {
                const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
                const deadline = new Date(goal.deadline);
                const today = new Date();
                const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div 
                    key={goal.id} 
                    className="p-3 glass rounded cursor-pointer hover-scale"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{goal.name}</span>
                      <span className="font-mono">₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mb-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-accent to-primary"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={daysLeft < 30 ? "text-red-500" : "text-muted-foreground"}>
                        {daysLeft} days left
                      </span>
                      <span>{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Expense Forecasting */}
        <Card className="glass-strong p-6 hover-scale mb-8">
          <h2 className="text-xl font-display gradient-text flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" />
            Expense Forecasting
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {forecasts.map((forecast, index) => {
              const change = forecast.predicted - forecast.previous;
              const changePercentage = ((change / forecast.previous) * 100).toFixed(1);
              
              return (
                <div 
                  key={index} 
                  className="text-center p-4 glass rounded cursor-pointer hover-scale"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="text-sm text-muted-foreground mb-1">{forecast.month}</div>
                  <div className="font-mono font-bold gradient-text text-lg">₹{forecast.predicted.toLocaleString()}</div>
                  <div className={`text-xs mt-1 ${change >= 0 ? "text-red-500" : "text-green-500"}`}>
                    {change >= 0 ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
                    {Math.abs(parseFloat(changePercentage))}%
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};