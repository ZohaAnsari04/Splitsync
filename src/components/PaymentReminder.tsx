import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  X, 
  AlertTriangle, 
  Zap, 
  Wallet, 
  CreditCard, 
  IndianRupee, 
  Timer, 
  Calendar, 
  User, 
  PiggyBank, 
  ShoppingCart, 
  Coffee, 
  Pizza, 
  Car, 
  Home, 
  Phone, 
  Gift, 
  Heart, 
  Star, 
  Moon, 
  Sun, 
  Cloud, 
  Umbrella, 
  Camera, 
  Music, 
  Gamepad, 
  Book, 
  Pen, 
  Scissors, 
  Hammer, 
  Key, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  ThumbsUp, 
  ThumbsDown, 
  Smile, 
  Frown, 
  Meh, 
  Flame, 
  Snowflake, 
  Wind, 
  Droplets, 
  Leaf, 
  Mountain, 
  Waves, 
  Flower, 
  Trees, 
  Cat, 
  Dog, 
  Bird, 
  Fish, 
  Bug,
  QrCode,
  Copy,
  Check,
  ArrowRight,
  Shield,
  Smartphone,
  Banknote,
  CreditCard as CreditCardIcon
} from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface PaymentReminderProps {
  id?: string;
  debtorName: string;
  creditorName: string;
  amount: number;
  dueDate?: Date;
  groupId?: string;
  expenseId?: string;
  status?: "pending" | "overdue" | "completed";
  onPayNow: () => void;
  onDismiss: () => void;
}

