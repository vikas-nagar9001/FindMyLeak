import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DeleteData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contact) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Request Submitted",
      description: "Your data deletion request has been received.",
    });

    setTimeout(() => {
      navigate("/success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <a href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            FindMyLeak
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex p-4 rounded-full bg-destructive/10 mb-4">
              <Trash2 className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Data Deletion Request</h1>
            <p className="text-lg text-muted-foreground">
              Request to have your personal information removed from our databases
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Email or Phone Number *</Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder="your@email.com or +1234567890"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Request (Optional)</Label>
                <Textarea
                  id="reason"
                  placeholder="Please explain why you're requesting data deletion..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border text-sm text-muted-foreground">
                <p className="mb-2">
                  <strong>Important:</strong> This request will be processed according to applicable data protection laws.
                </p>
                <p>
                  We may need to verify your identity before processing your request. 
                  You will receive a confirmation email within 48 hours.
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  Submit Request
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </div>
            </form>
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

export default DeleteData;
