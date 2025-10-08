import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Printer, Share2, X } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface Receipt {
  id: string;
  expenseName: string;
  amount: number;
  date: string;
  imageUrl: string;
}

interface DigitalReceiptProps {
  receipt: Receipt;
  onClose: () => void;
}

export const DigitalReceipt = ({ receipt, onClose }: DigitalReceiptProps) => {
  const { playClick, playHover } = useSound();
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    playClick();
    setIsPrinting(true);
    // In a real app, this would trigger the browser's print dialog
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const handleDownload = () => {
    playClick();
    // In a real app, this would download the receipt as PDF or image
    alert("Receipt downloaded successfully!");
  };

  const handleShare = () => {
    playClick();
    // In a real app, this would share the receipt via system sharing
    alert("Receipt shared successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <Card className="glass-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border-2 border-primary/30">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 glass"
          onMouseEnter={() => playHover()}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Receipt header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display gradient-text">Digital Receipt</h2>
              <p className="text-muted-foreground">Expense details and payment information</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text">₹{receipt.amount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(receipt.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Receipt content */}
        <div className="p-6">
          {/* Merchant info */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {receipt.expenseName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{receipt.expenseName}</h3>
                <p className="text-muted-foreground">SplitSync Verified Merchant</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-mono">TXN-{receipt.id}-{Math.floor(Math.random() * 10000)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p>Credit Card •••• 4832</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p>
                  {receipt.expenseName.includes("Dinner") || receipt.expenseName.includes("Food") 
                    ? "Food & Dining" 
                    : receipt.expenseName.includes("Grocery") 
                    ? "Shopping" 
                    : "Entertainment"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-green-500">Completed</p>
              </div>
            </div>
          </div>

          {/* Expense breakdown */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Expense Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{receipt.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{(receipt.amount * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>₹{(receipt.amount * 0.02).toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="gradient-text">₹{receipt.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Split details */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Split Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>You</span>
                <span className="font-semibold">₹{(receipt.amount * 0.4).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Alice</span>
                <span className="font-semibold">₹{(receipt.amount * 0.3).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bob</span>
                <span className="font-semibold">₹{(receipt.amount * 0.3).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* QR Code placeholder */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 bg-secondary/20 rounded-lg flex items-center justify-center mb-3">
              <div className="grid grid-cols-4 gap-1">
                {[...Array(16)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-sm ${
                      Math.random() > 0.5 ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Scan to verify receipt</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-6 border-t border-border flex flex-wrap gap-3">
          <Button
            onClick={handlePrint}
            className="flex-1 glass-strong hover-scale text-foreground"
            onMouseEnter={() => playHover()}
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="flex-1 glass hover-scale"
            onMouseEnter={() => playHover()}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1 glass hover-scale"
            onMouseEnter={() => playHover()}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {isPrinting && (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-800 dark:text-gray-200">Preparing receipt for printing...</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};