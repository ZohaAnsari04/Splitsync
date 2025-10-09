import { Card } from "@/components/ui/card";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface Balance {
  id: number;
  from: string;
  to: string;
  amount: number;
}

interface BalanceSummaryProps {
  balances: Balance[];
}

export const BalanceSummary = ({ balances }: BalanceSummaryProps) => {
  const { playClick, playHover } = useSound();
  
  // Filter out zero balances
  const nonZeroBalances = balances.filter(balance => balance.amount > 0);
  
  if (nonZeroBalances.length === 0) {
    return (
      <Card className="glass-strong p-6 animate-slide-up border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display gradient-text">Balance Summary</h2>
        </div>
        <p className="text-muted-foreground text-center py-4">
          All balances are settled! No one owes anyone anything.
        </p>
      </Card>
    );
  }

  return (
    <Card className="glass-strong p-6 animate-slide-up border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-display gradient-text">Balance Summary</h2>
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">
          Showing who owes whom and how much:
        </div>
        
        <div className="space-y-3">
          {nonZeroBalances.map((balance) => (
            <div 
              key={balance.id}
              className="glass p-4 rounded-lg hover-scale cursor-pointer group transition-all hover:border-primary/40 border border-transparent"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{balance.from}</p>
                    <p className="text-sm text-muted-foreground">owes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-lg gradient-text">₹{balance.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">to {balance.to}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <ArrowDownLeft className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                <p>Transaction ID: #{balance.id.toString().padStart(4, '0')}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="glass p-4 rounded-lg mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Balances update automatically when you add new expenses
          </p>
        </div>
      </div>
    </Card>
  );
};