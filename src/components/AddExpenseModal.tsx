import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Keyboard, Sparkles, Users, Plus, X } from "lucide-react";
import { SplitOptions } from "./SplitOptions";
import { ParticipantSelector } from "./ParticipantSelector";
import { toast } from "sonner";
import { useSound } from "@/hooks/useSound";

interface Participant {
  id: number;
  name: string;
  avatar: string;
  color: string;
}

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExpenseAdded?: (name: string, amount: number, split: number) => void;
}

export const AddExpenseModal = ({ open, onOpenChange, onExpenseAdded }: AddExpenseModalProps) => {
  const [inputMode, setInputMode] = useState<"manual">("manual");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "You", avatar: "Y", color: "from-purple-500 to-pink-500" },
    { id: 2, name: "Alice", avatar: "A", color: "from-cyan-500 to-blue-500" },
    { id: 3, name: "Bob", avatar: "B", color: "from-green-500 to-teal-500" },
  ]);
  const [showAddParticipantForm, setShowAddParticipantForm] = useState(false);
  const [newParticipantName, setNewParticipantName] = useState("");
  const { playClick, playHover } = useSound();

  const colors = [
    "from-yellow-500 to-orange-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-purple-500",
    "from-teal-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-blue-500 to-sky-500",
    "from-purple-500 to-fuchsia-500",
    "from-pink-500 to-rose-500",
    "from-amber-500 to-yellow-500",
    "from-lime-500 to-green-500"
  ];

  const addParticipant = () => {
    playClick();
    
    // If form is not shown, show it
    if (!showAddParticipantForm) {
      setShowAddParticipantForm(true);
      return;
    }
    
    // If form is shown and we have a name, add the participant
    if (newParticipantName.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setParticipants([
        ...participants,
        {
          id: participants.length + 1,
          name: newParticipantName.trim(),
          avatar: newParticipantName.trim().charAt(0).toUpperCase(),
          color: randomColor,
        },
      ]);
      
      // Reset form
      setNewParticipantName("");
      setShowAddParticipantForm(false);
    }
  };

  const removeParticipant = (id: number) => {
    playClick();
    if (participants.length > 1) {
      setParticipants(participants.filter((p) => p.id !== id));
    }
  };

  const cancelAddParticipant = () => {
    playClick();
    setShowAddParticipantForm(false);
    setNewParticipantName("");
  };

  const handleAddExpense = () => {
    // Sound trigger: "cha-ching"
    playClick();
    
    // Call the onExpenseAdded callback if provided
    if (onExpenseAdded && title && amount) {
      onExpenseAdded(title, parseFloat(amount), participants.length);
    }
    
    toast.success("Expense added successfully! 💫");
    onOpenChange(false);
    
    // Reset form
    setTitle("");
    setAmount("");
    setCategory("");
    setShowAddParticipantForm(false);
    setNewParticipantName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display gradient-text flex items-center gap-2">
            <Sparkles className="w-6 h-6 animate-pulse" />
            Add New Expense
          </DialogTitle>
        </DialogHeader>

        <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as typeof inputMode)} className="w-full">
          <TabsList className="grid w-full grid-cols-1 glass mb-6">
            <TabsTrigger value="manual" className="font-display">
              <Keyboard className="w-4 h-4 mr-2" />
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Expense Title</label>
                <Input
                  placeholder="e.g., Dinner, Movie tickets..."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    playClick(); // Play sound on typing
                  }}
                  className="glass border-primary/30 focus:border-primary/60 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Amount</label>
                <Input
                  type="number"
                  placeholder="₹ 0.00"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    playClick(); // Play sound on typing
                  }}
                  className="glass border-primary/30 focus:border-primary/60 transition-all font-mono text-2xl"
                />
              </div>

              <div className="glass p-4 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-semibold">AI Suggested Category</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["Food", "Transport", "Entertainment", "Shopping"].map((cat) => (
                    <Button
                      key={cat}
                      variant={category === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setCategory(cat);
                        playClick(); // Play sound on category selection
                      }}
                      className="hover-scale"
                      onMouseEnter={() => playHover()}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Show expense details if any input exists */}
        {(title || amount) && (
          <div className="space-y-6 animate-slide-up">
            <div className="glass p-4 rounded-lg border border-accent/30">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-accent" />
                <h3 className="font-display">Select Participants</h3>
              </div>
              
              {/* Custom participant form */}
              {showAddParticipantForm && (
                <div className="mb-4 p-3 glass rounded-lg border border-primary/20 animate-slide-up">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold">Add New Participant</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter participant name"
                      value={newParticipantName}
                      onChange={(e) => setNewParticipantName(e.target.value)}
                      className="flex-1 glass border-primary/30 focus:border-primary/60"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addParticipant();
                        }
                      }}
                    />
                    <Button
                      onClick={addParticipant}
                      className="glass-strong"
                      disabled={!newParticipantName.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={cancelAddParticipant}
                      className="glass"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <ParticipantSelector 
                participants={participants} 
                onAddParticipant={addParticipant} 
                onRemoveParticipant={removeParticipant} 
              />
            </div>

            <div className="glass p-4 rounded-lg border border-secondary/30">
              <h3 className="font-display mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Split Method
              </h3>
              <SplitOptions totalAmount={parseFloat(amount) || 0} participants={participants} />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  playClick();
                  onOpenChange(false);
                }}
                className="flex-1 glass"
                onMouseEnter={() => playHover()}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddExpense}
                className="flex-1 glass-strong glow-purple hover-scale text-foreground"
                onMouseEnter={() => playHover()}
              >
                Add Expense
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};