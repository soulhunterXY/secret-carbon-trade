import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import CarbonEmissionsChart from "@/components/charts/carbon-emissions-chart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, Activity } from "lucide-react";

const Charts = () => {
  const timeFrames = ["1H", "4H", "1D", "1W", "1M", "1Y"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Market Analytics</h1>
          <p className="text-muted-foreground">Advanced charts and data visualization for carbon markets</p>
        </div>

        {/* Chart Controls */}
        <section className="mb-8">
          <Card className="trading-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Badge className="bg-accent text-accent-foreground">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Live Data
                </Badge>
                <div className="flex space-x-2">
                  {timeFrames.map((timeFrame) => (
                    <Button
                      key={timeFrame}
                      variant={timeFrame === "1D" ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      {timeFrame}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <LineChart className="w-4 h-4 mr-2" />
                  Line Chart
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Candlestick
                </Button>
                <Button variant="outline" size="sm">
                  <PieChart className="w-4 h-4 mr-2" />
                  Volume
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Main Chart */}
        <section className="mb-8">
          <CarbonEmissionsChart />
        </section>

        {/* Additional Charts */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="trading-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Price Distribution</h3>
                <Activity className="w-5 h-5 text-accent carbon-glow" />
              </div>
              <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted/20">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Price distribution chart</p>
                  <p className="text-sm text-muted-foreground">Real-time market data visualization</p>
                </div>
              </div>
            </Card>

            <Card className="trading-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Volume Analysis</h3>
                <LineChart className="w-5 h-5 text-accent carbon-glow" />
              </div>
              <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted/20">
                <div className="text-center">
                  <LineChart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Volume trend analysis</p>
                  <p className="text-sm text-muted-foreground">Trading volume patterns and insights</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Market Indicators */}
        <section>
          <Card className="trading-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Market Indicators</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">RSI</div>
                <div className="text-sm text-muted-foreground">Relative Strength</div>
                <div className="text-lg font-semibold text-foreground">67.3</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">MACD</div>
                <div className="text-sm text-muted-foreground">Moving Average</div>
                <div className="text-lg font-semibold text-foreground">+2.14</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">BB</div>
                <div className="text-sm text-muted-foreground">Bollinger Bands</div>
                <div className="text-lg font-semibold text-foreground">±3.8%</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">VOL</div>
                <div className="text-sm text-muted-foreground">Volatility</div>
                <div className="text-lg font-semibold text-foreground">12.7%</div>
              </div>
            </div>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Charts;