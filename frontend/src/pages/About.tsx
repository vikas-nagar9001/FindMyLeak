import { Card } from "@/components/ui/card";
import { Shield, Database, Lock, Users } from "lucide-react";

const About = () => {
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 text-foreground">About FindMyLeak</h1>
            <p className="text-xl text-muted-foreground">
              Protecting your digital identity, one search at a time
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-foreground">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    FindMyLeak was created to help individuals discover if their personal information 
                    has been compromised in data breaches. In today's digital age, data breaches are 
                    becoming increasingly common, affecting millions of people worldwide. Our mission 
                    is to provide a free, easy-to-use service that empowers people to take control 
                    of their digital security.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur">
              <div className="flex items-start gap-4 mb-4">
                <Database className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-foreground">How It Works</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our service scans millions of records from publicly disclosed data breaches. 
                    When you search for your email or phone number, we check our comprehensive database 
                    to see if your information appears in any known breaches.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>We aggregate data from verified breach sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>All searches are encrypted and anonymous</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Results show which breaches exposed your data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>We provide actionable steps to protect yourself</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur">
              <div className="flex items-start gap-4 mb-4">
                <Lock className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-foreground">Privacy & Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We take privacy seriously. Your searches are never logged or stored. We use 
                    end-to-end encryption to ensure your queries remain private. We don't collect 
                    personal information, and we don't share your data with third parties. 
                    Our service exists solely to help you protect your digital identity.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur">
              <div className="flex items-start gap-4 mb-4">
                <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-foreground">Community Impact</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Since our launch, we've helped thousands of individuals discover and respond to 
                    data breaches. By raising awareness and providing free access to breach information, 
                    we're contributing to a safer internet for everyone. Join our community of 
                    security-conscious users who are taking control of their digital presence.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 FindMyLeak. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
