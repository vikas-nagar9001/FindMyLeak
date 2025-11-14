import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Shield, Search, Lock, AlertTriangle } from "lucide-react";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/scan?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Hero Section */}
      <main className="relative">
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Protecting Your Digital Identity</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              FindMyLeak
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              Check if your email or phone number has been exposed in data breaches
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-20">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <div className="relative flex gap-2 bg-card p-2 rounded-lg border border-primary/20">
                  <Input
                    type="text"
                    placeholder="Enter email or phone number..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1 bg-background border-none focus-visible:ring-0 text-foreground"
                  />
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Search className="h-4 w-4 mr-2" />
                    Scan Now
                  </Button>
                </div>
              </div>
            </form>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Comprehensive Database</h3>
                <p className="text-muted-foreground">
                  Search across millions of leaked records from major data breaches
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-destructive/10 hover:border-destructive/30 transition-all duration-300 group">
                <div className="inline-flex p-3 rounded-lg bg-destructive/10 mb-4 group-hover:bg-destructive/20 transition-colors">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Instant Alerts</h3>
                <p className="text-muted-foreground">
                  Get immediate notifications if your data appears in new breaches
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-success/10 hover:border-success/30 transition-all duration-300 group">
                <div className="inline-flex p-3 rounded-lg bg-success/10 mb-4 group-hover:bg-success/20 transition-colors">
                  <Lock className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Privacy First</h3>
                <p className="text-muted-foreground">
                  Your searches are encrypted and never stored in our systems
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative border-t border-border/50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2025 FindMyLeak. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="/about" className="hover:text-primary transition-colors">About</a>
                <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
                <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
                <a href="/delete-data" className="hover:text-primary transition-colors">Delete Data</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
