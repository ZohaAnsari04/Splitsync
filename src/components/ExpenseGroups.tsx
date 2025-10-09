import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Plus,
  Users,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  ArrowLeft,
  Group as GroupIcon,
  Target,
  TrendingUp,
  Eye
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GroupDetails } from "./GroupDetails";
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

interface ExpenseGroupsProps {
  groups: ExpenseGroup[];
  expenses: Expense[];
  onCreateGroup: (name: string, description: string, participants: string[], color: string) => void;
  onUpdateGroup: (groupId: string, updates: Partial<ExpenseGroup>) => void;
  onDeleteGroup: (groupId: string) => void;
  onBack: () => void;
  onExpenseAdded?: (name: string, amount: number, participants: string[], groupId?: string) => void;
}

const colorOptions = [
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-teal-500 to-blue-500",
  "from-indigo-500 to-purple-500",
  "from-yellow-500 to-orange-500",
  "from-pink-500 to-rose-500"
];

export const ExpenseGroups = ({
  groups,
  expenses,
  onCreateGroup,
  onUpdateGroup,
  onDeleteGroup,
  onBack,
  onExpenseAdded
}: ExpenseGroupsProps) => {
  const { playClick, playHover } = useSound();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupParticipants, setNewGroupParticipants] = useState<string[]>(["You"]);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [editingGroup, setEditingGroup] = useState<ExpenseGroup | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ExpenseGroup | null>(null);

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      onCreateGroup(
        newGroupName.trim(),
        newGroupDescription.trim(),
        newGroupParticipants,
        selectedColor
      );
      setNewGroupName("");
      setNewGroupDescription("");
      setNewGroupParticipants(["You"]);
      setSelectedColor(colorOptions[0]);
      setShowCreateDialog(false);
    }
  };

  const addParticipant = () => {
    setNewGroupParticipants([...newGroupParticipants, ""]);
  };

  const updateParticipant = (index: number, value: string) => {
    const updated = [...newGroupParticipants];
    updated[index] = value;
    setNewGroupParticipants(updated);
  };

  const removeParticipant = (index: number) => {
    if (newGroupParticipants.length > 1) {
      setNewGroupParticipants(newGroupParticipants.filter((_, i) => i !== index));
    }
  };

  const getGroupExpenses = (groupId: string) => {
    return expenses.filter(expense => expense.groupId === groupId);
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  // If a group is selected, show its details
  if (selectedGroup) {
    return (
      <GroupDetails
        group={selectedGroup}
        expenses={expenses}
        onBack={() => setSelectedGroup(null)}
        onExpenseAdded={onExpenseAdded}
      />
    );
  }

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
            <h1 className="text-2xl font-display gradient-text">Expense Groups</h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Create New Group Button */}
        <div className="mb-6">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button
                className="glass-strong hover-scale text-foreground"
                onClick={() => {
                  playClick();
                  setShowCreateDialog(true);
                }}
                onMouseEnter={() => playHover()}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Group
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-strong">
              <DialogHeader>
                <DialogTitle className="gradient-text">Create New Expense Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="groupName">Group Name</Label>
                  <Input
                    id="groupName"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="e.g., Roommates, Trip to Goa"
                    className="glass"
                  />
                </div>

                <div>
                  <Label htmlFor="groupDescription">Description (Optional)</Label>
                  <Textarea
                    id="groupDescription"
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                    placeholder="Brief description of this group"
                    className="glass"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Participants</Label>
                  <div className="space-y-2 mt-2">
                    {newGroupParticipants.map((participant, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={participant}
                          onChange={(e) => updateParticipant(index, e.target.value)}
                          placeholder={`Participant ${index + 1}`}
                          className="glass"
                        />
                        {newGroupParticipants.length > 1 && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeParticipant(index)}
                            className="glass"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addParticipant}
                      className="glass w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Participant
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} hover:scale-110 transition-transform ${
                          selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleCreateGroup}
                    className="flex-1 glass-strong hover-scale"
                  >
                    Create Group
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                    className="glass"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card
              key={group.id}
              className={`glass-strong p-6 hover-scale animate-scale-in border-2 border-primary/20 hover:border-primary/40`}
              style={{ animationDelay: `${groups.indexOf(group) * 0.1}s` }}
            >
              {/* Group Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center`}>
                    <GroupIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{group.name}</h3>
                    {group.description && (
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover-scale"
                    onClick={() => {
                      playClick();
                      setEditingGroup(group);
                    }}
                    onMouseEnter={() => playHover()}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover-scale text-destructive hover:text-destructive"
                    onClick={() => {
                      playClick();
                      if (confirm(`Are you sure you want to delete "${group.name}"?`)) {
                        onDeleteGroup(group.id);
                      }
                    }}
                    onMouseEnter={() => playHover()}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Group Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="glass p-3 rounded-lg text-center">
                  <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-2xl font-mono font-bold gradient-text">
                    {group.totalExpenses}
                  </div>
                  <div className="text-xs text-muted-foreground">Expenses</div>
                </div>
                <div className="glass p-3 rounded-lg text-center">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-secondary" />
                  <div className="text-2xl font-mono font-bold gradient-text">
                    {formatCurrency(group.totalAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </div>

              {/* Participants */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {group.participants.length} participants
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {group.participants.slice(0, 3).map((participant, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {participant}
                    </Badge>
                  ))}
                  {group.participants.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{group.participants.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Group Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 glass-strong hover-scale"
                  onClick={() => {
                    playClick();
                    setSelectedGroup(group);
                  }}
                  onMouseEnter={() => playHover()}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="glass"
                  onClick={() => {
                    playClick();
                    // Quick add expense to group (to be implemented)
                    alert(`Quick add expense to "${group.name}"`);
                  }}
                  onMouseEnter={() => playHover()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}

          {/* Empty State */}
          {groups.length === 0 && (
            <Card className="glass-strong p-8 text-center col-span-full">
              <GroupIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-display mb-2">No Expense Groups Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first expense group to start organizing your shared expenses
              </p>
              <Button
                onClick={() => {
                  playClick();
                  setShowCreateDialog(true);
                }}
                className="glass-strong hover-scale"
                onMouseEnter={() => playHover()}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Group
              </Button>
            </Card>
          )}
        </div>

        {/* Edit Group Dialog */}
        {editingGroup && (
          <Dialog open={!!editingGroup} onOpenChange={() => setEditingGroup(null)}>
            <DialogContent className="glass-strong">
              <DialogHeader>
                <DialogTitle className="gradient-text">Edit Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editGroupName">Group Name</Label>
                  <Input
                    id="editGroupName"
                    value={editingGroup.name}
                    onChange={(e) => setEditingGroup({...editingGroup, name: e.target.value})}
                    className="glass"
                  />
                </div>
                <div>
                  <Label htmlFor="editGroupDescription">Description</Label>
                  <Textarea
                    id="editGroupDescription"
                    value={editingGroup.description || ""}
                    onChange={(e) => setEditingGroup({...editingGroup, description: e.target.value})}
                    className="glass"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      onUpdateGroup(editingGroup.id, {
                        name: editingGroup.name,
                        description: editingGroup.description
                      });
                      setEditingGroup(null);
                    }}
                    className="flex-1 glass-strong hover-scale"
                  >
                    Update Group
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingGroup(null)}
                    className="glass"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
