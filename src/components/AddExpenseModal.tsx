import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Keyboard, Sparkles, Users, Plus, X, Mic, MicOff, Volume2, FolderOpen } from "lucide-react";
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

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExpenseAdded?: (name: string, amount: number, participants: string[], groupId?: string) => void;
  expenseGroups?: ExpenseGroup[];
  preSelectedGroupId?: string;
}

export const AddExpenseModal = ({ open, onOpenChange, onExpenseAdded, expenseGroups = [], preSelectedGroupId }: AddExpenseModalProps) => {
  const [inputMode, setInputMode] = useState<"manual" | "voice">("manual");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<string>("none");

  // Set selected group and load participants when modal opens or preSelectedGroupId changes
  useEffect(() => {
    if (open) {
      // Modal is opening
      if (preSelectedGroupId && preSelectedGroupId !== "none") {
        setSelectedGroupId(preSelectedGroupId);

        // Find the selected group and load its participants
        const selectedGroup = expenseGroups.find(group => group.id === preSelectedGroupId);
        if (selectedGroup) {
          // Convert group participants to the format expected by the modal
          const groupParticipants: Participant[] = selectedGroup.participants.map((name, index) => ({
            id: index + 1,
            name,
            avatar: name.charAt(0).toUpperCase(),
            color: colors[index % colors.length] // Use the same color rotation
          }));
          setParticipants(groupParticipants);
        }
      } else {
        setSelectedGroupId("none");
        // Reset to default participants when no group is selected
        setParticipants([
          { id: 1, name: "You", avatar: "Y", color: "from-purple-500 to-pink-500" },
          { id: 2, name: "Alice", avatar: "A", color: "from-cyan-500 to-blue-500" },
          { id: 3, name: "Bob", avatar: "B", color: "from-green-500 to-teal-500" },
        ]);
      }
    } else {
      // Modal is closing - reset state for next time
      setSelectedGroupId("none");
    }
  }, [preSelectedGroupId, open, expenseGroups]);

  // Initialize participants state - will be overridden by useEffect if group is pre-selected
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "You", avatar: "Y", color: "from-purple-500 to-pink-500" },
    { id: 2, name: "Alice", avatar: "A", color: "from-cyan-500 to-blue-500" },
    { id: 3, name: "Bob", avatar: "B", color: "from-green-500 to-teal-500" },
  ]);
  const [showAddParticipantForm, setShowAddParticipantForm] = useState(false);
  const [newParticipantName, setNewParticipantName] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { playClick, playHover, playNotification } = useSound();

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

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US'; // Changed to US English for better compatibility
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');
          setTranscript(transcript);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          toast.error("Speech recognition error: " + event.error);
        };
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Process voice command when transcript changes
  useEffect(() => {
    if (transcript && !isListening) {
      processVoiceCommand(transcript);
    }
  }, [transcript, isListening]);

  // Parse voice command and extract expense details
  const processVoiceCommand = (command: string) => {
    setIsProcessing(true);
    
    try {
      // Example command: "Add ₹200 chai bill by Raj"
      // Extract amount (₹ followed by number)
      const amountMatch = command.match(/(?:₹|rs|rupees?)\s*(\d+)/i);
      const extractedAmount = amountMatch ? amountMatch[1] : "";
      
      // Extract title (words between "Add" and "by" or at the end)
      let extractedTitle = "";
      const titleMatch = command.match(/add.*?(?:₹\d+|rs\d+|rupees?\s*\d+)\s*(.*?)(?:\s+by|$)/i);
      if (titleMatch && titleMatch[1]) {
        extractedTitle = titleMatch[1].trim();
      } else {
        // Fallback: get words after amount
        const afterAmountMatch = command.match(/(?:₹|rs|rupees?)\s*\d+\s*(.*)/i);
        if (afterAmountMatch && afterAmountMatch[1]) {
          extractedTitle = afterAmountMatch[1].replace(/by.*$/i, '').trim();
        }
      }
      
      // Extract participant name (after "by")
      const participantMatch = command.match(/by\s+(.+)/i);
      const participantName = participantMatch ? participantMatch[1].trim() : "";
      
      // Update state with extracted values
      if (extractedAmount) setAmount(extractedAmount);
      if (extractedTitle) setTitle(extractedTitle);
      
      // Add participant if mentioned
      let updatedParticipants = [...participants];
      if (participantName) {
        // Check if participant already exists
        const existingParticipant = updatedParticipants.find(p => 
          p.name.toLowerCase() === participantName.toLowerCase()
        );
        
        if (!existingParticipant) {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          updatedParticipants = [
            ...updatedParticipants,
            {
              id: updatedParticipants.length + 1,
              name: participantName,
              avatar: participantName.charAt(0).toUpperCase(),
              color: randomColor,
            },
          ];
          setParticipants(updatedParticipants);
        }
      }
      
      playNotification(); // Play notification sound when processing is complete
      
      // Show success message with split information
      if (extractedTitle && extractedAmount) {
        const amountValue = parseFloat(extractedAmount);
        const participantCount = participantName ? Math.max(participants.length, 2) : participants.length;
        toast.success(
          `Voice command processed! Press Enter to add this expense.`,
          {
            description: `₹${amountValue.toLocaleString()} will be split among ${participantCount} participant(s).`
          }
        );
      } else {
        toast.success("Voice command processed!");
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
      toast.error("Failed to process voice command. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      try {
        recognitionRef.current.start();
        setIsListening(true);
        playClick();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast.error("Failed to start voice recognition. Please check your browser settings.");
      }
    } else {
      toast.error("Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
        playClick();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  };

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
    
    // Validate amount is a valid number
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount greater than zero.");
      return;
    }
    
    // Validate we have participants
    if (participants.length === 0) {
      toast.error("Please add at least one participant.");
      return;
    }
    
    // Validate and prepare expense data
    if (!title) {
      toast.error("Please enter an expense title.");
      return;
    }

    // Call the onExpenseAdded callback if provided
    if (onExpenseAdded) {
      try {
        // Pass the title, amount, participants array, and selected group (if any)
        // Treat "none" as no group selected
        const groupId = selectedGroupId === "none" ? undefined : selectedGroupId;
        const participantNames = participants.map(p => p.name);
        onExpenseAdded(title, amountValue, participantNames, groupId);

        // Show success message and close modal
        toast.success(`Expense added successfully! Amount: ₹${amountValue.toLocaleString()} split among ${participants.length} participant(s). 💫`);

      } catch (error) {
        console.error('Error adding expense:', error);
        toast.error("Failed to add expense. Please try again.");
        // Don't close modal on error so user can retry
        return;
      }
    }

    // Close modal (this will trigger the onOpenChange callback)
    onOpenChange(false);
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
          <TabsList className="grid w-full grid-cols-2 glass mb-6">
            <TabsTrigger value="manual" className="font-display">
              <Keyboard className="w-4 h-4 mr-2" />
              Manual
            </TabsTrigger>
            <TabsTrigger value="voice" className="font-display">
              <Mic className="w-4 h-4 mr-2" />
              Voice
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

          <TabsContent value="voice" className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <div className="text-center p-6 glass rounded-lg border border-primary/20">
                <Volume2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Voice Input</h3>
                <p className="text-muted-foreground mb-4">
                  Say something like: "Add ₹200 chai bill by Raj"
                </p>
                
                <div className="flex justify-center mb-4">
                  <Button
                    size="lg"
                    className={`rounded-full w-24 h-24 ${isListening ? 'glass-strong animate-pulse' : 'glass'}`}
                    onClick={isListening ? stopListening : startListening}
                  >
                    {isListening ? (
                      <MicOff className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </Button>
                </div>
                
                {transcript && (
                  <div className="glass p-4 rounded-lg mt-4">
                    <p className="text-sm text-muted-foreground mb-2">You said:</p>
                    <p className="font-medium">{transcript}</p>
                    {title && amount && !isProcessing && (
                      <p className="text-sm text-muted-foreground mt-2">Click the Enter button below to add this expense</p>
                    )}
                  </div>
                )}
                
                {isProcessing && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
                
                {/* Physical Enter button that appears after voice command processing */}
                {inputMode === "voice" && title && amount && !isProcessing && (
                  <div className="mt-4">
                    <Button
                      onClick={handleAddExpense}
                      className="glass-strong glow-purple hover-scale px-6 py-2"
                      onMouseEnter={() => playHover()}
                    >
                      <span className="flex items-center gap-2">
                        Enter <span className="bg-background px-2 py-1 rounded border text-xs">↵</span>
                      </span>
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="glass p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Examples:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• "Add ₹200 chai bill by Raj"</li>
                  <li>• "Add Rs 500 dinner expense by Alice"</li>
                  <li>• "Add rupees 1000 shopping by Bob"</li>
                </ul>
              </div>
              
              <div className="glass p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Browser Support:</h4>
                <p className="text-sm text-muted-foreground">
                  Voice input works best in Chrome, Edge, and Safari browsers.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Show expense details if any input exists */}
        {(title || amount || inputMode === "voice") && (
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

            {/* Expense Group Selection */}
            <div className="glass p-4 rounded-lg border border-accent/30">
              <h3 className="font-display mb-3 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-accent" />
                Expense Group (Optional)
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Organize this expense into a group for better tracking and management
              </p>
              <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
                <SelectTrigger className="glass border-primary/30 focus:border-primary/60">
                  <SelectValue placeholder="Select a group (optional)" />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="none">No group (individual expense)</SelectItem>
                  {expenseGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${group.color}`} />
                        {group.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                disabled={!title || !amount}
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