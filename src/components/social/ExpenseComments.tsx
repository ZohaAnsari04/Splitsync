import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Reply } from "lucide-react";

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies: Reply[];
}

interface Reply {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export const ExpenseComments = ({ expenseId }: { expenseId: string }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        id: "1",
        name: "Alice Johnson",
        avatar: "/avatars/alice.jpg"
      },
      content: "Thanks for splitting this with us! The dinner was great.",
      timestamp: "2 hours ago",
      likes: 3,
      liked: false,
      replies: [
        {
          id: "1-1",
          user: {
            id: "2",
            name: "You",
            avatar: "/avatars/you.jpg"
          },
          content: "Glad you enjoyed it!",
          timestamp: "1 hour ago"
        }
      ]
    },
    {
      id: "2",
      user: {
        id: "3",
        name: "Bob Smith",
        avatar: "/avatars/bob.jpg"
      },
      content: "Can we settle this by Friday?",
      timestamp: "1 day ago",
      likes: 1,
      liked: true,
      replies: []
    }
  ]);
  
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    
    const comment: Comment = {
      id: (comments.length + 1).toString(),
      user: {
        id: "2",
        name: "You",
        avatar: "/avatars/you.jpg"
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      liked: false,
      replies: []
    };
    
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    }));
  };

  const handleAddReply = (commentId: string, replyContent: string) => {
    if (replyContent.trim() === "") return;
    
    const reply: Reply = {
      id: `${commentId}-${Date.now()}`,
      user: {
        id: "2",
        name: "You",
        avatar: "/avatars/you.jpg"
      },
      content: replyContent,
      timestamp: "Just now"
    };
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        };
      }
      return comment;
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display gradient-text flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Comments
      </h3>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="glass p-4">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="mt-1 text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLikeComment(comment.id)}
                    className={`hover-scale ${comment.liked ? "text-primary" : ""}`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {comment.likes > 0 ? comment.likes : "Like"}
                  </Button>
                  <Button variant="ghost" size="sm" className="hover-scale">
                    <Reply className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
                </div>
                
                {comment.replies.length > 0 && (
                  <div className="mt-3 space-y-3 pl-4 border-l-2 border-primary/20">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                          <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{reply.user.name}</span>
                            <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                          </div>
                          <p className="text-sm">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Card className="glass p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/avatars/you.jpg" alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="glass mb-2 border-primary/30 focus:border-primary/60"
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="glass-strong hover-scale"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};