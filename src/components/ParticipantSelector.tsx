import { Button } from "@/components/ui/button";
import { Plus, X, Users } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface Participant {
  id: number;
  name: string;
  avatar: string;
  color: string;
}

interface ParticipantSelectorProps {
  participants: Participant[];
  onAddParticipant: () => void;
  onRemoveParticipant: (id: number) => void;
}

export const ParticipantSelector = ({ 
  participants, 
  onAddParticipant, 
  onRemoveParticipant 
}: ParticipantSelectorProps) => {
  const { playClick, playHover } = useSound();

  return (
    <div className="space-y-4">
      {/* Circular token ring */}
      <div className="flex flex-wrap gap-3">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="relative group animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${participant.color} flex items-center justify-center font-display text-foreground text-xl font-bold cursor-pointer hover-scale ring-2 ring-primary/30 hover:ring-primary transition-all`}
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              {participant.avatar}
            </div>
            
            {participant.id !== 1 && (
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  playClick();
                  onRemoveParticipant(participant.id);
                }}
                onMouseEnter={() => playHover()}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
            
            <p className="text-xs text-center mt-2 font-semibold">{participant.name}</p>
          </div>
        ))}

        {/* Add button */}
        <button
          onClick={() => {
            playClick();
            onAddParticipant();
          }}
          className="w-16 h-16 rounded-full glass-strong border-2 border-dashed border-primary/30 flex items-center justify-center hover-scale group transition-all hover:border-primary/60 text-foreground"
          onMouseEnter={() => playHover()}
        >
          <Plus className="w-6 h-6 text-primary group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Smart group suggestions */}
      <div className="glass p-3 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Quick Groups</span>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {["Roommates", "Office", "Travel Squad"].map((group) => (
            <Button
              key={group}
              variant="outline"
              size="sm"
              className="glass hover-scale text-xs"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              {group}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};