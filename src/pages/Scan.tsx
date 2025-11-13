import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Scan = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!query) {
      navigate("/");
      return;
    }

    let interval: NodeJS.Timeout;
    
    const fetchData = async () => {
      try {
        // Start progress animation
        interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) return 90; // Stop at 90% until API responds
            return prev + 3;
          });
        }, 100);

        // Call the API
        const response = await fetch("https://leakosintapi.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: "2025554973:eM70XV22",
            request: query,
          }),
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        
        // Complete progress
        setProgress(100);
        clearInterval(interval);
        
        // Store results and navigate
        sessionStorage.setItem("leakResults", JSON.stringify(data));
        setTimeout(() => {
          navigate(`/results?query=${encodeURIComponent(query)}`);
        }, 500);
      } catch (error) {
        console.error("Error fetching leak data:", error);
        clearInterval(interval);
        // Navigate anyway to show error state
        sessionStorage.setItem("leakResults", JSON.stringify({ error: true }));
        setTimeout(() => {
          navigate(`/results?query=${encodeURIComponent(query)}`);
        }, 500);
      }
    };

    fetchData();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [query, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated cyber grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      
      {/* Scanning beam effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-scan" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-primary/20 bg-primary/5 mb-6 animate-pulse-glow">
            <div className="w-16 h-16 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Scanning Database
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Searching for: <span className="text-primary font-mono">{query}</span>
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-3 bg-muted rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-pulse-glow transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{progress}% Complete</p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="animate-pulse">🔍 Checking breach databases...</p>
          <p className="animate-pulse" style={{ animationDelay: "0.2s" }}>🔐 Analyzing encrypted records...</p>
          <p className="animate-pulse" style={{ animationDelay: "0.4s" }}>📊 Compiling results...</p>
        </div>
      </div>
    </div>
  );
};

export default Scan;
