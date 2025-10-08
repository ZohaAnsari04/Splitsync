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
}

interface Competition {
  id: string;
  name: string;
  participants: { name: string; score: number }[];
  startDate: string;
  endDate: string;
  prize: string;
}

export const AdvancedGamification = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<"streaks" | "badges" | "challenges" | "competitions">("streaks");
  const { playClick, playHover } = useSound();
  
  // Streak data
  const streak: Streak = {
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

  // Challenges data
  const challenges: Challenge[] = [
    {
      id: "1",
      name: "Weekly Warrior",
      description: "Log at least one expense every day for a week",
      participants: 142,
      progress: 75,
      endDate: "2024-06-22",
      reward: "500 Karma Points"
    },
    {
      id: "2",
      name: "Budget Boss",
      description: "Stay under your weekly budget limit",
      participants: 89,
      progress: 40,
      endDate: "2024-06-30",
      reward: "1000 Karma Points"
    },
    {
      id: "3",
      name: "Social Star",
      description: "Comment on 5 different expenses",
      participants: 203,
      progress: 20,
      endDate: "2024-06-25",
      reward: "300 Karma Points"
    }
  ];

  // Competitions data
  const competitions: Competition[] = [
    {
      id: "1",
      name: "Monthly Spending Challenge",
      participants: [
        { name: "You", score: 15400 },
        { name: "Alice Johnson", score: 14200 },
        { name: "Bob Smith", score: 13800 },
        { name: "Charlie Brown", score: 12900 }
      ],
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      prize: "₹5000 Cash Prize"
    },
    {
      id: "2",
      name: "Savings Sprint",
      participants: [
        { name: "Diana Prince", score: 8200 },
        { name: "You", score: 7500 },
        { name: "Eve Wilson", score: 6900 },
        { name: "Frank Miller", score: 6400 }
      ],
      startDate: "2024-06-10",
      endDate: "2024-07-10",
      prize: "3 Months Premium Subscription"
    }
  ];

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
            className="glass p-4 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-display font-bold gradient-text">{streak.current}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
          
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-display font-bold gradient-text">{badges.filter(b => b.earned).length}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </Card>
          
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-display font-bold gradient-text">{challenges.length}</div>
            <div className="text-sm text-muted-foreground">Active Challenges</div>
          </Card>
          
          <Card 
            className="glass p-4 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-display font-bold gradient-text">2nd</div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
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
            className={activeTab === "streaks" ? "glass-strong" : "glass"}
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
            className={activeTab === "badges" ? "glass-strong" : "glass"}
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
            className={activeTab === "challenges" ? "glass-strong" : "glass"}
            onMouseEnter={() => playHover()}
          >
            <Target className="w-4 h-4 mr-2" />
            Social Challenges
          </Button>
          <Button 
            variant={activeTab === "competitions" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setActiveTab("competitions");
            }}
            className={activeTab === "competitions" ? "glass-strong" : "glass"}
            onMouseEnter={() => playHover()}
          >
            <Users className="w-4 h-4 mr-2" />
            Group Competitions
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
                className="text-center p-6 glass rounded cursor-pointer hover-scale"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="text-4xl font-display font-bold gradient-text mb-2">{streak.current}</div>
                <div className="text-muted-foreground mb-4">Current Streak</div>
                <div className="text-sm">
                  Last logged: {new Date(streak.lastLogged).toLocaleDateString()}
                </div>
              </div>
              
              <div 
                className="text-center p-6 glass rounded cursor-pointer hover-scale"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="text-4xl font-display font-bold gradient-text mb-2">{streak.longest}</div>
                <div className="text-muted-foreground mb-4">Longest Streak</div>
                <div className="text-sm">
                  Personal best record
                </div>
              </div>
              
              <div className="p-6 glass rounded">
                <h3 className="font-semibold mb-3">Streak Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    +10% Karma bonus
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Exclusive badges
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Early access to features
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <Button 
                className="glass-strong hover-scale"
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
                      className="glass-strong hover-scale"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                      }}
                      onMouseEnter={() => playHover()}
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Group Competitions */}
        {activeTab === "competitions" && (
          <div className="space-y-6">
            {competitions.map((competition) => (
              <Card 
                key={competition.id} 
                className="glass-strong p-6 hover-scale cursor-pointer"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-display gradient-text">{competition.name}</h3>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-500">
                    {competition.prize}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Duration</div>
                    <div>
                      {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Participants</div>
                    <div className="flex -space-x-2">
                      {competition.participants.slice(0, 4).map((participant, index) => (
                        <div 
                          key={index} 
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-display cursor-pointer hover-scale"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClick();
                          }}
                          onMouseEnter={() => playHover()}
                        >
                          {participant.name[0]}
                        </div>
                      ))}
                      {competition.participants.length > 4 && (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
                          +{competition.participants.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {competition.participants
                    .sort((a, b) => b.score - a.score)
                    .map((participant, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded ${
                          participant.name === "You" 
                            ? "bg-primary/10 border border-primary/30" 
                            : "glass"
                        } cursor-pointer hover-scale`}
                        onClick={() => playClick()}
                        onMouseEnter={() => playHover()}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display ${
                            index === 0 ? "bg-yellow-500/20 text-yellow-500" :
                            index === 1 ? "bg-gray-500/20 text-gray-500" :
                            index === 2 ? "bg-amber-800/20 text-amber-800" :
                            "bg-secondary/20 text-secondary"
                          }`}>
                            {index + 1}
                          </div>
                          <span className={participant.name === "You" ? "font-bold" : ""}>
                            {participant.name}
                          </span>
                        </div>
                        <div className="font-mono font-bold gradient-text">
                          ₹{participant.score.toLocaleString()}
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};