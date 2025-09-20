import { Github, Twitter, Linkedin, Mail, Leaf, Wind } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [binaryCode, setBinaryCode] = useState<string[]>([]);

  useEffect(() => {
    // Generate random binary code animation
    const generateBinary = () => {
      const codes = [];
      for (let i = 0; i < 20; i++) {
        codes.push(Math.random().toString(2).substring(2, 10));
      }
      return codes;
    };

    const interval = setInterval(() => {
      setBinaryCode(generateBinary());
    }, 1500);

    setBinaryCode(generateBinary());
    return () => clearInterval(interval);
  }, []);

  const turbines = Array.from({ length: 5 }, (_, i) => i);

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Animated Wind Turbines with Binary Code */}
        <div className="relative mb-8 py-8">
          <div className="flex justify-center items-center space-x-8 mb-6">
            {turbines.map((_, index) => (
              <div key={index} className="relative">
                <Wind 
                  className={`w-8 h-8 text-accent wind-turbine`}
                  style={{
                    animationDelay: `${index * 0.5}s`,
                    animationDuration: `${3 + index * 0.5}s`
                  }}
                />
                
                {/* Binary code emission */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <div className="flex flex-col items-center space-y-1">
                    {binaryCode.slice(index * 4, (index + 1) * 4).map((code, codeIndex) => (
                      <span
                        key={`${index}-${codeIndex}`}
                        className="text-xs binary-code"
                        style={{
                          animationDelay: `${(index * 0.5) + (codeIndex * 0.3)}s`
                        }}
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Leaf className="w-4 h-4 text-accent animate-glow" />
              <span className="text-sm text-muted-foreground">
                Powered by Renewable Energy & Blockchain Technology
              </span>
              <Leaf className="w-4 h-4 text-accent animate-glow" />
            </div>
            <p className="text-xs text-muted-foreground">
              Real-time emissions data encrypted and verified on-chain
            </p>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Carbon Derivatives
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Leading the future of transparent carbon trading through encrypted, 
              blockchain-based derivatives markets.
            </p>
            <div className="flex items-center space-x-2 text-xs text-accent">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>24/7 Global Markets</span>
            </div>
          </div>

          {/* Markets */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Markets</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-accent cursor-pointer transition-colors">EU ETS Futures</li>
              <li className="hover:text-accent cursor-pointer transition-colors">US Carbon Credits</li>
              <li className="hover:text-accent cursor-pointer transition-colors">CORSIA Compliance</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Voluntary Markets</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Nature-Based Solutions</li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Technology</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-accent cursor-pointer transition-colors">Zero-Knowledge Proofs</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Encrypted Order Matching</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Smart Contracts</li>
              <li className="hover:text-accent cursor-pointer transition-colors">MRV Integration</li>
              <li className="hover:text-accent cursor-pointer transition-colors">API Documentation</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-accent cursor-pointer transition-colors">Trading Guide</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Market Data</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Regulatory Updates</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Support Center</li>
              <li className="hover:text-accent cursor-pointer transition-colors">White Paper</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <p className="text-xs text-muted-foreground">
              © 2024 Confidential Green Derivatives. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-muted-foreground">Carbon Neutral Platform</span>
              <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Github className="w-4 h-4 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
              <Linkedin className="w-4 h-4 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
              <Mail className="w-4 h-4 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
            </div>
            
            <div className="h-4 w-px bg-border"></div>
            
            <div className="text-xs text-muted-foreground">
              Regulated by: <span className="text-accent">CFTC • SEC • ESMA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;