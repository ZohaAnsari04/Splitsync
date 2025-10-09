import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Image, 
  MapPin, 
  WifiOff, 
  LayoutDashboard, 
  Camera,
  FileText,
  Map,
  CloudOff,
  Database,
  Palette,
  Utensils,
  ShoppingCart,
  Film
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { DigitalReceipt } from "./DigitalReceipt";
import { useSound } from "@/hooks/useSound";

interface Receipt {
  id: string;
  expenseName: string;
  amount: number;
  date: string;
  imageUrl: string;
}

interface Location {
  id: string;
  expenseName: string;
  location: string;
  coordinates: { lat: number; lng: number };
  date: string;
}

export const EnhancedUI = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<"receipts" | "locations" | "offline">("receipts");
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const { playClick, playHover } = useSound();
  
  // Function to get icon for expense category
  const getExpenseIcon = (expenseName: string) => {
    const name = expenseName.toLowerCase();
    
    if (name.includes('dinner') || name.includes('food') || name.includes('zomato') || name.includes('restaurant')) {
      return <Utensils className="w-16 h-16 text-primary animate-bounce" />;
    } else if (name.includes('grocery') || name.includes('shopping') || name.includes('market')) {
      return <ShoppingCart className="w-16 h-16 text-secondary animate-pulse" />;
    } else if (name.includes('movie') || name.includes('cinema') || name.includes('tickets')) {
      return <Film className="w-16 h-16 text-accent animate-spin" />;
    }
    
    // Default icon if no match
    return <Image className="w-16 h-16 text-muted-foreground" />;
  };

  // Function to get icon name for expense category (for alt text)
  const getExpenseIconName = (expenseName: string) => {
    const name = expenseName.toLowerCase();
    
    if (name.includes('dinner') || name.includes('food') || name.includes('zomato') || name.includes('restaurant')) {
      return 'Food Icon';
    } else if (name.includes('grocery') || name.includes('shopping') || name.includes('market')) {
      return 'Grocery Icon';
    } else if (name.includes('movie') || name.includes('cinema') || name.includes('tickets')) {
      return 'Movie Icon';
    }
    
    return 'Expense Icon';
  };

  // Sample data for receipts
  const receipts: Receipt[] = [
    {
      id: "1",
      expenseName: "Dinner at Zomato",
      amount: 1200,
      date: new Date().toISOString().split('T')[0], // Today's date
      imageUrl: "/receipts/dinner.jpg"
    },
    {
      id: "2",
      expenseName: "Grocery Shopping",
      amount: 2450,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
      imageUrl: "/receipts/grocery.jpg"
    },
    {
      id: "3",
      expenseName: "Movie Tickets",
      amount: 800,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
      imageUrl: "/receipts/movie.jpg"
    }
  ];

  // Sample data for locations
  const locations: Location[] = [
    {
      id: "1",
      expenseName: "Dinner at Zomato",
      location: "Delhi, India",
      coordinates: { lat: 28.6139, lng: 77.2090 },
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: "2",
      expenseName: "Grocery Shopping",
      location: "Mumbai, India",
      coordinates: { lat: 19.0760, lng: 72.8777 },
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: "3",
      expenseName: "Movie Tickets",
      location: "Bangalore, India",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden p-6">
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-display gradient-text">Enhanced UI/UX</h1>
            <p className="text-muted-foreground">Advanced features for better expense management</p>
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

        {/* Feature Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={activeTab === "receipts" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setActiveTab("receipts");
            }}
            className={`${activeTab === "receipts" ? "glass-strong" : "glass"} text-foreground`}
            onMouseEnter={() => playHover()}
          >
            <Image className="w-4 h-4 mr-2" />
            Receipt Storage
          </Button>
          <Button 
            variant={activeTab === "locations" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setActiveTab("locations");
            }}
            className={`${activeTab === "locations" ? "glass-strong" : "glass"} text-foreground`}
            onMouseEnter={() => playHover()}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Location Tracking
          </Button>
          <Button 
            variant={activeTab === "offline" ? "default" : "outline"} 
            onClick={() => {
              playClick();
              setActiveTab("offline");
            }}
            className={`${activeTab === "offline" ? "glass-strong" : "glass"} text-foreground`}
            onMouseEnter={() => playHover()}
          >
            <WifiOff className="w-4 h-4 mr-2" />
            Offline Mode
          </Button>
        </div>

        {/* Receipt Storage */}
        {activeTab === "receipts" && (
          <div className="space-y-6">
            <Card className="glass-strong p-6 hover-scale">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display gradient-text flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Expense Receipts
                </h2>
              </div>
              <p className="text-muted-foreground text-foreground mb-4">
                Store and manage receipts for all your expenses
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {receipts.map((receipt) => (
                  <Card 
                    key={receipt.id} 
                    className="glass p-4 hover-scale"
                    onClick={() => {
                      playClick();
                      setSelectedReceipt(receipt);
                    }}
                    onMouseEnter={() => playHover()}
                  >
                    <div className="aspect-video bg-secondary/20 rounded-lg mb-3 flex items-center justify-center">
                      {getExpenseIcon(receipt.expenseName)}
                    </div>
                    <div className="font-semibold text-foreground">{receipt.expenseName}</div>
                    <div className="text-sm text-muted-foreground">₹{receipt.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(receipt.date).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 glass text-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick();
                          setSelectedReceipt(receipt);
                        }}
                        onMouseEnter={() => playHover()}
                      >
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Location Tracking */}
        {activeTab === "locations" && (
          <div className="space-y-6">
            <Card className="glass-strong p-6 hover-scale">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display gradient-text flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Expense Locations
                </h2>
              </div>
              <p className="text-muted-foreground text-foreground mb-4">
                Track where your expenses occurred with integrated maps
              </p>
              
              <div className="bg-secondary/20 rounded-lg h-64 mb-4 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Static map background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                    {/* Simplified map representation */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGY0ZjgiLz48cGF0aCBkPSJNMjAgMjBoNjB2NjBIMjB6IiBmaWxsPSIjZGRlNmZmIi8+PHBhdGggZD0iTTMwIDMwaDQwdjQwSDMweiIgZmlsbD0iI2JiZGVlMCIvPjxwYXRoIGQ9Ik00MCA0MGgyMHYyMEg0MHoiIGZpbGw9IiNmZmNjMDAiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmYwMDAwIi8+PC9zdmc+')] opacity-30"></div>
                    
                    {/* Map markers for expense locations */}
                    <div className="absolute" style={{top: '30%', left: '40%'}}>
                      <div className="relative">
                        <MapPin className="w-6 h-6 text-red-500 drop-shadow-lg" />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                          Delhi: ₹1,200
                        </div>
                      </div>
                    </div>
                    <div className="absolute" style={{top: '60%', left: '30%'}}>
                      <div className="relative">
                        <MapPin className="w-6 h-6 text-blue-500 drop-shadow-lg" />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                          Mumbai: ₹2,450
                        </div>
                      </div>
                    </div>
                    <div className="absolute" style={{top: '50%', left: '60%'}}>
                      <div className="relative">
                        <MapPin className="w-6 h-6 text-green-500 drop-shadow-lg" />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                          Bangalore: ₹800
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Map controls */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <button className="w-8 h-8 bg-white/80 rounded flex items-center justify-center shadow hover:bg-white transition-colors">
                      <span className="text-lg font-bold text-gray-700">+</span>
                    </button>
                    <button className="w-8 h-8 bg-white/80 rounded flex items-center justify-center shadow hover:bg-white transition-colors">
                      <span className="text-lg font-bold text-gray-700">-</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {locations.map((location) => (
                  <div 
                    key={location.id} 
                    className="flex items-center gap-3 p-3 glass rounded cursor-pointer hover-scale"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                  >
                    <MapPin className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-semibold">{location.expenseName}</div>
                      <div className="text-sm text-muted-foreground">{location.location}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(location.date).toLocaleDateString()}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="glass"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                      }}
                      onMouseEnter={() => playHover()}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Offline Mode */}
        {activeTab === "offline" && (
          <div className="space-y-6">
            <Card className="glass-strong p-6 hover-scale">
              <div className="flex items-center gap-3 mb-4">
                <WifiOff className="w-8 h-8 text-primary" />
                <h2 className="text-xl font-display gradient-text">Offline Mode</h2>
              </div>
              <p className="text-muted-foreground text-foreground mb-4">
                Continue using SplitSync even without an internet connection. All data will sync automatically when you're back online.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 glass rounded flex items-center">
                  <img 
                    src={logo} 
                    alt="SplitSync Logo"
                    className="w-12 h-12 mr-4 opacity-50"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CloudOff className="w-5 h-5 text-accent" />
                      <span className="font-semibold">Offline Status</span>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-500">Offline Mode Active</Badge>
                  </div>
                </div>
                
                <div className="p-4 glass rounded flex items-center">
                  <img 
                    src={logo} 
                    alt="SplitSync Logo"
                    className="w-12 h-12 mr-4 opacity-50"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-secondary" />
                      <span className="font-semibold">Pending Sync</span>
                    </div>
                    <div className="text-2xl font-mono font-bold gradient-text">3</div>
                    <div className="text-sm text-muted-foreground">expenses to sync</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  className="glass-strong hover-scale text-foreground"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  Enable Offline Mode
                </Button>
                <Button 
                  variant="outline" 
                  className="glass text-foreground"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  Sync Now
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
      
      {/* Digital Receipt Modal */}
      {selectedReceipt && (
        <DigitalReceipt 
          receipt={selectedReceipt} 
          onClose={() => setSelectedReceipt(null)} 
        />
      )}
    </div>
  );
};