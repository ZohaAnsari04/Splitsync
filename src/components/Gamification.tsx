import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Star, Zap, Award, Target } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/logo.png";
import { Progress } from "@/components/ui/progress";
import { useSound } from "@/hooks/useSound";

interface GamificationProps {
  onBack: () => void;
}

export const Gamification = ({ onBack }: GamificationProps) => {
  const { playClick, playHover } = useSound();
  
  const achievements = [
    { name: "Early Bird", icon: Star, unlocked: true, description: "Paid within 24 hours" },
    { name: "Group Master", icon: Trophy, unlocked: true, description: "Created 10 groups" },
    { name: "Splitting Pro", icon: Zap, unlocked: false, description: "100 expenses split" },
    { name: "Team Player", icon: Award, unlocked: true, description: "Settled all debts on time" },
  ];

  const leaderboard = [
    { name: "You", score: 1234, rank: 1, avatar: "Y", color: "from-yellow-500 to-orange-500" },
    { name: "Alice", score: 1180, rank: 2, avatar: "A", color: "from-purple-500 to-pink-500" },
    { name: "Bob", score: 1150, rank: 3, avatar: "B", color: "from-cyan-500 to-blue-500" },
    { name: "Charlie", score: 1090, rank: 4, avatar: "C", color: "from-green-500 to-teal-500" },
  ];

  const challenges = [
    { name: "Weekly Warrior", progress: 75, target: 100, reward: 50 },
    { name: "Split Master", progress: 40, target: 50, reward: 30 },
    { name: "Social Settler", progress: 90, target: 100, reward: 40 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-slide-up">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                playClick();
                onBack();
              }} 
              className="hover-scale"
              onMouseEnter={() => playHover()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src={logo} alt="SplitSync" className="w-10 h-10" />
            <h1 className="text-2xl font-display gradient-text">Gamification</h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Karma Score */}
        <Card className="glass-strong p-8 mb-8 text-center animate-slide-up border-2 border-primary/30">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-2xl font-display">Your Karma Score</h2>
          </div>
          
          <div className="relative inline-block">
            <div 
              className="text-6xl font-display font-bold gradient-text animate-pulse-glow cursor-pointer"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              1,234
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-bounce">
              <Zap className="w-4 h-4 text-background" />
            </div>
          </div>
          
          <p className="text-muted-foreground mt-2">Top 5% of all users!</p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Achievements */}
          <Card className="glass-strong p-6 animate-slide-up border-primary/20" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-display text-xl mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Achievements
            </h3>
            
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.name}
                  className={`glass p-4 rounded-lg hover-scale cursor-pointer border transition-all ${
                    achievement.unlocked
                      ? "border-accent/30 hover:border-accent/60"
                      : "border-muted/20 opacity-60"
                  } animate-scale-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-primary to-accent glow-purple"
                          : "glass"
                      }`}
                    >
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-semibold">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    
                    {achievement.unlocked && (
                      <Star className="w-5 h-5 text-accent animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Leaderboard */}
          <Card className="glass-strong p-6 animate-slide-up border-secondary/20" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-display text-xl mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" />
              Leaderboard
            </h3>
            
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={user.name}
                  className={`glass p-4 rounded-lg flex items-center gap-4 hover-scale cursor-pointer border transition-all animate-scale-in ${
                    user.rank === 1 ? "border-primary/30 glow-purple" : "border-transparent"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl font-display font-bold text-muted-foreground w-8">
                      #{user.rank}
                    </span>
                    
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center font-display text-foreground text-xl font-bold`}
                    >
                      {user.avatar}
                    </div>
                    
                    <span className="font-semibold">{user.name}</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-mono font-bold text-xl gradient-text">{user.score}</div>
                    {user.rank === 1 && (
                      <Trophy className="w-4 h-4 text-primary inline-block animate-bounce" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Challenges */}
        <Card className="glass-strong p-6 animate-slide-up border-accent/20" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-display text-xl mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Active Challenges
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((challenge, index) => (
              <div
                key={challenge.name}
                className="glass p-4 rounded-lg space-y-3 hover-scale border border-primary/20 hover:border-primary/40 transition-all animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{challenge.name}</h4>
                  <div className="flex items-center gap-1 text-accent">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-mono">+{challenge.reward}</span>
                  </div>
                </div>
                
                <Progress value={challenge.progress} className="h-2" />
                
                <p className="text-xs text-muted-foreground">
                  {challenge.progress} / {challenge.target} completed
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};