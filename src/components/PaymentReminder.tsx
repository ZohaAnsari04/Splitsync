import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, AlertTriangle, Zap } from "lucide-react";
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

  const memes = [
    {
      id: 1,
      text: "Bro, you still owe me money? 😅",
      image: "https://i.imgur.com/5XyNqXg.png"
    },
    {
      id: 2,
      text: "The bank account is crying 😭",
      image: "https://i.imgur.com/8ZJz7ZM.png"
    },
    {
      id: 3,
      text: "Interest is compounding... 😬",
      image: "https://i.imgur.com/9X9X9X9.png"
    }
  ];

  const randomMeme = memes[Math.floor(Math.random() * memes.length)];

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
                    className="w-full glass-strong hover-scale"
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

            <Card className="glass p-4 text-center">
              <img 
                src={randomMeme.image} 
                alt="Payment reminder meme" 
                className="w-32 h-32 mx-auto mb-3 rounded-lg"
                onError={(e) => {
                  // Fallback to a default emoji if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'text-4xl mb-3';
                  fallback.textContent = '💸';
                  e.currentTarget.parentNode?.insertBefore(fallback, e.currentTarget);
                }}
              />
              <p className="font-medium">{randomMeme.text}</p>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  playClick();
                  onDismiss();
                }}
                className="flex-1 glass"
                onMouseEnter={() => playHover()}
              >
                Later
              </Button>
              <Button
                onClick={() => {
                  playClick();
                  setShowPaymentScreen(true);
                }}
                className="flex-1 glass-strong hover-scale"
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