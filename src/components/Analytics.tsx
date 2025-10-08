import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, PieChart, Calendar, Leaf } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/logo.png";
import { useSound } from "@/hooks/useSound";

interface AnalyticsProps {
  onBack: () => void;
}

export const Analytics = ({ onBack }: AnalyticsProps) => {
  const { playClick, playHover } = useSound();
  
  const monthlyData = [
    { month: "Jan", amount: 4500 },
    { month: "Feb", amount: 5200 },
    { month: "Mar", amount: 4800 },
    { month: "Apr", amount: 6100 },
    { month: "May", amount: 5500 },
    { month: "Jun", amount: 7200 },
  ];

  const categoryData = [
    { name: "Food", value: 35, color: "bg-purple-500" },
    { name: "Transport", value: 20, color: "bg-cyan-500" },
    { name: "Entertainment", value: 25, color: "bg-green-500" },
    { name: "Shopping", value: 20, color: "bg-pink-500" },
  ];

  const maxAmount = Math.max(...monthlyData.map((d) => d.amount));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-slide-up">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                playClick();
                onBack();
              }}
              className="hover-scale"
              onMouseEnter={() => playHover()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src={logo} alt="SplitSync" className="w-10 h-10" />
            <h1 className="text-2xl font-display gradient-text">Analytics Hub</h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="glass-strong p-6 hover-scale animate-slide-up border-primary/20 cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="font-display">Monthly Trend</h3>
            </div>
            <p className="text-3xl font-bold gradient-text">↑ 23%</p>
            <p className="text-sm text-muted-foreground mt-1">vs last month</p>
          </Card>

          <Card 
            className="glass-strong p-6 hover-scale animate-slide-up border-secondary/20 cursor-pointer"
            style={{ animationDelay: '0.1s' }}
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-6 h-6 text-secondary" />
              <h3 className="font-display">Top Category</h3>
            </div>
            <p className="text-3xl font-bold gradient-text">Food</p>
            <p className="text-sm text-muted-foreground mt-1">35% of expenses</p>
          </Card>

          <Card 
            className="glass-strong p-6 hover-scale animate-slide-up border-accent/20 cursor-pointer"
            style={{ animationDelay: '0.2s' }}
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-6 h-6 text-accent" />
              <h3 className="font-display">Carbon Saved</h3>
            </div>
            <p className="text-3xl font-bold gradient-text">12.4 kg</p>
            <p className="text-sm text-muted-foreground mt-1">by shared rides</p>
          </Card>
        </div>

        {/* 3D Bar Chart */}
        <Card className="glass-strong p-6 mb-8 animate-slide-up border-primary/20" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-display text-xl mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Monthly Spending
          </h3>
          
          <div className="h-64 flex items-end justify-around gap-4 px-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full group">
                  <div
                    className="glass-strong hover-scale cursor-pointer border-2 border-primary/30 hover:border-primary/60 transition-all rounded-t-lg relative overflow-hidden animate-slide-up"
                    style={{
                      height: `${(data.amount / maxAmount) * 200}px`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-secondary to-accent opacity-50 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Value on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-mono font-bold text-sm">₹{data.amount}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-semibold">{data.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="glass-strong p-6 animate-slide-up border-secondary/20" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-display text-xl mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-secondary" />
            Category Breakdown
          </h3>
          
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div 
                key={category.name} 
                className="animate-scale-in cursor-pointer hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{category.name}</span>
                  <span className="font-mono text-primary">{category.value}%</span>
                </div>
                
                <div className="h-3 glass rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color} transition-all duration-1000 ease-out rounded-full`}
                    style={{
                      width: `${category.value}%`,
                      animation: 'shimmer 3s linear infinite',
                      backgroundSize: '200% 100%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};