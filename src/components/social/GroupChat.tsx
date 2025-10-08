import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Smile, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

export const GroupChat = ({ groupName }: { groupName: string }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: {
        id: "1",
        name: "Alice Johnson",
        avatar: "/avatars/alice.jpg"
      },
      content: "Hey everyone! Did we decide on the restaurant for tonight?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: "2",
      sender: {
        id: "2",
        name: "You",
        avatar: "/avatars/you.jpg"
      },
      content: "I think we agreed on that Italian place downtown",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: "3",
      sender: {
        id: "3",
        name: "Bob Smith",
        avatar: "/avatars/bob.jpg"
      },
      content: "Sounds good to me! What time are we meeting?",
      timestamp: "10:35 AM",
      isOwn: false
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const message: Message = {
      id: (messages.length + 1).toString(),
      sender: {
        id: "2",
        name: "You",
        avatar: "/avatars/you.jpg"
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <Card className="glass-strong p-4 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-display gradient-text">{groupName}</h3>
          <Button variant="ghost" size="icon" className="hover-scale">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </Card>
      
      <Card className="glass-strong flex-1 flex flex-col mb-4">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${
                  message.isOwn 
                    ? "bg-primary text-primary-foreground rounded-br-none" 
                    : "bg-secondary text-secondary-foreground rounded-bl-none"
                }`}
              >
                {!message.isOwn && (
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-semibold">{message.sender.name}</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? "text-primary-foreground/70" : "text-secondary-foreground/70"} text-right`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover-scale">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-scale">
              <Smile className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 glass border-primary/30 focus:border-primary/60"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="glass-strong hover-scale"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};