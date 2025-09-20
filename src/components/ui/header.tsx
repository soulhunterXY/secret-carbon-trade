import { Button } from "@/components/ui/button";
import { Shield, Leaf } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import carbonLogo from "@/assets/carbon-trading-logo.png";

const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={carbonLogo} 
                alt="Carbon Trading Logo" 
                className="w-12 h-12 carbon-glow"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Confidential Green Derivatives
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Encrypted Carbon Futures Trading
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className={`text-foreground hover:text-accent ${location.pathname === "/markets" ? "text-accent" : ""}`}
              asChild
            >
              <Link to="/markets">Markets</Link>
            </Button>
            <Button 
              variant="ghost" 
              className={`text-foreground hover:text-accent ${location.pathname === "/charts" ? "text-accent" : ""}`}
              asChild
            >
              <Link to="/charts">Charts</Link>
            </Button>
            <Button 
              variant="ghost" 
              className={`text-foreground hover:text-accent ${location.pathname === "/portfolio" ? "text-accent" : ""}`}
              asChild
            >
              <Link to="/portfolio">Portfolio</Link>
            </Button>
            <Button 
              variant="ghost" 
              className={`text-foreground hover:text-accent ${location.pathname === "/analytics" ? "text-accent" : ""}`}
              asChild
            >
              <Link to="/analytics">Analytics</Link>
            </Button>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            <ConnectButton />
            
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Leaf className="w-3 h-3 text-accent" />
              <span>Carbon Neutral</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;