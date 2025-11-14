import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

const Privacy = () => {
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
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4 text-foreground">Privacy Policy & Terms</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Privacy Policy</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Information We Collect</h3>
                  <p className="leading-relaxed">
                    FindMyLeak is designed with privacy as a core principle. We do NOT collect, store, or log 
                    the email addresses or phone numbers you search for. Your searches are processed in real-time 
                    and are not recorded. We may collect minimal anonymous analytics data to improve our service, 
                    but this does not include any personally identifiable information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">How We Use Data</h3>
                  <p className="leading-relaxed">
                    The breach data in our database comes from publicly disclosed security incidents. This information 
                    is used solely to help you determine if your data has been compromised. We do not sell, share, 
                    rent, or distribute this information to third parties. We do not use your search queries for 
                    marketing, advertising, or any other commercial purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Data Security</h3>
                  <p className="leading-relaxed">
                    All communications with our service are encrypted using industry-standard SSL/TLS protocols. 
                    Our servers are secured and regularly monitored. We implement appropriate technical and 
                    organizational measures to protect the breach data we maintain, though we cannot guarantee 
                    absolute security as no internet transmission is completely secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Your Rights</h3>
                  <p className="leading-relaxed">
                    You have the right to request the removal of your information from our breach database. 
                    Please note that removing your data from our service does not remove it from the original 
                    breached databases - you will need to contact those companies directly. To request data 
                    deletion from our service, use our Data Deletion Request form.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Cookies and Tracking</h3>
                  <p className="leading-relaxed">
                    We use minimal cookies only for essential functionality. We do not use tracking cookies, 
                    advertising cookies, or third-party analytics that could identify you personally. 
                    You can disable cookies in your browser settings, though some features may not work properly.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Terms of Service</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Service Description</h3>
                  <p className="leading-relaxed">
                    FindMyLeak is a free service that allows you to check if your email address or phone number 
                    has been exposed in known data breaches. This service is provided "as is" without warranties 
                    of any kind, either express or implied.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Acceptable Use</h3>
                  <p className="leading-relaxed">
                    You agree to use this service only for lawful purposes and in accordance with these terms. 
                    You may not use this service to: access or attempt to access accounts that don't belong to you, 
                    conduct automated searches or scraping, attempt to circumvent security measures, or use the 
                    service in any way that could damage or impair its functionality.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Disclaimer</h3>
                  <p className="leading-relaxed">
                    While we strive to provide accurate and up-to-date information, we cannot guarantee the 
                    completeness or accuracy of our breach database. The absence of results does not guarantee 
                    that your data has never been breached. We are not responsible for any damages or losses 
                    that may result from using or relying on this service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Changes to Terms</h3>
                  <p className="leading-relaxed">
                    We reserve the right to modify these terms and privacy policy at any time. Changes will be 
                    effective immediately upon posting. Your continued use of the service after changes are posted 
                    constitutes acceptance of the modified terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Contact</h3>
                  <p className="leading-relaxed">
                    If you have questions about these terms or our privacy practices, please use our 
                    Data Deletion Request form or visit our FAQ page for more information.
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
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
