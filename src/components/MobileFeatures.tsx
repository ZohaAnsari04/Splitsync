import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Scan, 
  Fingerprint, 
  Bell, 
  SquareLibrary,
  Camera,
  Smartphone,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from "lucide-react";
import { useState } from "react";

export const MobileFeatures = ({ onBack }: { onBack: () => void }) => {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [widgetEnabled, setWidgetEnabled] = useState(false);
  
  return (
    <div className="min-h-screen relative overflow-hidden p-6">
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-display gradient-text">Mobile Features</h1>
            <p className="text-muted-foreground">Optimized features for your mobile experience</p>
          </div>
          <Button onClick={onBack} variant="outline" className="glass hover-scale">
            Back to Dashboard
          </Button>
        </div>

        {/* Camera Receipt Scanning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass-strong p-6 hover-scale">
            <div className="flex items-center gap-3 mb-4">
              <Scan className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-display gradient-text">Receipt Scanning</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Use your camera to scan receipts and automatically extract expense details using OCR technology.
            </p>
            
            <div className="bg-secondary/20 rounded-lg aspect-video mb-4 flex flex-col items-center justify-center p-6 text-center">
              <Camera className="w-12 h-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-4">Camera Preview</p>
              <Button className="glass-strong hover-scale">
                <Scan className="w-4 h-4 mr-2" />
                Scan Receipt
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Badge className="bg-green-500/20 text-green-500">OCR Enabled</Badge>
              <span className="text-muted-foreground">Extracts amount, date, and merchant</span>
            </div>
          </Card>

          {/* Biometric Authentication */}
          <Card className="glass-strong p-6 hover-scale">
            <div className="flex items-center gap-3 mb-4">
              <Fingerprint className="w-8 h-8 text-secondary" />
              <h2 className="text-xl font-display gradient-text">Biometric Authentication</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Secure your app with fingerprint or face recognition for quick and secure access.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 glass rounded">
                <div className="flex items-center gap-3">
                  <Fingerprint className="w-5 h-5 text-secondary" />
                  <span>Biometric Login</span>
                </div>
                <Button 
                  variant={biometricEnabled ? "default" : "outline"}
                  onClick={() => setBiometricEnabled(!biometricEnabled)}
                  className={biometricEnabled ? "glass-strong" : "glass"}
                >
                  {biometricEnabled ? "Enabled" : "Enable"}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 glass rounded">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-accent" />
                  <span>App Lock</span>
                </div>
                <Button 
                  variant="outline"
                  className="glass"
                >
                  Set Up
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-secondary/10 rounded text-sm">
              <div className="flex items-center gap-2 mb-1">
                {biometricEnabled ? (
                  <Eye className="w-4 h-4 text-green-500" />
                ) : (
                  <EyeOff className="w-4 h-4 text-red-500" />
                )}
                <span className="font-medium">Security Status</span>
              </div>
              <p className="text-muted-foreground">
                {biometricEnabled 
                  ? "Biometric authentication is protecting your data" 
                  : "Enable biometric authentication for enhanced security"}
              </p>
            </div>
          </Card>
        </div>

        {/* Push Notifications */}
        <Card className="glass-strong p-6 mb-8 hover-scale">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-8 h-8 text-accent" />
            <h2 className="text-xl font-display gradient-text">Push Notifications</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Stay on top of your expenses with timely reminders and updates.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 glass rounded">
              <div className="flex items-center justify-between mb-2">
                <span>Payment Reminders</span>
                <Button 
                  variant={notificationsEnabled ? "default" : "outline"}
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={notificationsEnabled ? "glass-strong" : "glass"}
                  size="sm"
                >
                  {notificationsEnabled ? "On" : "Off"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Get notified when payments are due
              </p>
            </div>
            
            <div className="p-4 glass rounded">
              <div className="flex items-center justify-between mb-2">
                <span>Expense Reports</span>
                <Button variant="outline" className="glass" size="sm">
                  On
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Weekly spending summaries
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button className="glass-strong hover-scale">
              <Bell className="w-4 h-4 mr-2" />
              Test Notification
            </Button>
            <Button variant="outline" className="glass">
              Notification Settings
            </Button>
          </div>
        </Card>

        {/* Widget Support */}
        <Card className="glass-strong p-6 hover-scale">
          <div className="flex items-center gap-3 mb-4">
            <SquareLibrary className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-display gradient-text">Home Screen Widgets</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Add quick-action widgets to your home screen for instant access to key features.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="bg-secondary/20 rounded-lg aspect-[2/1] mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Widget Preview</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 glass rounded">
                  <span>Add Expense</span>
                  <Badge variant="secondary">Quick Action</Badge>
                </div>
                <div className="flex items-center justify-between p-3 glass rounded">
                  <span>View Balance</span>
                  <Badge variant="secondary">Information</Badge>
                </div>
                <div className="flex items-center justify-between p-3 glass rounded">
                  <span>Recent Activity</span>
                  <Badge variant="secondary">List</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="p-4 glass rounded mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span>Widget Support</span>
                  <Button 
                    variant={widgetEnabled ? "default" : "outline"}
                    onClick={() => setWidgetEnabled(!widgetEnabled)}
                    className={widgetEnabled ? "glass-strong" : "glass"}
                  >
                    {widgetEnabled ? "Enabled" : "Enable"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add SplitSync widgets to your home screen
                </p>
              </div>
              
              <div className="space-y-3">
                <Card className="glass p-4">
                  <h3 className="font-semibold mb-2">Available Widgets</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Quick Add Expense
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      Balance Summary
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      Recent Expenses
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      Upcoming Payments
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};