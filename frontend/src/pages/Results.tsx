import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertTriangle, CheckCircle, ChevronDown, Search, Database, ShieldAlert } from "lucide-react";

interface BreachData {
  name: string;
  description: string;
  dataTypes: string[];
  numResults: number;
  data: any[];
}

interface LeakResponse {
  List?: Record<string, {
    InfoLeak: string;
    NumOfResults: number;
    Data: any[];
  }>;
  NumOfDatabase?: number;
  NumOfResults?: number;
  error?: boolean;
}

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query");
  const [searchValue, setSearchValue] = useState(query || "");
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [breaches, setBreaches] = useState<BreachData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Get results from sessionStorage
    const storedResults = sessionStorage.getItem("leakResults");
    if (storedResults) {
      try {
        const data: LeakResponse = JSON.parse(storedResults);
        
        if (data.error) {
          setError(true);
          setLoading(false);
          return;
        }

        if (data.List) {
          // Transform API data to breach format
          const transformedBreaches: BreachData[] = Object.entries(data.List).map(([name, breach]) => {
            // Collect all unique field names from all data entries in this breach
            const allFields = new Set<string>();
            breach.Data.forEach(entry => {
              Object.keys(entry).forEach(key => {
                // Exclude common metadata/timestamp fields that aren't "compromised data"
                if (!['RegDate', 'LastActive', 'CreatedAt', 'UpdatedAt', 'Timestamp'].includes(key)) {
                  allFields.add(key);
                }
              });
            });
            
            const dataTypes = Array.from(allFields).sort();

            return {
              name,
              description: breach.InfoLeak,
              dataTypes,
              numResults: breach.NumOfResults,
              data: breach.Data,
            };
          });
          
          setBreaches(transformedBreaches);
        }
      } catch (e) {
        console.error("Error parsing results:", e);
        setError(true);
      } finally {
        setLoading(false);
        // Clean up sessionStorage
        sessionStorage.removeItem("leakResults");
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleNewSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/scan?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const toggleCard = (id: number) => {
    setExpandedCards(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (!query) {
    navigate("/");
    return null;
  }

  const breachCount = breaches.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-primary/20 bg-primary/5 mb-4 animate-pulse-glow">
            <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md mx-4 bg-destructive/10 border-destructive/30">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-foreground">Error Loading Results</h2>
            <p className="text-muted-foreground mb-4">
              We encountered an error while checking the database. Please try again.
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              Return Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              FindMyLeak
            </a>
            <form onSubmit={handleNewSearch} className="flex-1 max-w-2xl">
              <div className="relative flex gap-2">
                <Input
                  type="text"
                  placeholder="Search again..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 bg-background"
                />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Summary Section */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
          <Card className={`p-8 ${breachCount > 0 ? 'bg-destructive/10 border-destructive/30' : 'bg-success/10 border-success/30'}`}>
            <div className="flex items-start gap-4">
              {breachCount > 0 ? (
                <AlertTriangle className="h-12 w-12 text-destructive flex-shrink-0" />
              ) : (
                <CheckCircle className="h-12 w-12 text-success flex-shrink-0" />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2 text-foreground">
                  {breachCount > 0 ? `${breachCount} Breaches Found` : "No Breaches Found"}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  Results for: <span className="text-foreground font-mono">{query}</span>
                </p>
                {breachCount > 0 && (
                  <p className="text-muted-foreground">
                    Your information was found in {breachCount} data breach{breachCount > 1 ? 'es' : ''}. 
                    Review the details below and consider changing your passwords.
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Breach Cards */}
        {breachCount > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            {breaches.map((breach, index) => (
              <Collapsible
                key={index}
                open={expandedCards.includes(index)}
                onOpenChange={() => toggleCard(index)}
              >
                <Card className="overflow-hidden border-destructive/20 hover:border-destructive/40 transition-all">
                  <CollapsibleTrigger className="w-full">
                    <div className="p-6 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4 flex-1 text-left">
                        <ShieldAlert className="h-8 w-8 text-destructive flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {breach.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Database className="h-3 w-3" />
                              {breach.numResults} record{breach.numResults > 1 ? 's' : ''} found
                            </span>
                            <Badge variant="destructive">
                              DATA BREACH
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`h-5 w-5 text-muted-foreground transition-transform ${
                          expandedCards.includes(index) ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-6 border-t border-border/50 pt-4">
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{breach.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Compromised Data Types:</h4>
                        <div className="flex flex-wrap gap-2">
                          {breach.dataTypes.map((type) => (
                            <Badge key={type} variant="secondary">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Your Leaked Data:</h4>
                        <div className="space-y-3">
                          {breach.data.map((record, recordIndex) => (
                            <Card key={recordIndex} className="p-4 bg-destructive/5 border-destructive/20">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                {Object.entries(record).map(([key, value]) => {
                                  // Skip metadata fields
                                  if (['RegDate', 'LastActive', 'CreatedAt', 'UpdatedAt', 'Timestamp'].includes(key)) {
                                    return null;
                                  }
                                  return (
                                    <div key={key} className="flex flex-col">
                                      <span className="text-muted-foreground text-xs uppercase tracking-wide mb-1">
                                        {key}
                                      </span>
                                      <span className="text-foreground font-mono text-sm break-all">
                                        {String(value)}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <Card className="p-8 bg-card/50 backdrop-blur">
            <h2 className="text-2xl font-bold mb-4 text-foreground">What Should I Do?</h2>
            <p className="text-muted-foreground mb-6">
              If your data was found, take immediate action to secure your accounts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => navigate("/delete-data")} variant="outline">
                Request Data Deletion
              </Button>
              <Button onClick={() => navigate("/")} variant="outline">
                Search Again
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 FindMyLeak. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Results;
