import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const Custom404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Glitch background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50" />
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-destructive mx-auto mb-4 animate-pulse" />
          <h1 className="text-8xl md:text-9xl font-bold mb-4 text-foreground animate-glitch">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Page Not Found
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90"
          >
            Go Home
          </Button>
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
