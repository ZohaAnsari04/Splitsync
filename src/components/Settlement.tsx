import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Wallet, 
  Bell, 
  History, 
  IndianRupee, 
  DollarSign, 
  Euro,
  Send,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { useState } from "react";

interface SettlementRequest {
  id: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "cancelled";
  dueDate: string;
  description: string;
}

interface PaymentPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
}

interface SettlementHistory {
  id: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  date: string;
  method: string;
  status: "success" | "failed";
}

export const Settlement = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<"requests" | "history">("requests");
  
  // Sample data for settlement requests
  const settlementRequests: SettlementRequest[] = [
    {
      id: "1",
      from: "Alice Johnson",
      to: "You",
      amount: 1200,
      currency: "INR",
      status: "pending",
      dueDate: "2024-06-15",
      description: "Dinner at Zomato"
    },
    {
      id: "2",
      from: "You",
      to: "Bob Smith",
      amount: 800,
      currency: "INR",
      status: "pending",
      dueDate: "2024-06-20",
      description: "Movie Tickets"
    },
    {
      id: "3",
      from: "Charlie Brown",
      to: "You",
      amount: 2450,
      currency: "INR",
      status: "completed",
      dueDate: "2024-06-10",
      description: "Grocery Shopping"
    }
  ];

  // Sample data for payment platforms
  const paymentPlatforms: PaymentPlatform[] = [
    { id: "1", name: "PayPal", icon: <Wallet className="w-5 h-5" />, connected: true },
    { id: "2", name: "Venmo", icon: <Send className="w-5 h-5" />, connected: false },
    { id: "3", name: "Google Pay", icon: <IndianRupee className="w-5 h-5" />, connected: true },
    { id: "4", name: "Apple Pay", icon: <DollarSign className="w-5 h-5" />, connected: false },
    { id: "5", name: "Paytm", icon: <IndianRupee className="w-5 h-5" />, connected: true }
  ];

  // Sample data for settlement history
  const settlementHistory: SettlementHistory[] = [
    {
      id: "101",
      from: "You",
      to: "Alice Johnson",
      amount: 1500,
      currency: "INR",
      date: "2024-06-01",
      method: "Google Pay",
      status: "success"
    },
    {
      id: "102",
      from: "Bob Smith",
      to: "You",
      amount: 900,
      currency: "INR",
      date: "2024-05-28",
      method: "PayPal",
      status: "success"
    },
    {
      id: "103",
      from: "You",
      to: "Charlie Brown",
      amount: 2100,
      currency: "INR",
      date: "2024-05-25",
      method: "Cash",
      status: "success"
    },
    {
      id: "104",
      from: "Diana Prince",
      to: "You",
      amount: 750,
      currency: "USD",
      date: "2024-05-20",
      method: "Bank Transfer",
      status: "failed"
    }
  ];

  // Get currency symbol
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "INR": return "₹";
      case "USD": return "$";
      case "EUR": return "€";
      default: return currency;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-500/20 text-green-500"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500/20 text-red-500"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      case "success":
        return <Badge className="bg-green-500/20 text-green-500"><CheckCircle className="w-3 h-3 mr-1" />Success</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-500"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
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
            <h1 className="text-3xl font-display gradient-text">Settlements</h1>
            <p className="text-muted-foreground">Manage payments and track settlement history</p>
          </div>
          <Button onClick={onBack} variant="outline" className="glass hover-scale">
            Back to Dashboard
          </Button>
        </div>

        {/* Payment Platforms */}
        <Card className="glass-strong p-6 mb-8 hover-scale">
          <h2 className="text-xl font-display gradient-text mb-4">Payment Platforms</h2>
          <p className="text-muted-foreground mb-4">Connect your preferred payment methods for seamless settlements</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {paymentPlatforms.map((platform) => (
              <div 
                key={platform.id} 
                className={`p-4 rounded-lg border text-center cursor-pointer transition-all ${
                  platform.connected 
                    ? "border-primary/50 bg-primary/10" 
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="flex justify-center mb-2">
                  {platform.icon}
                </div>
                <div className="text-sm font-medium">{platform.name}</div>
                <Badge 
                  variant="secondary" 
                  className={`mt-2 text-xs ${platform.connected ? "bg-green-500/20 text-green-500" : ""}`}
                >
                  {platform.connected ? "Connected" : "Connect"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button 
            variant={activeTab === "requests" ? "default" : "outline"} 
            onClick={() => setActiveTab("requests")}
            className={activeTab === "requests" ? "glass-strong text-foreground" : "glass"}
          >
            <Bell className="w-4 h-4 mr-2" />
            Payment Requests
          </Button>
          <Button 
            variant={activeTab === "history" ? "default" : "outline"} 
            onClick={() => setActiveTab("history")}
            className={activeTab === "history" ? "glass-strong text-foreground" : "glass"}
          >
            <History className="w-4 h-4 mr-2" />
            Settlement History
          </Button>
        </div>

        {/* Payment Requests Tab */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            {settlementRequests.map((request) => (
              <Card key={request.id} className="glass p-6 hover-scale">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">
                        {request.from === "You" ? `You owe ${request.to}` : `${request.from} owes you`}
                      </div>
                      <div className="text-sm text-muted-foreground">{request.description}</div>
                      <div className="text-sm mt-1">
                        Due: {new Date(request.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-mono font-bold gradient-text">
                        {getCurrencySymbol(request.currency)}{request.amount.toLocaleString()}
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        {request.from === "You" ? (
                          <>
                            <Button size="sm" className="glass-strong hover-scale text-foreground">
                              Pay Now
                            </Button>
                            <Button size="sm" variant="outline" className="glass">
                              Remind
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" className="glass-strong hover-scale text-foreground">
                              Request Payment
                            </Button>
                            <Button size="sm" variant="outline" className="glass">
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Settlement History Tab */}
        {activeTab === "history" && (
          <Card className="glass-strong p-6 hover-scale">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2">From</th>
                    <th className="text-left py-3 px-2">To</th>
                    <th className="text-left py-3 px-2">Amount</th>
                    <th className="text-left py-3 px-2">Date</th>
                    <th className="text-left py-3 px-2">Method</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {settlementHistory.map((history) => (
                    <tr key={history.id} className="border-b border-border/50 hover:bg-primary/5">
                      <td className="py-3 px-2">{history.from}</td>
                      <td className="py-3 px-2">{history.to}</td>
                      <td className="py-3 px-2 font-mono">
                        {getCurrencySymbol(history.currency)}{history.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-2">{new Date(history.date).toLocaleDateString()}</td>
                      <td className="py-3 px-2">{history.method}</td>
                      <td className="py-3 px-2">{getStatusBadge(history.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};