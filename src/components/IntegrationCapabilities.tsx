import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Banknote, 
  Calendar,
  Mail,
  Plug,
  CreditCard,
  FileText,
  Clock,
  RefreshCw,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

interface BankAccount {
  id: string;
  name: string;
  bank: string;
  lastSync: string;
  status: "connected" | "disconnected" | "syncing";
}

interface CalendarEvent {
  id: string;
  name: string;
  date: string;
  amount: number;
  frequency: string;
}

interface EmailAccount {
  id: string;
  email: string;
  connected: boolean;
  lastChecked: string;
}

interface ThirdPartyApp {
  id: string;
  name: string;
  category: string;
  connected: boolean;
  description: string;
}

export const IntegrationCapabilities = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<"bank" | "calendar" | "email" | "apps">("bank");
  const [syncing, setSyncing] = useState(false);
  
  // Bank accounts data
  const bankAccounts: BankAccount[] = [
    {
      id: "1",
      name: "Savings Account",
      bank: "State Bank of India",
      lastSync: "2024-06-15 14:30",
      status: "connected"
    },
    {
      id: "2",
      name: "Credit Card",
      bank: "HDFC Bank",
      lastSync: "2024-06-14 09:15",
      status: "connected"
    }
  ];

  // Calendar events data
  const calendarEvents: CalendarEvent[] = [
    {
      id: "1",
      name: "Rent Payment",
      date: "2024-06-01",
      amount: 15000,
      frequency: "Monthly"
    },
    {
      id: "2",
      name: "Internet Bill",
      date: "2024-06-05",
      amount: 1200,
      frequency: "Monthly"
    },
    {
      id: "3",
      name: "Insurance Premium",
      date: "2024-06-15",
      amount: 5000,
      frequency: "Quarterly"
    }
  ];

  // Email accounts data
  const emailAccounts: EmailAccount[] = [
    {
      id: "1",
      email: "user@gmail.com",
      connected: true,
      lastChecked: "2024-06-15 16:45"
    },
    {
      id: "2",
      email: "user@company.com",
      connected: false,
      lastChecked: "Never"
    }
  ];

  // Third-party apps data
  const thirdPartyApps: ThirdPartyApp[] = [
    {
      id: "1",
      name: "Google Drive",
      category: "Storage",
      connected: true,
      description: "Backup expense data to cloud storage"
    },
    {
      id: "2",
      name: "Slack",
      category: "Communication",
      connected: false,
      description: "Share expense reports with team members"
    },
    {
      id: "3",
      name: "Trello",
      category: "Productivity",
      connected: false,
      description: "Sync expenses with project boards"
    },
    {
      id: "4",
      name: "QuickBooks",
      category: "Accounting",
      connected: false,
      description: "Export data to accounting software"
    }
  ];

  // Handle manual sync
  const handleManualSync = () => {
    setSyncing(true);
    // Simulate sync process
    setTimeout(() => {
      setSyncing(false);
    }, 3000);
  };

  // Get status badge for bank account
  const getBankStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500/20 text-green-500"><CheckCircle className="w-3 h-3 mr-1" />Connected</Badge>;
      case "syncing":
        return <Badge className="bg-blue-500/20 text-blue-500"><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Syncing</Badge>;
      case "disconnected":
        return <Badge variant="secondary">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-6">
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-display gradient-text">Integration Capabilities</h1>
            <p className="text-muted-foreground">Connect with external services to enhance your experience</p>
          </div>
          <Button onClick={onBack} variant="outline" className="glass hover-scale">
            Back to Dashboard
          </Button>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={activeTab === "bank" ? "default" : "outline"} 
            onClick={() => setActiveTab("bank")}
            className={activeTab === "bank" ? "glass-strong" : "glass"}
          >
            <Banknote className="w-4 h-4 mr-2" />
            Bank Syncing
          </Button>
          <Button 
            variant={activeTab === "calendar" ? "default" : "outline"} 
            onClick={() => setActiveTab("calendar")}
            className={activeTab === "calendar" ? "glass-strong" : "glass"}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </Button>
          <Button 
            variant={activeTab === "email" ? "default" : "outline"} 
            onClick={() => setActiveTab("email")}
            className={activeTab === "email" ? "glass-strong" : "glass"}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Parsing
          </Button>
          <Button 
            variant={activeTab === "apps" ? "default" : "outline"} 
            onClick={() => setActiveTab("apps")}
            className={activeTab === "apps" ? "glass-strong" : "glass"}
          >
            <Plug className="w-4 h-4 mr-2" />
            Third-Party Apps
          </Button>
        </div>

        {/* Bank Account Syncing */}
        {activeTab === "bank" && (
          <Card className="glass-strong p-6 hover-scale">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Banknote className="w-8 h-8 text-primary" />
                <h2 className="text-xl font-display gradient-text">Bank Account Syncing</h2>
              </div>
              <Button 
                onClick={handleManualSync}
                disabled={syncing}
                className="glass-strong hover-scale"
              >
                {syncing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Automatically sync your bank transactions to track expenses without manual entry.
            </p>
            
            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <div key={account.id} className="p-4 glass rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold">{account.name}</div>
                      <div className="text-sm text-muted-foreground">{account.bank}</div>
                    </div>
                    {getBankStatusBadge(account.status)}
                  </div>
                  <div className="text-sm">
                    Last synced: {account.lastSync}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="glass">
                      View Transactions
                    </Button>
                    <Button size="sm" variant="outline" className="glass">
                      Settings
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <Button className="glass-strong hover-scale">
                <CreditCard className="w-4 h-4 mr-2" />
                Connect New Account
              </Button>
            </div>
          </Card>
        )}

        {/* Calendar Integration */}
        {activeTab === "calendar" && (
          <Card className="glass-strong p-6 hover-scale">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-secondary" />
              <h2 className="text-xl font-display gradient-text">Calendar Integration</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Sync recurring expenses with your calendar to never miss a payment.
            </p>
            
            <div className="bg-secondary/20 rounded-lg aspect-video mb-6 flex items-center justify-center">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Calendar Preview</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Recurring Expenses</h3>
                <Button size="sm" className="glass-strong hover-scale">
                  <Clock className="w-4 h-4 mr-2" />
                  Add Recurring Expense
                </Button>
              </div>
              
              {calendarEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 glass rounded">
                  <div>
                    <div className="font-semibold">{event.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} • ₹{event.amount.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{event.frequency}</div>
                    <Badge variant="secondary" className="mt-1">
                      Upcoming
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Email Receipt Parsing */}
        {activeTab === "email" && (
          <Card className="glass-strong p-6 hover-scale">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-accent" />
              <h2 className="text-xl font-display gradient-text">Email Receipt Parsing</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Automatically parse expense details from email receipts to reduce manual data entry.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Connected Email Accounts</h3>
                <div className="space-y-3">
                  {emailAccounts.map((email) => (
                    <div key={email.id} className="p-4 glass rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono">{email.email}</span>
                        {email.connected ? (
                          <Badge className="bg-green-500/20 text-green-500">Connected</Badge>
                        ) : (
                          <Button size="sm" className="glass-strong">
                            Connect
                          </Button>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last checked: {email.lastChecked}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Parsing Rules</h3>
                <div className="space-y-3">
                  <div className="p-4 glass rounded">
                    <div className="font-semibold mb-1">Merchant Identification</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically detect merchants from email senders
                    </div>
                  </div>
                  <div className="p-4 glass rounded">
                    <div className="font-semibold mb-1">Amount Extraction</div>
                    <div className="text-sm text-muted-foreground">
                      Extract amounts using pattern matching
                    </div>
                  </div>
                  <div className="p-4 glass rounded">
                    <div className="font-semibold mb-1">Date Recognition</div>
                    <div className="text-sm text-muted-foreground">
                      Identify transaction dates from email content
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <Button className="glass-strong hover-scale">
                <FileText className="w-4 h-4 mr-2" />
                Create Custom Parsing Rule
              </Button>
            </div>
          </Card>
        )}

        {/* Third-Party App Integrations */}
        {activeTab === "apps" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {thirdPartyApps.map((app) => (
              <Card key={app.id} className="glass p-6 hover-scale">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-display gradient-text">{app.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {app.category}
                    </Badge>
                  </div>
                  <Button 
                    variant={app.connected ? "default" : "outline"}
                    className={app.connected ? "glass-strong" : "glass"}
                  >
                    {app.connected ? "Connected" : "Connect"}
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">{app.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="glass">
                    Learn More
                  </Button>
                  {app.connected && (
                    <Button size="sm" variant="outline" className="glass">
                      Settings
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};