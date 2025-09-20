import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, Globe, Factory, TreePine } from "lucide-react";

const CarbonEmissionsChart = () => {
  const emissionData = [
    { region: "Europe", current: 2.8, target: 2.2, trend: -8.5, status: "improving" },
    { region: "North America", current: 4.2, target: 3.5, trend: -5.2, status: "improving" },
    { region: "Asia Pacific", current: 6.7, target: 5.8, trend: +2.1, status: "concerning" },
    { region: "Global Average", current: 4.1, target: 3.4, trend: -3.8, status: "improving" },
  ];

  const sectors = [
    { name: "Energy", emissions: 35.2, change: -4.2, icon: Factory },
    { name: "Transportation", emissions: 24.8, change: -1.8, icon: Globe },
    { name: "Industry", emissions: 18.5, change: +0.9, icon: Factory },
    { name: "Agriculture", emissions: 12.1, change: -2.1, icon: TreePine },
  ];

  return (
    <div className="space-y-6">
      {/* Regional Emissions Overview */}
      <Card className="trading-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Global Carbon Emissions</h3>
            <p className="text-sm text-muted-foreground">CO₂ Equivalent (Gt) - Real-time monitoring</p>
          </div>
          <Badge className="bg-accent text-accent-foreground">
            <BarChart3 className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emissionData.map((data, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground">{data.region}</h4>
                <div className={`flex items-center ${data.status === 'improving' ? 'text-accent' : 'text-destructive'}`}>
                  {data.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="text-xs ml-1">{Math.abs(data.trend)}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current:</span>
                  <span className="font-mono font-semibold text-foreground">{data.current}Gt</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="font-mono text-accent">{data.target}Gt</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full ${data.status === 'improving' ? 'bg-accent' : 'bg-destructive'}`}
                    style={{ width: `${(data.target / data.current) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sector Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="trading-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Emissions by Sector</h3>
            <Globe className="w-5 h-5 text-accent" />
          </div>
          
          <div className="space-y-4">
            {sectors.map((sector, index) => {
              const IconComponent = sector.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-accent" />
                    <span className="font-medium text-foreground">{sector.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-foreground">{sector.emissions}%</span>
                    <div className={`flex items-center ${sector.change > 0 ? 'text-destructive' : 'text-accent'}`}>
                      {sector.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="text-xs ml-1">{Math.abs(sector.change)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Live Chart Visualization */}
        <Card className="trading-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Live Emissions Chart</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-accent">LIVE</span>
            </div>
          </div>
          
          {/* Simplified chart representation */}
          <div className="relative h-48 bg-trading-chart rounded-lg border border-border trading-grid p-4">
            <div className="absolute inset-4">
              {/* Chart lines simulation */}
              <svg className="w-full h-full" viewBox="0 0 300 120">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                
                {/* Main trend line */}
                <path
                  d="M 0,80 Q 75,60 150,65 T 300,45"
                  stroke="hsl(var(--accent))"
                  strokeWidth="2"
                  fill="none"
                  className="carbon-glow"
                />
                
                {/* Area under curve */}
                <path
                  d="M 0,80 Q 75,60 150,65 T 300,45 L 300,120 L 0,120 Z"
                  fill="url(#chartGradient)"
                />
                
                {/* Data points */}
                {[
                  { x: 0, y: 80 },
                  { x: 75, y: 60 },
                  { x: 150, y: 65 },
                  { x: 225, y: 50 },
                  { x: 300, y: 45 }
                ].map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="hsl(var(--accent))"
                    className="animate-pulse-glow"
                  />
                ))}
              </svg>
            </div>
            
            {/* Chart labels */}
            <div className="absolute bottom-2 left-4 text-xs text-muted-foreground">
              Jan 2024
            </div>
            <div className="absolute bottom-2 right-4 text-xs text-muted-foreground">
              Dec 2024
            </div>
            <div className="absolute top-2 right-4 text-xs text-accent font-semibold">
              -12.5% YTD
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CarbonEmissionsChart;