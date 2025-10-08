import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tag, Plus, X } from "lucide-react";

interface TagType {
  id: string;
  name: string;
  color: string;
}

export const ExpenseTags = ({ expenseId }: { expenseId: string }) => {
  const [tags, setTags] = useState<TagType[]>([
    { id: "1", name: "Business", color: "bg-blue-500" },
    { id: "2", name: "Vacation", color: "bg-green-500" },
    { id: "3", name: "Household", color: "bg-purple-500" }
  ]);
  
  const [newTag, setNewTag] = useState("");
  const [availableColors] = useState([
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500"
  ]);

  const handleAddTag = () => {
    if (newTag.trim() === "") return;
    
    // Select a random color that's not already used
    const usedColors = tags.map(tag => tag.color);
    const availableColorsFiltered = availableColors.filter(color => !usedColors.includes(color));
    const randomColor = availableColorsFiltered.length > 0 
      ? availableColorsFiltered[Math.floor(Math.random() * availableColorsFiltered.length)]
      : availableColors[Math.floor(Math.random() * availableColors.length)];
    
    const tag: TagType = {
      id: (tags.length + 1).toString(),
      name: newTag.trim(),
      color: randomColor
    };
    
    setTags([...tags, tag]);
    setNewTag("");
  };

  const handleRemoveTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display gradient-text flex items-center gap-2">
        <Tag className="w-5 h-5" />
        Tags
      </h3>
      
      <Card className="glass p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge 
              key={tag.id} 
              className={`${tag.color} text-foreground hover:scale-105 transition-transform`}
            >
              {tag.name}
              <button 
                onClick={() => handleRemoveTag(tag.id)}
                className="ml-2 hover:bg-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add a tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            className="glass flex-1 border-primary/30 focus:border-primary/60"
          />
          <Button 
            onClick={handleAddTag}
            disabled={!newTag.trim()}
            className="glass-strong hover-scale"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};