import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, AlertTriangle, Zap, Wallet, CreditCard, IndianRupee, Timer, Calendar, User } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface PaymentReminderProps {
  debtorName: string;
  creditorName: string;
  amount: number;
  onPayNow: () => void;
  onDismiss: () => void;
}

export const PaymentReminder = ({ 
  debtorName, 
  creditorName, 
  amount, 
  onPayNow, 
  onDismiss 
}: PaymentReminderProps) => {
  const { playClick, playHover } = useSound();
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(0);

  const memes = [
    {
      id: 1,
      text: "Bro, you still owe me money? 😅",
      icon: <Wallet className="w-16 h-16 text-primary" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      text: "The bank account is crying 😭",
      icon: <CreditCard className="w-16 h-16 text-blue-500" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      text: "Interest is compounding... 😬",
      icon: <IndianRupee className="w-16 h-16 text-green-500" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      text: "My wallet is feeling lonely without your money 💸",
      icon: <Wallet className="w-16 h-16 text-yellow-500" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      text: "Even the calendar is judging you 📅",
      icon: <Calendar className="w-16 h-16 text-red-500" />,
      color: "from-red-500 to-pink-500"
    }
  ];

  // Select a new random meme each time the component is shown
  useEffect(() => {
    setCurrentMeme(Math.floor(Math.random() * memes.length));
  }, []);

  const randomMeme = memes[currentMeme];

  if (showPaymentScreen) {
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

              <div className="space-y-4">
                <div className="glass p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">UPI Payment</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-500 font-bold">BH</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">BHIM UPI</p>
                      <p className="text-sm text-muted-foreground">Instant Transfer</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full glass-strong hover-scale text-foreground font-display py-6 text-lg"
                    onClick={() => {
                      playClick();
                      // In a real app, this would initiate UPI payment
                      alert("UPI payment initiated! Redirecting to your UPI app...");
                      onPayNow();
                    }}
                    onMouseEnter={() => playHover()}
                  >
                    Pay with UPI
                  </Button>
                </div>

                <div className="glass p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Other Options</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="glass hover-scale"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                    >
                      Pay Later
                    </Button>
                    <Button 
                      variant="outline" 
                      className="glass hover-scale"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                    >
                      Partial Pay
                    </Button>
                  </div>
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
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${randomMeme.color} flex items-center justify-center mx-auto mb-4`}>
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