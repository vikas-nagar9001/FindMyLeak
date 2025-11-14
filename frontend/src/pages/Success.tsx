import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto p-12 text-center bg-success/10 border-success/30 animate-fade-in">
          <div className="inline-flex p-6 rounded-full bg-success/20 mb-6 animate-pulse-glow">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            Request Submitted!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Your data deletion request has been successfully submitted. 
            We'll process it within 48 hours and send you a confirmation email.
          </p>

          <Button 
            onClick={() => navigate("/")} 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Return to Home
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Success;
