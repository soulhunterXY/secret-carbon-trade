import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Wallet, BarChart3, Activity, DollarSign } from "lucide-react";

const Portfolio = () => {
  const positions = [
    { 
      contract: "EU Carbon Dec 2024", 
      quantity: 500, 
      avgPrice: "€87.20", 
      currentPrice: "€89.45", 
      pnl: "+€1,125", 
      pnlPercent: "+2.58%",
      trend: "up"
    },
    { 
      contract: "RGGI Q4 2024", 
      quantity: 200, 
      avgPrice: "$14.20", 
      currentPrice: "$13.87", 
      pnl: "-$66", 
      pnlPercent: "-2.32%",
      trend: "down"
    },
    { 
      contract: "CA Cap Trade", 
      quantity: 300, 
      avgPrice: "$27.80", 
      currentPrice: "$28.32", 
      pnl: "+$156", 
      pnlPercent: "+1.87%",
      trend: "up"
    }
  ];

  const transactions = [
    { type: "Buy", contract: "EU Carbon Dec 2024", quantity: 100, price: "€89.45", time: "14:32:15", status: "Filled" },
    { type: "Sell", contract: "RGGI Q4 2024", quantity: 50, price: "$13.87", time: "14:28:42", status: "Filled" },
    { type: "Buy", contract: "CA Cap Trade", quantity: 150, price: "$28.32", time: "14:15:33", status: "Pending" },
    { type: "Sell", contract: "EU Carbon Dec 2024", quantity: 75, price: "€89.20", time: "14:02:18", status: "Filled" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Management</h1>
          <p className="text-muted-foreground">Track your carbon derivative positions and performance</p>
        </div>

        {/* Portfolio Summary */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="trading-card p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Wallet className="w-6 h-6 text-accent carbon-glow" />
                <h3 className="font-semibold text-foreground">Total Value</h3>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">€127,450</div>
              <div className="text-sm text-accent">+5.7% today</div>
            </Card>

            <Card className="trading-card p-6">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="w-6 h-6 text-accent carbon-glow" />
                <h3 className="font-semibold text-foreground">Total P&L</h3>
              </div>
              <div className="text-2xl font-bold text-accent mb-1">+€1,215</div>
              <div className="text-sm text-muted-foreground">+0.96% overall</div>
            </Card>

            <Card className="trading-card p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Activity className="w-6 h-6 text-accent carbon-glow" />
                <h3 className="font-semibold text-foreground">Open Positions</h3>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">3</div>
              <div className="text-sm text-muted-foreground">Active contracts</div>
            </Card>

            <Card className="trading-card p-6">
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className="w-6 h-6 text-accent carbon-glow" />
                <h3 className="font-semibold text-foreground">Available Cash</h3>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">€25,340</div>
              <div className="text-sm text-muted-foreground">Ready to trade</div>
            </Card>
          </div>
        </section>

        {/* Portfolio Tabs */}
        <section>
          <Tabs defaultValue="positions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="positions">Positions</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="positions" className="mt-6">
              <Card className="trading-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Open Positions</h3>
                  <div className="space-y-4">
                    {positions.map((position, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{position.contract}</h4>
                          <p className="text-sm text-muted-foreground">Quantity: {position.quantity} contracts</p>
                        </div>
                        <div className="text-right mr-6">
                          <p className="text-sm text-muted-foreground">Avg: {position.avgPrice}</p>
                          <p className="font-medium text-foreground">Current: {position.currentPrice}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${position.trend === "up" ? "text-accent" : "text-destructive"}`}>
                            {position.pnl}
                          </p>
                          <p className={`text-sm ${position.trend === "up" ? "text-accent" : "text-destructive"}`}>
                            {position.pnlPercent}
                          </p>
                        </div>
                        <div className="ml-4">
                          {position.trend === "up" ? (
                            <TrendingUp className="w-5 h-5 text-accent" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="mt-6">
              <Card className="trading-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {transactions.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
                        <div className="flex items-center space-x-4">
                          <Badge variant={transaction.type === "Buy" ? "default" : "outline"}>
                            {transaction.type}
                          </Badge>
                          <div>
                            <p className="font-medium text-foreground">{transaction.contract}</p>
                            <p className="text-sm text-muted-foreground">{transaction.quantity} contracts</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{transaction.price}</p>
                          <p className="text-sm text-muted-foreground">{transaction.time}</p>
                        </div>
                        <Badge variant={transaction.status === "Filled" ? "default" : "outline"} className="ml-4">
                          {transaction.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <Card className="trading-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Performance Analytics</h3>
                <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Performance chart coming soon</p>
                    <p className="text-sm text-muted-foreground">Track your trading performance over time</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;