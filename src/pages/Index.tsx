import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Lock, TrendingUp, Globe, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-accent text-accent-foreground">
              <Shield className="w-3 h-3 mr-1" />
              End-to-End Encryption
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary-glow to-accent bg-clip-text text-transparent">
              The Future of Carbon Trading
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Trade carbon derivatives with confidence through our encrypted order matching system. 
              Reduce market manipulation while contributing to a sustainable future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground carbon-glow" asChild>
                <Link to="/markets">
                  Start Trading
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/charts">View Analytics</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="trading-card p-6 text-center">
                <Lock className="w-8 h-8 text-accent mx-auto mb-3 carbon-glow" />
                <h3 className="font-semibold text-foreground mb-2">Encrypted Orders</h3>
                <p className="text-sm text-muted-foreground">
                  Orders remain encrypted until matched, preventing front-running and manipulation
                </p>
              </Card>
              
              <Card className="trading-card p-6 text-center">
                <Globe className="w-8 h-8 text-accent mx-auto mb-3 carbon-glow" />
                <h3 className="font-semibold text-foreground mb-2">Global Markets</h3>
                <p className="text-sm text-muted-foreground">
                  Access carbon markets worldwide with real-time pricing and deep liquidity
                </p>
              </Card>
              
              <Card className="trading-card p-6 text-center">
                <BarChart3 className="w-8 h-8 text-accent mx-auto mb-3 carbon-glow" />
                <h3 className="font-semibold text-foreground mb-2">Live Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time emissions data and market analytics for informed trading decisions
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Market Statistics */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">€2.8B</div>
              <div className="text-sm text-muted-foreground">Daily Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">45M</div>
              <div className="text-sm text-muted-foreground">Tons CO₂e</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent mr-1" />
                <div className="text-3xl font-bold text-accent mb-1">12.5%</div>
              </div>
              <div className="text-sm text-muted-foreground">Market Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Trading Hours</div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Platform Features</h2>
            <p className="text-muted-foreground">Explore our comprehensive trading and analytics suite</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="trading-card p-6 group hover:scale-105 transition-transform">
              <BarChart3 className="w-8 h-8 text-accent mx-auto mb-4 carbon-glow" />
              <h3 className="font-semibold text-foreground mb-2 text-center">Live Markets</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Real-time carbon futures trading with encrypted order matching
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/markets">Explore Markets</Link>
              </Button>
            </Card>
            
            <Card className="trading-card p-6 group hover:scale-105 transition-transform">
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-4 carbon-glow" />
              <h3 className="font-semibold text-foreground mb-2 text-center">Advanced Charts</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Professional trading charts with market indicators and analytics
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/charts">View Charts</Link>
              </Button>
            </Card>
            
            <Card className="trading-card p-6 group hover:scale-105 transition-transform">
              <Shield className="w-8 h-8 text-accent mx-auto mb-4 carbon-glow" />
              <h3 className="font-semibold text-foreground mb-2 text-center">Portfolio</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Track positions, P&L, and manage your carbon derivatives portfolio
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/portfolio">Manage Portfolio</Link>
              </Button>
            </Card>
            
            <Card className="trading-card p-6 group hover:scale-105 transition-transform">
              <Globe className="w-8 h-8 text-accent mx-auto mb-4 carbon-glow" />
              <h3 className="font-semibold text-foreground mb-2 text-center">Analytics</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Deep market insights, trends, and predictive analytics
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/analytics">View Analytics</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
