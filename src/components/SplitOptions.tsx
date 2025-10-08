import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Equal, PieChart, Sliders, Zap, Clock, Scale, Calendar, Globe } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface Participant {
  id: number;
  name: string;
  avatar: string;
  color: string;
}

interface SplitOptionsProps {
  totalAmount: number;
  participants: Participant[];
}

interface TimeSplit {
  participant: string;
  hours: number;
}

interface WeightSplit {
  participant: string;
  weight: number;
}

export const SplitOptions = ({ totalAmount, participants }: SplitOptionsProps) => {
  const [splitMode, setSplitMode] = useState<"equal" | "percentage" | "custom" | "advanced">("equal");
  const [percentages, setPercentages] = useState<number[]>([]);
  
  // Time-based splitting state
  const [timeSplits, setTimeSplits] = useState<TimeSplit[]>([]);
  
  // Weighted splitting state
  const [weightSplits, setWeightSplits] = useState<WeightSplit[]>([]);
  const { playClick, playHover } = useSound();

  // Initialize states when participants change
  useEffect(() => {
    // Initialize percentages (equal distribution)
    const equalPercentage = 100 / participants.length;
    setPercentages(Array(participants.length).fill(equalPercentage));
    
    // Initialize time splits
    setTimeSplits(participants.map(p => ({ participant: p.name, hours: 1 })));
    
    // Initialize weight splits
    setWeightSplits(participants.map(p => ({ participant: p.name, weight: 10000 })));
  }, [participants]);

  // Calculate time-based split
  const calculateTimeSplit = () => {
    const totalHours = timeSplits.reduce((sum, split) => sum + split.hours, 0);
    return timeSplits.map(split => ({
      ...split,
      amount: totalAmount * (split.hours / totalHours)
    }));
  };

  // Calculate weighted split
  const calculateWeightSplit = () => {
    const totalWeight = weightSplits.reduce((sum, split) => sum + split.weight, 0);
    return weightSplits.map(split => ({
      ...split,
      amount: totalAmount * (split.weight / totalWeight)
    }));
  };

  // Update time split hours
  const updateTimeSplit = (index: number, hours: number) => {
    playClick();
    const newSplits = [...timeSplits];
    newSplits[index] = { ...newSplits[index], hours };
    setTimeSplits(newSplits);
  };

  // Update weight split
  const updateWeightSplit = (index: number, weight: number) => {
    playClick();
    const newSplits = [...weightSplits];
    newSplits[index] = { ...newSplits[index], weight };
    setWeightSplits(newSplits);
  };

  return (
    <Tabs value={splitMode} onValueChange={(v) => {
      playClick();
      setSplitMode(v as typeof splitMode);
    }}>
      <TabsList className="grid w-full grid-cols-4 glass">
        <TabsTrigger value="equal" className="text-xs" onMouseEnter={() => playHover()}>
          <Equal className="w-3 h-3 mr-1" />
          Equal
        </TabsTrigger>
        <TabsTrigger value="percentage" className="text-xs" onMouseEnter={() => playHover()}>
          <PieChart className="w-3 h-3 mr-1" />
          %
        </TabsTrigger>
        <TabsTrigger value="custom" className="text-xs" onMouseEnter={() => playHover()}>
          <Sliders className="w-3 h-3 mr-1" />
          Custom
        </TabsTrigger>
        <TabsTrigger value="advanced" className="text-xs" onMouseEnter={() => playHover()}>
          <Zap className="w-3 h-3 mr-1" />
          Smart
        </TabsTrigger>
      </TabsList>

      <TabsContent value="equal" className="space-y-3 animate-slide-up">
        <div className="glass p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Per Person</span>
            <span className="text-2xl font-mono font-bold gradient-text">
              ₹{(totalAmount / participants.length).toFixed(2)}
            </span>
          </div>
          
          <div className="space-y-2">
            {participants.map((participant, i) => (
              <div key={participant.id} className="flex items-center gap-3 p-2 glass rounded animate-scale-in" 
                   style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${participant.color} flex items-center justify-center font-display text-foreground`}>
                  {participant.avatar}
                </div>
                <span className="flex-1">{participant.name}</span>
                <span className="font-mono text-primary">₹{(totalAmount / participants.length).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="percentage" className="animate-slide-up">
        <div className="glass p-4 rounded-lg space-y-4">
          {/* Interactive pie chart visualization placeholder */}
          <div className="aspect-square max-w-xs mx-auto glass-strong rounded-full flex items-center justify-center relative overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{
                background: `conic-gradient(
                  hsl(var(--neon-purple)) 0% ${percentages[0] || 0}%,
                  hsl(var(--neon-cyan)) ${percentages[0] || 0}% 100%
                )`
              }}
            />
            <div className="relative z-10 text-center bg-background/80 rounded-full w-32 h-32 flex items-center justify-center">
              <div>
                <div className="text-sm text-muted-foreground">Total</div>
                <div className="text-2xl font-mono font-bold gradient-text">₹{totalAmount}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {participants.map((participant, i) => (
              <div key={participant.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{participant.name}</span>
                  <span className="font-mono text-primary">{percentages[i] ? percentages[i].toFixed(0) : 0}%</span>
                </div>
                <Slider
                  value={[percentages[i] || 0]}
                  onValueChange={(value) => {
                    playClick();
                    const newPercentages = [...percentages];
                    newPercentages[i] = value[0];
                    setPercentages(newPercentages);
                  }}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="custom" className="animate-slide-up">
        <div className="glass p-4 rounded-lg space-y-3">
          {participants.map((participant, i) => (
            <div key={participant.id} className="flex items-center gap-3 p-3 glass-strong rounded">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${participant.color} flex items-center justify-center font-display text-foreground`}>
                {participant.avatar}
              </div>
              <span className="flex-1">{participant.name}</span>
              <input
                type="number"
                placeholder="₹ 0"
                className="w-24 px-3 py-2 glass rounded border border-primary/30 font-mono text-right focus:border-primary/60 outline-none transition-all"
                onChange={() => playClick()}
              />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="advanced" className="animate-slide-up">
        <div className="space-y-6">
          {/* Time-Based Splitting */}
          <div className="glass p-4 rounded-lg border border-accent/30">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-accent animate-pulse" />
              <span className="font-semibold">Time-Based Split</span>
            </div>
            
            <div className="space-y-3">
              {timeSplits.map((split, index) => {
                const participant = participants.find(p => p.name === split.participant);
                return (
                  <div key={index} className="flex items-center gap-3 p-2 glass rounded">
                    {participant && (
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${participant.color} flex items-center justify-center font-display text-foreground`}>
                        {participant.avatar}
                      </div>
                    )}
                    <span className="flex-1">{split.participant}</span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={split.hours}
                        onChange={(e) => {
                          playClick();
                          updateTimeSplit(index, Number(e.target.value));
                        }}
                        className="w-20 px-2 py-1 glass text-center border-accent/30 focus:border-accent/60"
                        min="0"
                      />
                      <span className="text-sm">hours</span>
                    </div>
                    <span className="font-mono text-accent">
                      ₹{calculateTimeSplit()[index].amount.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-3 pt-3 border-t border-accent/20">
              <div className="flex justify-between text-sm">
                <span>Total Hours:</span>
                <span className="font-mono">{timeSplits.reduce((sum, split) => sum + split.hours, 0)}</span>
              </div>
            </div>
          </div>

          {/* Weighted Splitting */}
          <div className="glass p-4 rounded-lg border border-secondary/30">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-secondary animate-pulse" />
              <span className="font-semibold">Weighted Split</span>
            </div>
            
            <div className="space-y-3">
              {weightSplits.map((split, index) => {
                const participant = participants.find(p => p.name === split.participant);
                return (
                  <div key={index} className="flex items-center gap-3 p-2 glass rounded">
                    {participant && (
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${participant.color} flex items-center justify-center font-display text-foreground`}>
                        {participant.avatar}
                      </div>
                    )}
                    <span className="flex-1">{split.participant}</span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={split.weight}
                        onChange={(e) => {
                          playClick();
                          updateWeightSplit(index, Number(e.target.value));
                        }}
                        className="w-24 px-2 py-1 glass text-center border-secondary/30 focus:border-secondary/60"
                        min="0"
                      />
                      <span className="text-sm">weight</span>
                    </div>
                    <span className="font-mono text-secondary">
                      ₹{calculateWeightSplit()[index].amount.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-3 pt-3 border-t border-secondary/20">
              <div className="flex justify-between text-sm">
                <span>Total Weight:</span>
                <span className="font-mono">{weightSplits.reduce((sum, split) => sum + split.weight, 0)}</span>
              </div>
            </div>
          </div>

          {/* Recurring Expense Templates */}
          <div className="glass p-4 rounded-lg border border-primary/30">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-semibold">Recurring Templates</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Create templates for regular expenses like rent, subscriptions, etc.
            </p>
            <Button className="w-full glass-strong hover-scale" onClick={() => playClick()} onMouseEnter={() => playHover()}>
              Create Recurring Template
            </Button>
          </div>

          {/* Currency Conversion */}
          <div className="glass p-4 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-purple-500 animate-pulse" />
              <span className="font-semibold">Currency Conversion</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Split expenses across different currencies for international groups
            </p>
            <div className="flex gap-2">
              <select className="flex-1 glass p-2 rounded border border-purple-500/30 focus:border-purple-500/60 outline-none" onChange={() => playClick()}>
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
              <Button className="glass-strong hover-scale" onClick={() => playClick()} onMouseEnter={() => playHover()}>
                Convert
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};