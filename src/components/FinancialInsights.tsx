import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  PieChart, 
  BarChart3, 
  Wallet,
  ArrowUpDown,
  Plus,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
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
  const { playClick, playHover } = useSound();
  
  // State for budgets
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "1", category: "Food & Dining", allocated: 5000, spent: 4200, color: "bg-red-500" },
    { id: "2", category: "Transportation", allocated: 3000, spent: 2800, color: "bg-blue-500" },
    { id: "3", category: "Entertainment", allocated: 2000, spent: 2500, color: "bg-purple-500" },
    { id: "4", category: "Utilities", allocated: 4000, spent: 3800, color: "bg-green-500" },
  ]);
  
  // State for savings goals
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    { id: "1", name: "Vacation Fund", target: 50000, current: 35000, deadline: "2024-12-31" },
    { id: "2", name: "Emergency Fund", target: 100000, current: 75000, deadline: "2025-06-30" },
    { id: "3", name: "New Laptop", target: 80000, current: 20000, deadline: "2024-11-15" },
  ]);
  
  // State for adding new budget
  const [showAddBudgetForm, setShowAddBudgetForm] = useState(false);
  const [newBudgetCategory, setNewBudgetCategory] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");
  
  // State for adding new goal
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalDeadline, setNewGoalDeadline] = useState("");
  
  // Calculated totals
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [budgetPercentage, setBudgetPercentage] = useState(0);

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

  // Sample data for forecasts
  const forecasts: Forecast[] = [
    { month: "Oct", predicted: 14500, previous: 13500 },
    { month: "Nov", predicted: 15200, previous: 14200 },
    { month: "Dec", predicted: 18500, previous: 16500 },
    { month: "Jan", predicted: 13800, previous: 14800 },
    { month: "Feb", predicted: 14200, previous: 13200 },
  ];

  // Colors for budget categories
  const budgetColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500"
  ];

  // Calculate totals whenever budgets change
  useEffect(() => {
    const newTotalBudget = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
    const newTotalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    const newBudgetPercentage = Math.min(100, Math.round((newTotalSpent / newTotalBudget) * 100));
    
    setTotalBudget(newTotalBudget);
    setTotalSpent(newTotalSpent);
    setBudgetPercentage(newBudgetPercentage);
  }, [budgets]);

  // Add a new budget
  const handleAddBudget = () => {
    if (newBudgetCategory && newBudgetAmount) {
      const randomColor = budgetColors[Math.floor(Math.random() * budgetColors.length)];
      
      const newBudget: Budget = {
        id: Date.now().toString(),
        category: newBudgetCategory,
        allocated: parseFloat(newBudgetAmount),
        spent: 0,
        color: randomColor
      };
      
      setBudgets([...budgets, newBudget]);
      setNewBudgetCategory("");
      setNewBudgetAmount("");
      setShowAddBudgetForm(false);
      playClick();
    }
  };

  // Add a new savings goal
  const handleAddGoal = () => {
    if (newGoalName && newGoalTarget && newGoalDeadline) {
      const newGoal: SavingsGoal = {
        id: Date.now().toString(),
        name: newGoalName,
        target: parseFloat(newGoalTarget),
        current: 0,
        deadline: newGoalDeadline
      };
      
      setSavingsGoals([...savingsGoals, newGoal]);
      setNewGoalName("");
      setNewGoalTarget("");
      setNewGoalDeadline("");
      setShowAddGoalForm(false);
      playClick();
    }
  };

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
                onClick={() => {
                  playClick();
                  setShowAddBudgetForm(!showAddBudgetForm);
                }}
                onMouseEnter={() => playHover()}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Budget
              </Button>
            </div>
            
            {/* Add Budget Form */}
            {showAddBudgetForm && (
              <div className="mb-4 p-4 glass rounded-lg border border-primary/20 animate-slide-up">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Add New Budget</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      playClick();
                      setShowAddBudgetForm(false);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Category</label>
                    <Input
                      placeholder="e.g., Groceries, Entertainment"
                      value={newBudgetCategory}
                      onChange={(e) => {
                        setNewBudgetCategory(e.target.value);
                        playClick();
                      }}
                      className="glass mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Allocated Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 5000"
                      value={newBudgetAmount}
                      onChange={(e) => {
                        setNewBudgetAmount(e.target.value);
                        playClick();
                      }}
                      className="glass mt-1"
                    />
                  </div>
                  <Button
                    className="w-full glass-strong hover-scale text-foreground"
                    onClick={handleAddBudget}
                    disabled={!newBudgetCategory || !newBudgetAmount}
                    onMouseEnter={() => playHover()}
                  >
                    Add Budget
                  </Button>
                </div>
              </div>
            )}
            
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
                onClick={() => {
                  playClick();
                  setShowAddGoalForm(!showAddGoalForm);
                }}
                onMouseEnter={() => playHover()}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Goal
              </Button>
            </div>
            
            {/* Add Goal Form */}
            {showAddGoalForm && (
              <div className="mb-4 p-4 glass rounded-lg border border-primary/20 animate-slide-up">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Add New Goal</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      playClick();
                      setShowAddGoalForm(false);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Goal Name</label>
                    <Input
                      placeholder="e.g., Vacation Fund, Emergency Savings"
                      value={newGoalName}
                      onChange={(e) => {
                        setNewGoalName(e.target.value);
                        playClick();
                      }}
                      className="glass mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Target Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 50000"
                      value={newGoalTarget}
                      onChange={(e) => {
                        setNewGoalTarget(e.target.value);
                        playClick();
                      }}
                      className="glass mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Deadline</label>
                    <Input
                      type="date"
                      value={newGoalDeadline}
                      onChange={(e) => {
                        setNewGoalDeadline(e.target.value);
                        playClick();
                      }}
                      className="glass mt-1"
                    />
                  </div>
                  <Button
                    className="w-full glass-strong hover-scale text-foreground"
                    onClick={handleAddGoal}
                    disabled={!newGoalName || !newGoalTarget || !newGoalDeadline}
                    onMouseEnter={() => playHover()}
                  >
                    Add Goal
                  </Button>
                </div>
              </div>
            )}
            
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