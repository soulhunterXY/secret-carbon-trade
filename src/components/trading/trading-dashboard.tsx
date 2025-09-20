import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Lock, Eye, BarChart3, Activity } from "lucide-react";
import { useState } from "react";
import { useCarbonTrading } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { toast } from "sonner";

const TradingDashboard = () => {
  const [orderAmount, setOrderAmount] = useState("");
  const [orderPrice, setOrderPrice] = useState("");
  const [selectedContract, setSelectedContract] = useState("EU-CER-24Q4");
  const [isLoading, setIsLoading] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { createOrder } = useCarbonTrading();

  const handlePlaceOrder = async (orderType: 'buy' | 'sell') => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!orderAmount || !orderPrice) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const hash = await createOrder(
        selectedContract,
        parseFloat(orderAmount),
        parseFloat(orderPrice),
        orderType === 'buy' ? 0 : 1
      );
      
      toast.success(`Order placed successfully! Transaction: ${hash}`);
      setOrderAmount("");
      setOrderPrice("");
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const carbonContracts = [
    { 
      name: "EU-CER-24Q4", 
      price: "€85.42", 
      change: "+2.34%", 
      volume: "1.2M", 
      isUp: true,
      encrypted: true 
    },
    { 
      name: "US-CCO-25Q1", 
      price: "$92.18", 
      change: "-1.87%", 
      volume: "890K", 
      isUp: false,
      encrypted: true 
    },
    { 
      name: "ASIA-CTO-24Q4", 
      price: "¥12,450", 
      change: "+5.67%", 
      volume: "2.1M", 
      isUp: true,
      encrypted: false 
    },
    { 
      name: "GLOBAL-VER", 
      price: "$78.95", 
      change: "+0.92%", 
      volume: "654K", 
      isUp: true,
      encrypted: true 
    },
  ];

  const recentTrades = [
    { time: "14:32:01", contract: "EU-CER-24Q4", side: "BUY", amount: "100", price: "€85.40", status: "MATCHED" },
    { time: "14:31:45", contract: "US-CCO-25Q1", side: "SELL", amount: "250", price: "$92.20", status: "PENDING" },
    { time: "14:31:12", contract: "ASIA-CTO-24Q4", side: "BUY", amount: "50", price: "¥12,440", status: "MATCHED" },
    { time: "14:30:58", contract: "GLOBAL-VER", side: "SELL", amount: "180", price: "$78.90", status: "ENCRYPTED" },
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {carbonContracts.map((contract, index) => (
          <Card key={index} className="trading-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{contract.name}</h3>
                {contract.encrypted && (
                  <Lock className="w-3 h-3 text-accent" />
                )}
              </div>
              <Badge 
                variant={contract.isUp ? "default" : "destructive"}
                className={contract.isUp ? "bg-accent text-accent-foreground" : ""}
              >
                {contract.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {contract.change}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${contract.isUp ? 'price-up' : 'price-down'}`}>
                {contract.price}
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-between">
                <span>Volume: {contract.volume}</span>
                <Activity className="w-3 h-3" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Entry */}
        <Card className="trading-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Place Order</h3>
            <Badge className="bg-muted text-muted-foreground">
              <Lock className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Contract</label>
              <select 
                className="w-full p-3 bg-input border border-border rounded-lg text-foreground"
                value={selectedContract}
                onChange={(e) => setSelectedContract(e.target.value)}
              >
                <option>EU-CER-24Q4</option>
                <option>US-CCO-25Q1</option>
                <option>ASIA-CTO-24Q4</option>
                <option>GLOBAL-VER</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
                <Input 
                  placeholder="100"
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Price</label>
                <Input 
                  placeholder="€85.42"
                  value={orderPrice}
                  onChange={(e) => setOrderPrice(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => handlePlaceOrder('buy')}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "BUY"}
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handlePlaceOrder('sell')}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "SELL"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Order Book */}
        <Card className="trading-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Order Book</h3>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <Badge variant="outline" className="border-accent text-accent">
                EU-CER-24Q4
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground font-semibold pb-2 border-b border-border">
              <span>Price</span>
              <span>Size</span>
              <span>Total</span>
            </div>
            
            {/* Sell Orders */}
            <div className="space-y-1">
              {[
                ["€86.50", "150", "€12,975"],
                ["€86.25", "200", "€17,250"],
                ["€86.00", "300", "€25,800"],
                ["€85.90", "100", "€8,590"],
              ].map(([price, size, total], index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-xs text-destructive hover:bg-muted/50 p-1 rounded">
                  <span className="font-mono">{price}</span>
                  <span className="font-mono">{size}</span>
                  <span className="font-mono">{total}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center py-2 text-sm font-semibold text-accent border-y border-border">
              €85.42 SPREAD €0.08
            </div>
            
            {/* Buy Orders */}
            <div className="space-y-1">
              {[
                ["€85.34", "250", "€21,335"],
                ["€85.20", "180", "€15,336"],
                ["€85.10", "320", "€27,232"],
                ["€85.00", "400", "€34,000"],
              ].map(([price, size, total], index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-xs text-accent hover:bg-muted/50 p-1 rounded">
                  <span className="font-mono">{price}</span>
                  <span className="font-mono">{size}</span>
                  <span className="font-mono">{total}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Trades */}
        <Card className="trading-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Trades</h3>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground font-semibold pb-2 border-b border-border">
              <span>Time</span>
              <span>Side</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            
            {recentTrades.map((trade, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 text-xs hover:bg-muted/50 p-2 rounded">
                <span className="font-mono text-muted-foreground">{trade.time}</span>
                <span className={`font-semibold ${trade.side === 'BUY' ? 'text-accent' : 'text-destructive'}`}>
                  {trade.side}
                </span>
                <span className="font-mono text-foreground">{trade.amount}</span>
                <Badge 
                  variant={trade.status === 'MATCHED' ? 'default' : trade.status === 'ENCRYPTED' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {trade.status === 'ENCRYPTED' && <Lock className="w-2 h-2 mr-1" />}
                  {trade.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TradingDashboard;