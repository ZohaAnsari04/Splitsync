import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Users,
  Filter,
  Check,
  X,
  Eye
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/logo.png";
import { useSound } from "@/hooks/useSound";

interface PaymentReminder {
  id: string;
  debtorName: string;
  creditorName: string;
  amount: number;
  dueDate: Date;
  expenseId?: string;
  groupId?: string;
  status: "pending" | "overdue" | "completed";
}

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

interface PaymentRemindersProps {
  paymentReminders: PaymentReminder[];
  expenses: Expense[];
  groups: ExpenseGroup[];
  onBack: () => void;
  onMarkAsPaid?: (reminderId: string) => void;
  onDeleteReminder?: (reminderId: string) => void;
}

export const PaymentReminders = ({
  paymentReminders,
  expenses,
  groups,
  onBack,
  onMarkAsPaid,
  onDeleteReminder
}: PaymentRemindersProps) => {
  const { playClick, playHover } = useSound();
  const [activeTab, setActiveTab] = useState<"all" | "groups">("all");
  const [selectedGroupId, setSelectedGroupId] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "overdue" | "completed">("all");

  // Calculate dynamic payment reminders based on expenses
  const dynamicReminders = useMemo(() => {
    const reminders: PaymentReminder[] = [];

    expenses.forEach(expense => {
      if (!expense.groupId) return; // Skip expenses not in groups

      const group = groups.find(g => g.id === expense.groupId);
      if (!group) return;

      // Calculate settlements for this expense
      const amountPerPerson = expense.amount / expense.participants.length;
      const payer = expense.participants[0]; // Assume first participant paid

      expense.participants.forEach(participant => {
        if (participant !== payer) {
          // Check if this reminder already exists
          const existingReminder = paymentReminders.find(r =>
            r.debtorName === participant &&
            r.creditorName === payer &&
            r.expenseId === expense.id
          );

          if (!existingReminder) {
            // Calculate due date (7 days from expense date)
            const dueDate = new Date(expense.date);
            dueDate.setDate(dueDate.getDate() + 7);

            // Determine status
            const now = new Date();
            let status: "pending" | "overdue" | "completed" = "pending";
            if (dueDate < now) {
              status = "overdue";
            }

            reminders.push({
              id: `${expense.id}-${participant}-${payer}`,
              debtorName: participant,
              creditorName: payer,
              amount: amountPerPerson,
              dueDate,
              expenseId: expense.id,
              groupId: expense.groupId,
              status
            });
          }
        }
      });
    });

    return reminders;
  }, [expenses, groups, paymentReminders]);

  // Combine dynamic and existing reminders
  const allReminders = useMemo(() => {
    const combined = [...paymentReminders, ...dynamicReminders];

    // Remove duplicates
    const unique = combined.filter((reminder, index, self) =>
      index === self.findIndex(r =>
        r.debtorName === reminder.debtorName &&
        r.creditorName === reminder.creditorName &&
        r.amount === reminder.amount &&
        r.expenseId === reminder.expenseId
      )
    );

    return unique;
  }, [paymentReminders, dynamicReminders]);

  // Filter reminders based on active filters
  const filteredReminders = useMemo(() => {
    let filtered = allReminders;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(reminder => reminder.status === statusFilter);
    }

    // Filter by group (only when viewing groups tab)
    if (activeTab === "groups" && selectedGroupId !== "all") {
      filtered = filtered.filter(reminder => reminder.groupId === selectedGroupId);
    }

    // Sort by due date (soonest first)
    return filtered.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }, [allReminders, statusFilter, activeTab, selectedGroupId]);

  // Group reminders by group for the groups tab
  const remindersByGroup = useMemo(() => {
    const grouped: Record<string, PaymentReminder[]> = {};

    filteredReminders.forEach(reminder => {
      const groupId = reminder.groupId || "ungrouped";
      if (!grouped[groupId]) {
        grouped[groupId] = [];
      }
      grouped[groupId].push(reminder);
    });

    return grouped;
  }, [filteredReminders]);

  // Get group name by ID
  const getGroupName = (groupId?: string) => {
    if (!groupId) return "Ungrouped";
    const group = groups.find(g => g.id === groupId);
    return group?.name || "Unknown Group";
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-500";
      case "overdue":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-blue-500/20 text-blue-500";
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
            <h1 className="text-2xl font-display gradient-text">Payment Reminders</h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-strong p-6 hover-scale animate-slide-up border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-display text-lg">Pending</h3>
                <p className="text-sm text-muted-foreground">Due soon</p>
              </div>
            </div>
            <p className="text-3xl font-bold gradient-text">
              {allReminders.filter(r => r.status === "pending").length}
            </p>
          </Card>

          <Card className="glass-strong p-6 hover-scale animate-slide-up border-red-500/20" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="font-display text-lg">Overdue</h3>
                <p className="text-sm text-muted-foreground">Past due</p>
              </div>
            </div>
            <p className="text-3xl font-bold gradient-text">
              {allReminders.filter(r => r.status === "overdue").length}
            </p>
          </Card>

          <Card className="glass-strong p-6 hover-scale animate-slide-up border-green-500/20" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-display text-lg">Total Due</h3>
                <p className="text-sm text-muted-foreground">All reminders</p>
              </div>
            </div>
            <p className="text-3xl font-bold gradient-text">
              {formatCurrency(allReminders.reduce((sum, r) => sum + r.amount, 0))}
            </p>
          </Card>
        </div>

        {/* Filters and Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-2 glass mb-4">
              <TabsTrigger value="all" className="font-display">All Reminders</TabsTrigger>
              <TabsTrigger value="groups" className="font-display">By Group</TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                  <SelectTrigger className="w-48 glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-strong">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {activeTab === "groups" && (
                <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
                  <SelectTrigger className="w-48 glass">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent className="glass-strong">
                    <SelectItem value="all">All Groups</SelectItem>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${group.color}`} />
                          {group.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </Tabs>
        </div>

        {/* Reminders List */}
        <div className="space-y-4">
          {activeTab === "all" ? (
            // All reminders view
            filteredReminders.length > 0 ? (
              filteredReminders.map((reminder) => (
                <Card
                  key={reminder.id}
                  className="glass-strong p-4 hover-scale animate-slide-up"
                  style={{ animationDelay: `${filteredReminders.indexOf(reminder) * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(reminder.status)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{reminder.debtorName}</span>
                          <span className="text-muted-foreground">owes</span>
                          <span className="font-semibold">{reminder.creditorName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Due: {reminder.dueDate.toLocaleDateString()}</span>
                          {reminder.groupId && (
                            <>
                              <span>•</span>
                              <span>Group: {getGroupName(reminder.groupId)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold gradient-text">{formatCurrency(reminder.amount)}</p>
                        <Badge className={getStatusColor(reminder.status)}>
                          {reminder.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {reminder.status !== "completed" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              playClick();
                              onMarkAsPaid?.(reminder.id);
                            }}
                            className="glass-strong hover-scale"
                            onMouseEnter={() => playHover()}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            <span className="text-foreground">Mark Paid</span>
                          </Button>

                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            playClick();
                            onDeleteReminder?.(reminder.id);
                          }}
                          className="glass"
                          onMouseEnter={() => playHover()}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="glass-strong p-8 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-display mb-2 text-foreground">No payment reminders</h3>
                <p className="text-foreground/80">All caught up! No pending payments.</p>
              </Card>
            )
          ) : (
            // Groups view
            Object.keys(remindersByGroup).length > 0 ? (
              Object.entries(remindersByGroup).map(([groupId, groupReminders]) => {
                const group = groups.find(g => g.id === groupId);
                return (
                  <Card key={groupId} className="glass-strong p-6 animate-slide-up">
                    <div className="flex items-center gap-3 mb-4">
                      {group ? (
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{group.name.charAt(0)}</span>
                        </div>
                      ) : (
                        <Users className="w-8 h-8 text-muted-foreground" />
                      )}
                      <div>
                        <h3 className="font-display text-lg">{getGroupName(groupId)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {groupReminders.length} reminder{groupReminders.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {groupReminders.map((reminder) => (
                        <div
                          key={reminder.id}
                          className="glass p-3 rounded-lg hover-scale cursor-pointer border border-primary/20"
                          onClick={() => playClick()}
                          onMouseEnter={() => playHover()}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(reminder.status)}
                              <span className="font-semibold">{reminder.debtorName}</span>
                              <span className="text-muted-foreground">→</span>
                              <span className="font-semibold">{reminder.creditorName}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="font-bold gradient-text">{formatCurrency(reminder.amount)}</p>
                                <p className="text-xs text-muted-foreground">
                                  Due: {reminder.dueDate.toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                {reminder.status !== "completed" && (
                                  <Button
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playClick();
                                      onMarkAsPaid?.(reminder.id);
                                    }}
                                    className="glass-strong hover-scale"
                                    onMouseEnter={() => playHover()}
                                  >
                                    <Check className="w-3 h-3" />
                                    <span className="sr-only text-foreground">Mark Paid</span>
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playClick();
                                    onDeleteReminder?.(reminder.id);
                                  }}
                                  className="glass"
                                  onMouseEnter={() => playHover()}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="glass-strong p-8 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-foreground/50" />
                <h3 className="text-xl font-display mb-2">No payment reminders by group</h3>
                <p className="text-foreground/80">No group-specific payment reminders found.</p>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};
