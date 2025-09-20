import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import TradingDashboard from "@/components/trading/trading-dashboard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";

const Markets = () => {
  const marketData = [
    { name: "EU Carbon Futures", price: "€89.45", change: "+2.3%", trend: "up" },
    { name: "RGGI Allowances", price: "$13.87", change: "-0.8%", trend: "down" },
    { name: "California Cap", price: "$28.32", change: "+1.2%", trend: "up" },
    { name: "UK Carbon Credits", price: "£75.90", change: "+3.1%", trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Carbon Markets</h1>
          <p className="text-muted-foreground">Real-time carbon futures and derivatives trading</p>
        </div>

        {/* Market Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketData.map((market, index) => (
              <Card key={index} className="trading-card p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {market.name}
                  </Badge>
                  {market.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-accent" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {market.price}
                </div>
                <div className={`text-sm ${market.trend === "up" ? "text-accent" : "text-destructive"}`}>
                  {market.change}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Market Statistics */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="trading-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-accent carbon-glow" />
                <h3 className="text-lg font-semibold text-foreground">Daily Volume</h3>
              </div>
              <div className="text-3xl font-bold text-accent mb-2">€2.8B</div>
              <div className="text-sm text-muted-foreground">+15.3% from yesterday</div>
            </Card>

            <Card className="trading-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-accent carbon-glow" />
                <h3 className="text-lg font-semibold text-foreground">Active Contracts</h3>
              </div>
              <div className="text-3xl font-bold text-accent mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Encrypted orders</div>
            </Card>

            <Card className="trading-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-accent carbon-glow" />
                <h3 className="text-lg font-semibold text-foreground">Market Cap</h3>
              </div>
              <div className="text-3xl font-bold text-accent mb-2">€45.2B</div>
              <div className="text-sm text-muted-foreground">Global carbon markets</div>
            </Card>
          </div>
        </section>

        {/* Trading Interface */}
        <section>
          <TradingDashboard />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Markets;