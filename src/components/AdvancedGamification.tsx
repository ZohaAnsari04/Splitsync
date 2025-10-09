import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  Users, 
  Zap,
  Flame,
  Award,
  Star,
  Calendar,
  TrendingUp,
  Crown
} from "lucide-react";
import { useState } from "react";
import { useSound } from "@/hooks/useSound";
import { toast } from "sonner";

// Define the streak type
interface Streak {
  current: number;
  longest: number;
  lastLogged: string;
}

interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  dateEarned?: string;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  participants: number;
  progress: number;
  endDate: string;
  reward: string;
  joined?: boolean; // Add joined property
}

export const AdvancedGamification = ({ onBack, streak: propStreak }: { onBack: () => void; streak?: Streak }) => {
  const [activeTab, setActiveTab] = useState<"streaks" | "badges" | "challenges">("streaks");
  const { playClick, playHover } = useSound();
  
  // Streak data - use propStreak if provided, otherwise use default
  const streak: Streak = propStreak || {
    current: 15,
    longest: 28,
    lastLogged: "2024-06-15"
  };

  // Badges data
  const badges: BadgeType[] = [
    { 
      id: "1", 
      name: "First Expense", 
      description: "Log your first expense", 
      icon: <Star className="w-5 h-5" />, 
      earned: true, 
      dateEarned: "2024-01-15" 
    },
    { 
      id: "2", 
      name: "Consistent Logger", 
      description: "Log expenses for 7 consecutive days", 
      icon: <Flame className="w-5 h-5" />, 
      earned: true, 
      dateEarned: "2024-03-22" 
    },
    { 
      id: "3", 
      name: "Budget Master", 
      description: "Stay under budget for a full month", 
      icon: <Trophy className="w-5 h-5" />, 
      earned: true, 
      dateEarned: "2024-05-01" 
    },
    { 
      id: "4", 
      name: "Social Butterfly", 
      description: "Add 5 friends to your network", 
      icon: <Users className="w-5 h-5" />, 
      earned: false 
    },
    { 
      id: "5", 
      name: "Milestone Achiever", 
      description: "Log 100 expenses", 
      icon: <Target className="w-5 h-5" />, 
      earned: false 
    },
    { 
      id: "6", 
      name: "Expense Master", 
      description: "Log 100 expenses", 
      icon: <Award className="w-5 h-5" />, 
      earned: false 
    }
  ];

  // Challenges data with joined state
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      name: "Weekly Warrior",
      description: "Log at least one expense every day for a week",
      participants: 142,
      progress: 75,
      endDate: "2024-06-22",
      reward: "500 Karma Points",
      joined: false
    },
    {
      id: "2",
      name: "Budget Boss",
      description: "Stay under your weekly budget limit",
      participants: 89,
      progress: 40,
      endDate: "2024-06-30",
      reward: "1000 Karma Points",
      joined: false
    },
    {
      id: "3",
      name: "Social Star",
      description: "Comment on 5 different expenses",
      participants: 203,
      progress: 20,
      endDate: "2024-06-25",
      reward: "300 Karma Points",
      joined: false
    }
  ]);

  // Function to handle joining a challenge
  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => {
        if (challenge.id === challengeId) {
          // If already joined, show a message, otherwise join the challenge
          if (challenge.joined) {
            toast.info(`You are already participating in "${challenge.name}"`);
            return challenge;
          } else {
            toast.success(`You've joined the "${challenge.name}" challenge!`);
            return { ...challenge, joined: true, participants: challenge.participants + 1 };
          }
        }
        return challenge;
      })
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-6">
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-display gradient-text">Advanced Gamification</h1>
            <p className="text-muted-foreground">Level up your expense tracking with fun challenges</p>
          </div>
          <Button 
            onClick={() => {
              playClick();
              onBack();
            }} 
            variant="outline" 
            className="glass hover-scale"
            onMouseEnter={() => playHover()}
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer border border-primary/30"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-display font-bold gradient-text">{streak.current}</div>
            <div className="text-sm text-foreground">Day Streak</div>
          </Card>
          
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer border border-primary/30"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-display font-bold gradient-text">{badges.filter(b => b.earned).length}</div>
            <div className="text-sm text-foreground">Badges Earned</div>
          </Card>
          
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer border border-primary/30"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-display font-bold gradient-text">{challenges.length}</div>
            <div className="text-sm text-foreground">Active Challenges</div>
          </Card>
          
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer border border-primary/30"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-display font-bold gradient-text">2nd</div>
            <div className="text-sm text-foreground">Global Rank</div>
          </Card>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={activeTab === "streaks" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setActiveTab("streaks");
            }}
            className={`${activeTab === "streaks" ? "glass-strong" : "glass"} text-foreground border border-primary/30 hover:border-primary/60`}
            onMouseEnter={() => playHover()}
          >
            <Flame className="w-4 h-4 mr-2" />
            Streak Tracking
          </Button>
          <Button 
            variant={activeTab === "badges" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setActiveTab("badges");
            }}
            className={`${activeTab === "badges" ? "glass-strong" : "glass"} text-foreground border border-primary/30 hover:border-primary/60`}
            onMouseEnter={() => playHover()}
          >
            <Award className="w-4 h-4 mr-2" />
            Badges
          </Button>
          <Button 
            variant={activeTab === "challenges" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setActiveTab("challenges");
            }}
            className={`${activeTab === "challenges" ? "glass-strong" : "glass"} text-foreground border border-primary/30 hover:border-primary/60`}
            onMouseEnter={() => playHover()}
          >
            <Target className="w-4 h-4 mr-2" />
            Social Challenges
          </Button>
        </div>

        {/* Streak Tracking */}
        {activeTab === "streaks" && (
          <Card className="glass-strong p-6 hover-scale">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-8 h-8 text-orange-500" />
              <h2 className="text-xl font-display gradient-text">Streak Tracking</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                className="text-center p-6 glass rounded cursor-pointer hover-scale border border-primary/20"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="text-4xl font-display font-bold gradient-text mb-2">{streak.current}</div>
                <div className="text-muted-foreground mb-4">Current Streak</div>
                <div className="text-sm text-foreground">
                  Last logged: {new Date(streak.lastLogged).toLocaleDateString()}
                </div>
              </div>
              
              <div 
                className="text-center p-6 glass rounded cursor-pointer hover-scale border border-primary/20"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="text-4xl font-display font-bold gradient-text mb-2">{streak.longest}</div>
                <div className="text-muted-foreground mb-4">Longest Streak</div>
                <div className="text-sm text-foreground">
                  Personal best record
                </div>
              </div>
              
              <div className="p-6 glass rounded border border-primary/20">
                <h3 className="font-semibold mb-3 text-foreground">Streak Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-foreground">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>+10% Karma bonus</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>Exclusive badges</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Early access to features</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <Button 
                className="glass-strong hover-scale text-foreground border border-primary/30 hover:border-primary/60"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Streak History
              </Button>
            </div>
          </Card>
        )}

        {/* Badges */}
        {activeTab === "badges" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <Card 
                key={badge.id} 
                className={`p-5 hover-scale ${badge.earned ? "glass-strong" : "glass opacity-70"} cursor-pointer`}
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-full ${badge.earned ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
                
                {badge.earned ? (
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-500/20 text-green-500">
                      Earned
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(badge.dateEarned!).toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      Locked
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="glass text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                      }}
                      onMouseEnter={() => playHover()}
                    >
                      How to earn
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Social Challenges */}
        {activeTab === "challenges" && (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className="glass p-6 hover-scale cursor-pointer"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-display gradient-text">{challenge.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-2">{challenge.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>{challenge.participants} participants</span>
                      <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-mono font-bold gradient-text">{challenge.progress}%</div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                    
                    <div className="w-24">
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className={`hover-scale text-foreground border border-primary/30 hover:border-primary/60 ${
                        challenge.joined ? "glass" : "glass-strong"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                        // Implement join challenge functionality
                        handleJoinChallenge(challenge.id);
                      }}
                      onMouseEnter={() => playHover()}
                    >
                      {challenge.joined ? "Joined" : "Join"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};