import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Plus,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Trophy,
  Calculator,
  Activity,
  User,
  Crown,
  Medal,
  Award
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AddExpenseModal } from "./AddExpenseModal";
import logo from "@/assets/logo.png";
import { useSound } from "@/hooks/useSound";

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

interface Expense {
  id: string;
  name: string;
  amount: number;
  split: number;
  participants: string[];
  date: Date;
  groupId?: string;
}

interface GroupDetailsProps {
  group: ExpenseGroup;
  expenses: Expense[];
  onBack: () => void;
  onAddExpense?: () => void;
  onExpenseAdded?: (name: string, amount: number, participants: string[], groupId?: string) => void;
}

// Dynamic calculations replace hardcoded sample data

export const GroupDetails = ({ group, expenses, onBack, onAddExpense, onExpenseAdded }: GroupDetailsProps) => {
  const { playClick, playHover } = useSound();
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Filter expenses for this group
  const groupExpenses = useMemo(() => {
    return expenses.filter(expense => expense.groupId === group.id);
  }, [expenses, group.id]);

  // Calculate who owes whom based on expenses
  const pendingPayments = useMemo(() => {
    const calculations = new Map<string, Map<string, number>>();

    // For each expense, calculate settlements between participants
    groupExpenses.forEach(expense => {
      // Only consider participants that are actually in this group
      const validParticipants = expense.participants.filter(p => group.participants.includes(p));

      if (validParticipants.length === 0) return; // Skip if no valid participants

      const amountPerPerson = expense.amount / validParticipants.length;
      const payer = validParticipants[0]; // Assume first valid participant paid

      validParticipants.forEach(participant => {
        if (participant !== payer) {
          if (!calculations.has(participant)) {
            calculations.set(participant, new Map<string, number>());
          }
          const currentOwed = calculations.get(participant)?.get(payer) || 0;
          calculations.get(participant)?.set(payer, currentOwed + amountPerPerson);
        }
      });
    });

    // Convert to array format for display
    const payments: Array<{
      id: string;
      from: string;
      to: string;
      amount: number;
      dueDate: Date;
    }> = [];

    calculations.forEach((debts, debtor) => {
      debts.forEach((amount, creditor) => {
        payments.push({
          id: `${debtor}-${creditor}`,
          from: debtor,
          to: creditor,
          amount: Math.round(amount * 100) / 100,
          dueDate: new Date()
        });
      });
    });

    return payments;
  }, [groupExpenses, group.participants]);

  // Calculate group statistics
  const groupStats = useMemo(() => {
    const totalAmount = groupExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalExpenses = groupExpenses.length;
    const averagePerPerson = group.participants.length > 0 ? totalAmount / group.participants.length : 0;
    const totalPending = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);

    return {
      totalAmount,
      totalExpenses,
      averagePerPerson,
      pendingPayments: pendingPayments.length,
      totalPending
    };
  }, [groupExpenses, group.participants.length, pendingPayments]);

  // Calculate leaderboard data
  const leaderboard = useMemo(() => {
    const participantStats = new Map<string, { paid: number; owed: number; net: number }>();

    groupExpenses.forEach(expense => {
      // Only consider participants that are actually in this group
      const validParticipants = expense.participants.filter(p => group.participants.includes(p));
      const amountPerPerson = expense.amount / validParticipants.length;
      const payer = validParticipants[0]; // Assume first valid participant paid

      validParticipants.forEach(participant => {
        const current = participantStats.get(participant) || { paid: 0, owed: 0, net: 0 };

        if (participant === payer) {
          current.paid += expense.amount;
        } else {
          current.owed += amountPerPerson;
        }

        current.net = current.paid - current.owed;
        participantStats.set(participant, current);
      });
    });

    return Array.from(participantStats.entries())
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.net - a.net)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, [groupExpenses, group.participants]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  // Get rank icon based on position
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  // Handle expense creation for this group
  const handleAddExpenseToGroup = (name: string, amount: number, participants: string[], groupId?: string) => {
    if (onExpenseAdded) {
      // Always use the current group's ID when adding expenses from group details
      onExpenseAdded(name, amount, participants, group.id);
    }
  };

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
            <div>
              <h1 className="text-2xl font-display gradient-text">{group.name}</h1>
              <p className="text-foreground/80">{group.participants.length} members</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                playClick();
                setShowAddExpense(true);
              }}
              className="glass-strong hover-scale text-foreground"
              onMouseEnter={() => playHover()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Group Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Spent */}
          <Card className="glass-strong p-6 hover-scale animate-slide-up border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center`}>
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground">Total Spent</h3>
                <p className="text-sm text-foreground/80">In this group</p>
              </div>
            </div>
            <p className="text-3xl font-bold gradient-text mb-2">
              {formatCurrency(groupStats.totalAmount)}
            </p>
            <p className="text-sm text-muted-foreground">
              Across {groupStats.totalExpenses} expenses
            </p>
          </Card>

          {/* Pending Payments */}
          <Card className="glass-strong p-6 hover-scale animate-slide-up border-secondary/20" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center`}>
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground">Pending Payments</h3>
                <p className="text-sm text-foreground/80">Awaiting settlement</p>
              </div>
            </div>
            <p className="text-3xl font-bold gradient-text mb-2">
              {groupStats.pendingPayments}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(groupStats.totalPending)} total
            </p>
          </Card>

          {/* Leaderboard */}
          <Card className="glass-strong p-6 hover-scale animate-slide-up border-accent/20 cursor-pointer" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center`}>
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground">Leaderboard</h3>
                <p className="text-sm text-foreground/80">Group rankings</p>
              </div>
            </div>
            <p className="text-3xl font-bold gradient-text mb-2">
              View Ranks
            </p>
            <p className="text-sm text-muted-foreground">
              See who's leading
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Who Owes Whom */}
          <Card className="glass-strong p-6 animate-slide-up border-primary/20" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-display text-xl mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Who Owes Whom
            </h3>

            {pendingPayments.length > 0 ? (
              <div className="space-y-3">
                {pendingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="glass p-4 rounded-lg hover-scale cursor-pointer border border-primary/20"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className={`bg-gradient-to-br ${group.color}`}>
                            {payment.from.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{payment.from}</p>
                          <p className="text-sm text-foreground/80">owes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold gradient-text">{formatCurrency(payment.amount)}</p>
                        <p className="text-sm text-foreground/80">to You</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calculator className="w-16 h-16 mx-auto mb-4 text-foreground/30" />
                <h4 className="text-lg font-semibold mb-2 text-foreground">No pending payments</h4>
                <p className="text-foreground/80 mb-4">
                  Add some expenses to see who owes whom and settle payments easily.
                </p>
                <Button
                  onClick={() => {
                    playClick();
                    setShowAddExpense(true);
                  }}
                  className="glass-strong hover-scale"
                  onMouseEnter={() => playHover()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="text-foreground">Add First Expense</span>
                </Button>
              </div>
            )}
          </Card>

          {/* Leaderboard */}
          <Card className="glass-strong p-6 animate-slide-up border-secondary/20" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-display text-xl mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" />
              Group Leaderboard
            </h3>

            <div className="space-y-3">
              {leaderboard.map((member) => (
                <div
                  key={member.name}
                  className={`glass p-4 rounded-lg hover-scale cursor-pointer border transition-all ${
                    member.rank <= 3 ? 'border-accent/30 glow-purple' : 'border-transparent'
                  }`}
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 w-8">
                      {getRankIcon(member.rank)}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={`bg-gradient-to-br ${group.color}`}>
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-sm text-foreground/80">
                        Paid: {formatCurrency(member.paid)} • Owed: {formatCurrency(member.owed)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${member.net >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {member.net >= 0 ? '+' : ''}{formatCurrency(member.net)}
                      </p>
                      <p className="text-sm text-muted-foreground">Net</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="glass-strong p-6 animate-slide-up border-accent/20" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-accent" />
            <h3 className="font-display text-xl text-foreground">Recent Activity</h3>
          </div>

          {groupExpenses.length > 0 ? (
            <div className="space-y-3">
              {groupExpenses.slice(0, 5).map((expense, index) => (
                <div
                  key={expense.id}
                  className="glass p-4 rounded-lg hover-scale cursor-pointer border border-primary/20 hover:border-primary/40 transition-all"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">
                          {expense.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{expense.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Paid by {expense.participants[0]} • {expense.participants.length} people • {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold gradient-text">{formatCurrency(expense.amount)}</p>
                      <Badge variant="outline" className="text-xs">
                        Equal
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}

              {groupExpenses.length > 5 && (
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    className="glass"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                  >
                    View All Activity
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Activity className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-semibold mb-2">No expenses yet</h4>
              <p className="text-muted-foreground mb-4">
                Start adding expenses to see activity in this group.
              </p>
              <Button
                onClick={() => {
                  playClick();
                  setShowAddExpense(true);
                }}
                className="glass-strong hover-scale"
                onMouseEnter={() => playHover()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Expense
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        open={showAddExpense}
        onOpenChange={setShowAddExpense}
        onExpenseAdded={handleAddExpenseToGroup}
        expenseGroups={[group]} // Pass current group as single-item array
        preSelectedGroupId={group.id} // Pre-select this group
      />
    </div>
  );
};
