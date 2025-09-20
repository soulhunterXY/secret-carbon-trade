import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Globe, Activity, Shield, Zap, Users, Target } from "lucide-react";

const Analytics = () => {
  const marketMetrics = [
    { title: "Market Efficiency", value: "94.7%", change: "+2.1%", icon: Target },
    { title: "Liquidity Index", value: "87.3", change: "+5.2%", icon: Activity },
    { title: "Price Discovery", value: "0.23ms", change: "-15.7%", icon: Zap },
    { title: "Market Participants", value: "2,847", change: "+8.9%", icon: Users },
  ];

  const regionalData = [
    { region: "Europe (EU ETS)", volume: "€1.2B", share: "43%", growth: "+12.5%" },
    { region: "North America (RGGI)", volume: "€520M", share: "18%", growth: "+8.3%" },
    { region: "California", volume: "€430M", share: "15%", growth: "+15.7%" },
    { region: "UK ETS", volume: "€380M", share: "14%", growth: "+6.2%" },
    { region: "Other Markets", volume: "€270M", share: "10%", growth: "+22.1%" },
  ];

  const encryptionMetrics = [
    { metric: "Orders Encrypted", value: "100%", status: "Secure" },
    { metric: "Average Encryption Time", value: "12ms", status: "Fast" },
    { metric: "Front-running Prevention", value: "99.8%", status: "Effective" },
    { metric: "Privacy Score", value: "A+", status: "Excellent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Market Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into carbon derivatives markets and trading patterns</p>
        </div>

        {/* Key Metrics */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card key={index} className="trading-card p-6">
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className="w-6 h-6 text-accent carbon-glow" />
                    <Badge variant="outline" className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</h3>
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Analytics Tabs */}
        <section>
          <Tabs defaultValue="market" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="market">Market Analysis</TabsTrigger>
              <TabsTrigger value="regional">Regional Data</TabsTrigger>
              <TabsTrigger value="encryption">Encryption Stats</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="market" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="trading-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Market Depth Analysis</h3>
                  <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted/20">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Order book depth visualization</p>
                      <p className="text-sm text-muted-foreground">Real-time bid/ask analysis</p>
                    </div>
                  </div>
                </Card>

                <Card className="trading-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Volume Distribution</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">EU Carbon Futures</span>
                      <span className="font-medium text-foreground">€1.2B (43%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "43%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">RGGI Allowances</span>
                      <span className="font-medium text-foreground">€520M (18%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "18%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">California Cap</span>
                      <span className="font-medium text-foreground">€430M (15%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="regional" className="mt-6">
              <Card className="trading-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Regional Market Breakdown</h3>
                  <div className="space-y-4">
                    {regionalData.map((region, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
                        <div className="flex items-center space-x-4">
                          <Globe className="w-5 h-5 text-accent" />
                          <div>
                            <h4 className="font-medium text-foreground">{region.region}</h4>
                            <p className="text-sm text-muted-foreground">Market share: {region.share}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{region.volume}</p>
                          <p className="text-sm text-accent">{region.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="encryption" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="trading-card p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-accent carbon-glow" />
                    <h3 className="text-lg font-semibold text-foreground">Encryption Performance</h3>
                  </div>
                  <div className="space-y-4">
                    {encryptionMetrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{metric.value}</span>
                          <Badge variant="outline" className="text-xs">
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="trading-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Security Metrics</h3>
                  <div className="h-48 flex items-center justify-center border border-border rounded-lg bg-muted/20">
                    <div className="text-center">
                      <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Security analytics dashboard</p>
                      <p className="text-sm text-muted-foreground">Real-time encryption monitoring</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="mt-6">
              <Card className="trading-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Market Trends & Predictions</h3>
                <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Trend analysis coming soon</p>
                    <p className="text-sm text-muted-foreground">AI-powered market predictions and insights</p>
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

export default Analytics;