import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Key, 
  Database,
  Upload,
  Download,
  Eye,
  EyeOff,
  Smartphone,
  Users,
  MessageCircle,
  Mail
} from "lucide-react";
import { useState } from "react";
import { useSound } from "@/hooks/useSound";

interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export const SecurityPrivacy = ({ onBack }: { onBack: () => void }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const { playClick, playHover } = useSound();
  
  // Privacy settings
  const privacySettings: PrivacySetting[] = [
    {
      id: "1",
      name: "Expense Visibility",
      description: "Control who can see your expenses",
      enabled: true
    },
    {
      id: "2",
      name: "Profile Privacy",
      description: "Manage who can view your profile information",
      enabled: true
    },
    {
      id: "3",
      name: "Activity Status",
      description: "Show when you're active to friends",
      enabled: false
    },
    {
      id: "4",
      name: "Location Sharing",
      description: "Share location data for expenses",
      enabled: true
    }
  ];

  // Toggle privacy setting
  const togglePrivacySetting = (id: string) => {
    playClick();
    // In a real app, this would update the setting
    console.log(`Toggled privacy setting ${id}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-6">
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-display gradient-text">Security & Privacy</h1>
            <p className="text-muted-foreground">Protect your data and control your privacy</p>
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

        {/* Security Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="glass p-6 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              {encryptionEnabled ? (
                <Lock className="w-6 h-6 text-green-500" />
              ) : (
                <Shield className="w-6 h-6 text-green-500" />
              )}
            </div>
            <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
            <Badge className={encryptionEnabled ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}>
              {encryptionEnabled ? "Active" : "Inactive"}
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              All your data is encrypted
            </p>
          </Card>
          
          <Card 
            className="glass p-6 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              {twoFactorEnabled ? (
                <Key className="w-6 h-6 text-blue-500" />
              ) : (
                <Smartphone className="w-6 h-6 text-blue-500" />
              )}
            </div>
            <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
            <Badge className={twoFactorEnabled ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}>
              {twoFactorEnabled ? "Enabled" : "Disabled"}
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              Extra layer of security
            </p>
          </Card>
          
          <Card 
            className="glass p-6 text-center hover-scale cursor-pointer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold mb-2">Data Backup</h3>
            <Badge className="bg-purple-500/20 text-purple-500">
              Automatic
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              Last backup: 2 hours ago
            </p>
          </Card>
        </div>

        {/* Encryption Section */}
        <Card className="glass-strong p-6 mb-8 hover-scale">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-display gradient-text">End-to-End Encryption</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            All your financial data is protected with military-grade encryption both in transit and at rest.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div 
              className="p-4 glass rounded cursor-pointer hover-scale"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-green-500" />
                <span className="font-semibold">AES-256 Encryption</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Industry standard encryption for data at rest
              </p>
            </div>
            
            <div 
              className="p-4 glass rounded cursor-pointer hover-scale"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="font-semibold">TLS 1.3</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure data transmission between your device and our servers
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 glass rounded">
            <div>
              <div className="font-semibold">Encryption Status</div>
              <div className="text-sm text-muted-foreground">
                All data is currently encrypted
              </div>
            </div>
            <Button 
              variant={encryptionEnabled ? "default" : "outline"}
              onClick={() => {
                playClick();
                setEncryptionEnabled(!encryptionEnabled);
              }}
              className={encryptionEnabled ? "glass-strong" : "glass"}
              onMouseEnter={() => playHover()}
            >
              {encryptionEnabled ? "Encryption Active" : "Enable Encryption"}
            </Button>
          </div>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="glass-strong p-6 mb-8 hover-scale">
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-8 h-8 text-secondary" />
            <h2 className="text-xl font-display gradient-text">Two-Factor Authentication</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Add an extra layer of security to your account with 2FA.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div 
              className="p-4 glass rounded text-center cursor-pointer hover-scale"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              <Smartphone className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold">Authenticator App</div>
              <div className="text-sm text-muted-foreground">
                Use Google Authenticator or similar
              </div>
            </div>
            
            <div 
              className="p-4 glass rounded text-center cursor-pointer hover-scale"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              <MessageCircle className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="font-semibold">SMS Codes</div>
              <div className="text-sm text-muted-foreground">
                Receive codes via text message
              </div>
            </div>
            
            <div 
              className="p-4 glass rounded text-center cursor-pointer hover-scale"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              <Mail className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="font-semibold">Email Codes</div>
              <div className="text-sm text-muted-foreground">
                Receive codes via email
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 glass rounded">
            <div>
              <div className="font-semibold">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">
                {twoFactorEnabled 
                  ? "Protects your account with an extra step" 
                  : "Add an extra layer of security"}
              </div>
            </div>
            <Button 
              variant={twoFactorEnabled ? "default" : "outline"}
              onClick={() => {
                playClick();
                setTwoFactorEnabled(!twoFactorEnabled);
              }}
              className={twoFactorEnabled ? "glass-strong" : "glass"}
              onMouseEnter={() => playHover()}
            >
              {twoFactorEnabled ? "Enabled" : "Enable 2FA"}
            </Button>
          </div>
        </Card>

        {/* Data Backup & Restore */}
        <Card className="glass-strong p-6 mb-8 hover-scale">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-accent" />
            <h2 className="text-xl font-display gradient-text">Data Backup & Restore</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Automatically backup your data and restore it when needed.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Backup Data
              </h3>
              <div className="space-y-3">
                <div className="p-3 glass rounded">
                  <div className="flex justify-between">
                    <span>Automatic Backups</span>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Daily backups at 2:00 AM
                  </div>
                </div>
                
                <div className="p-3 glass rounded">
                  <div className="flex justify-between mb-2">
                    <span>Last Backup</span>
                    <span>2 hours ago</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 glass-strong"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                    >
                      Backup Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Restore Data
              </h3>
              <div className="space-y-3">
                <div className="p-3 glass rounded">
                  <div className="mb-2">
                    <span>Available Backups</span>
                  </div>
                  <div className="space-y-2">
                    <div 
                      className="flex justify-between text-sm cursor-pointer hover-scale p-1 rounded"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                    >
                      <span>June 15, 2024</span>
                      <span>15.2 MB</span>
                    </div>
                    <div 
                      className="flex justify-between text-sm cursor-pointer hover-scale p-1 rounded"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                    >
                      <span>June 14, 2024</span>
                      <span>14.8 MB</span>
                    </div>
                    <div 
                      className="flex justify-between text-sm cursor-pointer hover-scale p-1 rounded"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                    >
                      <span>June 13, 2024</span>
                      <span>14.5 MB</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 glass rounded">
                  <Button 
                    className="w-full glass-strong"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                  >
                    Restore Selected Backup
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Controls */}
        <Card className="glass-strong p-6 hover-scale">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-display gradient-text">Privacy Controls</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Control who can see your information and what data is shared.
          </p>
          
          <div className="space-y-3">
            {privacySettings.map((setting) => (
              <div 
                key={setting.id} 
                className="flex items-center justify-between p-4 glass rounded cursor-pointer hover-scale"
                onClick={() => {
                  playClick();
                  togglePrivacySetting(setting.id);
                }}
                onMouseEnter={() => playHover()}
              >
                <div>
                  <div className="font-semibold">{setting.name}</div>
                  <div className="text-sm text-muted-foreground">{setting.description}</div>
                </div>
                <Button 
                  variant={setting.enabled ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick();
                    togglePrivacySetting(setting.id);
                  }}
                  className={setting.enabled ? "glass-strong" : "glass"}
                  onMouseEnter={() => playHover()}
                >
                  {setting.enabled ? "Enabled" : "Disabled"}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};