export const PaymentReminder = ({
  debtorName,
  creditorName,
  amount,
  onPayNow,
  onDismiss,
  dueDate,
  status = "pending"
}: PaymentReminderProps) => {
  const { playClick, playHover, playNotification } = useSound();
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(0);
  const [upiId, setUpiId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "qr" | "bank">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Play notification sound when component mounts
  useEffect(() => {
    playNotification();
    
    // Select a new random meme each time the component is shown
    setCurrentMeme(Math.floor(Math.random() * memes.length));
  }, []);

  // Expanded collection of 50 cute, animated memes with icons
  const memes = [
    { id: 1, text: "Bro, you still owe me money? 😅", icon: <Wallet className="w-16 h-16 text-primary animate-bounce" />, color: "from-purple-500 to-pink-500" },
    { id: 2, text: "The bank account is crying 😭", icon: <CreditCard className="w-16 h-16 text-blue-500 animate-pulse" />, color: "from-blue-500 to-cyan-500" },
    { id: 3, text: "Interest is compounding... 😬", icon: <IndianRupee className="w-16 h-16 text-green-500 animate-spin" />, color: "from-green-500 to-emerald-500" },
    { id: 4, text: "My wallet is feeling lonely without your money 💸", icon: <Wallet className="w-16 h-16 text-yellow-500 animate-bounce" />, color: "from-yellow-500 to-orange-500" },
    { id: 5, text: "Even the calendar is judging you 📅", icon: <Calendar className="w-16 h-16 text-red-500 animate-pulse" />, color: "from-red-500 to-pink-500" },
    { id: 6, text: "Time is money, friend! ⏰", icon: <Timer className="w-16 h-16 text-indigo-500 animate-spin" />, color: "from-indigo-500 to-purple-500" },
    { id: 7, text: "Don't be a payment ghost! 👻", icon: <Ghost className="w-16 h-16 text-purple-500 animate-bounce" />, color: "from-purple-500 to-indigo-500" },
    { id: 8, text: "Your debt is growing faster than bamboo! 🎋", icon: <Trees className="w-16 h-16 text-green-500 animate-pulse" />, color: "from-green-500 to-teal-500" },
    { id: 9, text: "Money doesn't grow on trees! 🌳", icon: <Leaf className="w-16 h-16 text-emerald-500 animate-spin" />, color: "from-emerald-500 to-green-500" },
    { id: 10, text: "Don't make me send the debt collectors! 🕵️", icon: <User className="w-16 h-16 text-amber-500 animate-bounce" />, color: "from-amber-500 to-yellow-500" },
    { id: 11, text: "Your IOU is getting old! 📜", icon: <Book className="w-16 h-16 text-rose-500 animate-pulse" />, color: "from-rose-500 to-pink-500" },
    { id: 12, text: "Even my piggy bank is disappointed 😔", icon: <PiggyBank className="w-16 h-16 text-pink-500 animate-spin" />, color: "from-pink-500 to-rose-500" },
    { id: 13, text: "Your debt is on fire! 🔥", icon: <Flame className="w-16 h-16 text-red-500 animate-pulse" />, color: "from-red-500 to-orange-500" },
    { id: 14, text: "Don't freeze me out! ❄️", icon: <Snowflake className="w-16 h-16 text-cyan-500 animate-spin" />, color: "from-cyan-500 to-blue-500" },
    { id: 15, text: "Cash flow is life flow! 💧", icon: <Droplets className="w-16 h-16 text-blue-500 animate-bounce" />, color: "from-blue-500 to-indigo-500" },
    { id: 16, text: "Blow away your debt like the wind! 💨", icon: <Wind className="w-16 h-16 text-teal-500 animate-pulse" />, color: "from-teal-500 to-cyan-500" },
    { id: 17, text: "Your debt is bugging me! 🐛", icon: <Bug className="w-16 h-16 text-lime-500 animate-bounce" />, color: "from-lime-500 to-green-500" },
    { id: 18, text: "Swim away from debt! 🐟", icon: <Fish className="w-16 h-16 text-cyan-500 animate-pulse" />, color: "from-cyan-500 to-teal-500" },
    { id: 19, text: "Fly away from financial stress! 🐦", icon: <Bird className="w-16 h-16 text-sky-500 animate-spin" />, color: "from-sky-500 to-blue-500" },
    { id: 20, text: "Paws and pay up! 🐾", icon: <Dog className="w-16 h-16 text-amber-500 animate-bounce" />, color: "from-amber-500 to-orange-500" },
    { id: 21, text: "Don't cat-egorize me as a debtor! 🐱", icon: <Cat className="w-16 h-16 text-violet-500 animate-pulse" />, color: "from-violet-500 to-purple-500" },
    { id: 22, text: "Make waves in payments! 🌊", icon: <Waves className="w-16 h-16 text-blue-500 animate-spin" />, color: "from-blue-500 to-cyan-500" },
    { id: 23, text: "Climb out of debt mountain! 🏔️", icon: <Mountain className="w-16 h-16 text-stone-500 animate-bounce" />, color: "from-stone-500 to-gray-500" },
    { id: 24, text: "Bloom into financial freedom! 🌻", icon: <Flower className="w-16 h-16 text-yellow-500 animate-pulse" />, color: "from-yellow-500 to-amber-500" },
    { id: 25, text: "Branch out to better finances! 🌳", icon: <Trees className="w-16 h-16 text-green-500 animate-spin" />, color: "from-green-500 to-emerald-500" },
    { id: 26, text: "Stop being a couch potato! 🛋️", icon: <Home className="w-16 h-16 text-rose-500 animate-spin" />, color: "from-rose-500 to-pink-500" },
    { id: 27, text: "Fuel your financial future! ⛽", icon: <Car className="w-16 h-16 text-blue-500 animate-bounce" />, color: "from-blue-500 to-indigo-500" },
    { id: 28, text: "Slice through debt like pizza! 🍕", icon: <Pizza className="w-16 h-16 text-red-500 animate-pulse" />, color: "from-red-500 to-orange-500" },
    { id: 29, text: "Wake up and pay up! ☕", icon: <Coffee className="w-16 h-16 text-amber-500 animate-spin" />, color: "from-amber-500 to-yellow-500" },
    { id: 30, text: "Shop smart, pay smart! 🛒", icon: <ShoppingCart className="w-16 h-16 text-green-500 animate-bounce" />, color: "from-green-500 to-emerald-500" },
    { id: 31, text: "Gift yourself financial freedom! 🎁", icon: <Gift className="w-16 h-16 text-pink-500 animate-pulse" />, color: "from-pink-500 to-rose-500" },
    { id: 32, text: "Love your financial health! ❤️", icon: <Heart className="w-16 h-16 text-red-500 animate-spin" />, color: "from-red-500 to-pink-500" },
    { id: 33, text: "Be a star payer! ⭐", icon: <Star className="w-16 h-16 text-yellow-500 animate-bounce" />, color: "from-yellow-500 to-amber-500" },
    { id: 34, text: "Shine bright with payments! 🌙", icon: <Moon className="w-16 h-16 text-indigo-500 animate-pulse" />, color: "from-indigo-500 to-purple-500" },
    { id: 35, text: "Rise with the sun of payments! ☀️", icon: <Sun className="w-16 h-16 text-yellow-500 animate-spin" />, color: "from-yellow-500 to-amber-500" },
    { id: 36, text: "Float above debt like a cloud! ☁️", icon: <Cloud className="w-16 h-16 text-sky-500 animate-bounce" />, color: "from-sky-500 to-blue-500" },
    { id: 37, text: "Stay dry from financial storms! ☂️", icon: <Umbrella className="w-16 h-16 text-blue-500 animate-pulse" />, color: "from-blue-500 to-indigo-500" },
    { id: 38, text: "Capture your financial freedom! 📸", icon: <Camera className="w-16 h-16 text-purple-500 animate-spin" />, color: "from-purple-500 to-violet-500" },
    { id: 39, text: "Rock your payments! 🎸", icon: <Music className="w-16 h-16 text-pink-500 animate-bounce" />, color: "from-pink-500 to-rose-500" },
    { id: 40, text: "Level up your finances! 🎮", icon: <Gamepad className="w-16 h-16 text-blue-500 animate-pulse" />, color: "from-blue-500 to-indigo-500" },
    { id: 41, text: "Write your success story! ✍️", icon: <Pen className="w-16 h-16 text-amber-500 animate-spin" />, color: "from-amber-500 to-yellow-500" },
    { id: 42, text: "Cut through debt! ✂️", icon: <Scissors className="w-16 h-16 text-pink-500 animate-bounce" />, color: "from-pink-500 to-rose-500" },
    { id: 43, text: "Build your financial fortress! 🔨", icon: <Hammer className="w-16 h-16 text-amber-500 animate-pulse" />, color: "from-amber-500 to-orange-500" },
    { id: 44, text: "Unlock financial freedom! 🔓", icon: <Unlock className="w-16 h-16 text-green-500 animate-spin" />, color: "from-green-500 to-emerald-500" },
    { id: 45, text: "Secure your future! 🔒", icon: <Lock className="w-16 h-16 text-gray-500 animate-bounce" />, color: "from-gray-500 to-stone-500" },
    { id: 46, text: "Keep an eye on your finances! 👁️", icon: <Eye className="w-16 h-16 text-blue-500 animate-pulse" />, color: "from-blue-500 to-indigo-500" },
    { id: 47, text: "Thumbs up to payments! 👍", icon: <ThumbsUp className="w-16 h-16 text-green-500 animate-spin" />, color: "from-green-500 to-emerald-500" },
    { id: 48, text: "Don't give a thumbs down to payments! 👎", icon: <ThumbsDown className="w-16 h-16 text-red-500 animate-bounce" />, color: "from-red-500 to-orange-500" },
    { id: 49, text: "Smile with financial freedom! 😊", icon: <Smile className="w-16 h-16 text-yellow-500 animate-pulse" />, color: "from-yellow-500 to-amber-500" },
    { id: 50, text: "Don't frown over payments! 😟", icon: <Frown className="w-16 h-16 text-gray-500 animate-spin" />, color: "from-gray-500 to-stone-500" }
  ];

  const randomMeme = memes[currentMeme];

  const handlePayNow = () => {
    playClick();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Close the modal after success
      setTimeout(() => {
        onPayNow();
      }, 2000);
    }, 3000);
  };

  const copyToClipboard = () => {
    playClick();
    setCopied(true);
    navigator.clipboard.writeText("alice@upi");
    setTimeout(() => setCopied(false), 2000);
  };

  if (showPaymentScreen) {
    if (paymentSuccess) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <Card className="glass-strong max-w-md w-full relative border-2 border-primary/30">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-display gradient-text">Payment Successful!</h2>
                <p className="text-muted-foreground">₹{amount.toLocaleString()} paid to {creditorName}</p>
              </div>
              
              <div className="glass p-4 rounded-lg text-center">
                <p className="font-semibold mb-2">Transaction ID</p>
                <p className="font-mono text-sm">TXN-{Date.now().toString().slice(-8)}</p>
                <p className="text-xs text-muted-foreground mt-2">Amount will be reflected in your account shortly</p>
              </div>
              
              <Button 
                className="w-full glass-strong hover-scale text-foreground font-display mt-6"
                onClick={() => onPayNow()}
              >
                Continue
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <Card className="glass-strong max-w-md w-full relative border-2 border-primary/30">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              playClick();
              setShowPaymentScreen(false);
            }}
            className="absolute top-4 right-4 z-10 glass"
            onMouseEnter={() => playHover()}
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display gradient-text">Pay Now</h2>
              <p className="text-muted-foreground">Secure UPI Payment</p>
            </div>

            <div className="space-y-6">
              <div className="glass p-4 rounded-lg text-center">
                <p className="text-lg font-semibold mb-2">
                  {debtorName} owes {creditorName}
                </p>
                <p className="text-3xl font-bold gradient-text">₹{amount.toLocaleString()}</p>
              </div>

              {/* Payment Method Selection */}
              <div className="glass p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={paymentMethod === "upi" ? "default" : "outline"}
                    className={`flex flex-col items-center justify-center h-20 ${paymentMethod === "upi" ? "glass-strong" : "glass"}`}
                    onClick={() => {
                      playClick();
                      setPaymentMethod("upi");
                    }}
                  >
                    <Smartphone className="w-6 h-6 mb-1" />
                    <span className="text-xs">UPI ID</span>
                  </Button>
                  <Button 
                    variant={paymentMethod === "qr" ? "default" : "outline"}
                    className={`flex flex-col items-center justify-center h-20 ${paymentMethod === "qr" ? "glass-strong" : "glass"}`}
                    onClick={() => {
                      playClick();
                      setPaymentMethod("qr");
                    }}
                  >
                    <QrCode className="w-6 h-6 mb-1" />
                    <span className="text-xs">QR Scan</span>
                  </Button>
                  <Button 
                    variant={paymentMethod === "bank" ? "default" : "outline"}
                    className={`flex flex-col items-center justify-center h-20 ${paymentMethod === "bank" ? "glass-strong" : "glass"}`}
                    onClick={() => {
                      playClick();
                      setPaymentMethod("bank");
                    }}
                  >
                    <Banknote className="w-6 h-6 mb-1" />
                    <span className="text-xs">Bank</span>
                  </Button>
                </div>
              </div>

              {/* UPI ID Input */}
              {paymentMethod === "upi" && (
                <div className="glass p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Pay with UPI ID</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Recipient's UPI ID</label>
                      <div className="flex gap-2">
                        <Input 
                          value="alice@upi"
                          readOnly
                          className="flex-1 glass"
                        />
                        <Button 
                          size="icon"
                          variant="outline"
                          className="glass"
                          onClick={copyToClipboard}
                        >
                          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Your UPI ID</label>
                      <Input 
                        placeholder="you@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="glass"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Secured with AES-256 encryption</span>
                    </div>
                  </div>
                </div>
              )}

              {/* QR Code */}
              {paymentMethod === "qr" && (
                <div className="glass p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Scan QR Code</h3>
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-4 gap-1 w-48 h-48">
                        {[...Array(16)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-6 h-6 rounded-sm ${
                              Math.random() > 0.5 ? "bg-black" : "bg-white"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Scan this QR code with any UPI app</p>
                    <Button 
                      variant="outline" 
                      className="glass"
                      onClick={() => {
                        playClick();
                        alert("In a real app, this would open your camera to scan the QR code");
                      }}
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Open Camera
                    </Button>
                  </div>
                </div>
              )}

              {/* Bank Transfer */}
              {paymentMethod === "bank" && (
                <div className="glass p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Bank Transfer</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 glass rounded">
                      <CreditCardIcon className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">HDFC Bank</p>
                        <p className="text-sm text-muted-foreground">**** 4832</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 glass rounded">
                      <Banknote className="w-8 h-8 text-secondary" />
                      <div>
                        <p className="font-medium">ICICI Bank</p>
                        <p className="text-sm text-muted-foreground">**** 7291</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full glass"
                      onClick={() => {
                        playClick();
                        alert("In a real app, this would open your banking app");
                      }}
                    >
                      Add New Account
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full glass-strong hover-scale text-foreground font-display py-6 text-lg"
                  onClick={handlePayNow}
                  disabled={isProcessing || (paymentMethod === "upi" && !upiId)}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Pay ₹{amount.toLocaleString()}
                    </div>
                  )}
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="glass hover-scale"
                    onClick={() => {
                      playClick();
                      setShowPaymentScreen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="outline" 
                    className="glass hover-scale"
                    onClick={() => playClick()}
                  >
                    Pay Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <Card className="glass-strong max-w-md w-full relative border-2 border-primary/30">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            playClick();
            onDismiss();
          }}
          className="absolute top-4 right-4 z-10 glass"
          onMouseEnter={() => playHover()}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="p-6">
          <div className="text-center mb-4">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h2 className="text-2xl font-display gradient-text">Payment Reminder</h2>
          </div>

          <div className="space-y-4">
            <div className="glass p-4 rounded-lg text-center">
              <p className="text-lg font-semibold mb-2">
                {debtorName} owes {creditorName}
              </p>
              <p className="text-3xl font-bold gradient-text">₹{amount.toLocaleString()}</p>
            </div>

            <Card className="glass p-6 text-center">
              <div className={`w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 border-2 border-white/30`}>
                {randomMeme.icon}
              </div>
              <p className="font-medium text-lg">{randomMeme.text}</p>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  playClick();
                  onDismiss();
                }}
                className="flex-1 glass py-6 text-lg font-display"
                onMouseEnter={() => playHover()}
              >
                Later
              </Button>
              <Button
                onClick={() => {
                  playClick();
                  setShowPaymentScreen(true);
                }}
                className="flex-1 glass-strong hover-scale py-6 text-lg font-display text-foreground"
                onMouseEnter={() => playHover()}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Define the Ghost component since it's not in lucide-react
const Ghost = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4c-3.866 0-7 3.134-7 7 0 1.5.5 2.906 1.344 4.063l-.781 3.438 3.438-.781A6.958 6.958 0 0012 18c3.866 0 7-3.134 7-7s-3.134-7-7-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M16 10h.01M12 14a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);