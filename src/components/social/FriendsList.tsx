import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserPlus, MessageCircle, Phone, Video } from "lucide-react";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastSeen?: string;
}

export const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Alice Johnson", avatar: "/avatars/alice.jpg", status: "online" },
    { id: "2", name: "Bob Smith", avatar: "/avatars/bob.jpg", status: "away", lastSeen: "2 hours ago" },
    { id: "3", name: "Charlie Brown", avatar: "/avatars/charlie.jpg", status: "offline", lastSeen: "5 hours ago" },
    { id: "4", name: "Diana Prince", avatar: "/avatars/diana.jpg", status: "online" },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display gradient-text">Friends</h2>
        <Button size="sm" className="glass-strong hover-scale text-foreground">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Friend
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 glass border-primary/30 focus:border-primary/60"
        />
      </div>
      
      <div className="space-y-2">
        {filteredFriends.map((friend) => (
          <Card key={friend.id} className="glass p-4 hover-scale transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(friend.status)}`} />
                </div>
                <div>
                  <p className="font-semibold">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {friend.status === "online" ? "Online" : 
                     friend.status === "away" ? `Away - ${friend.lastSeen}` : 
                     `Offline - ${friend.lastSeen}`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="hover-scale">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="hover-scale">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="hover-scale">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};