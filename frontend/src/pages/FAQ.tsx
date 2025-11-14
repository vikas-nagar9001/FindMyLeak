import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is a data breach?",
      answer: "A data breach occurs when unauthorized parties gain access to sensitive, confidential, or protected information. This can include personal data like emails, passwords, phone numbers, addresses, and financial information. Breaches can happen through hacking, malware, phishing attacks, or insider threats."
    },
    {
      question: "How does FindMyLeak get its data?",
      answer: "We collect information from publicly disclosed data breaches, security research, and verified breach notifications. We do not hack or illegally access private databases. All our data comes from legitimate sources that have been publicly reported and verified by security researchers."
    },
    {
      question: "Is my search private and secure?",
      answer: "Yes, absolutely. We use encryption for all searches and do not log or store your queries. Your searches are completely anonymous, and we never collect personal information from users. Our service is designed with privacy as the top priority."
    },
    {
      question: "What should I do if my data was found in a breach?",
      answer: "If your information appears in our database, you should immediately: 1) Change your password on the affected service and any other accounts where you used the same password, 2) Enable two-factor authentication where available, 3) Monitor your accounts for suspicious activity, 4) Consider using a password manager to create and store unique passwords, 5) Be alert for phishing attempts that may use your leaked information."
    },
    {
      question: "How often is your database updated?",
      answer: "We continuously monitor for new data breaches and update our database regularly. Major breaches are typically added within 24-48 hours of public disclosure. We also review historical breaches to ensure our database remains comprehensive and accurate."
    },
    {
      question: "Can you remove my data from breached databases?",
      answer: "Unfortunately, we cannot remove your data from the original breached databases, as we don't control those systems. However, we can remove your information from our service if you submit a data deletion request. For actual data removal from compromised services, you'll need to contact those companies directly."
    },
    {
      question: "Is this service really free?",
      answer: "Yes, FindMyLeak is completely free to use. We believe everyone has the right to know if their data has been compromised. There are no hidden fees, subscriptions, or premium tiers. Our mission is to help protect people's digital security, not to profit from their concerns."
    },
    {
      question: "Why didn't you find any breaches for my email?",
      answer: "If no breaches were found, it could mean: 1) Your email hasn't been compromised in any known breaches, 2) The breach hasn't been publicly disclosed yet, 3) Your email wasn't included in the specific records we have access to. Not finding breaches is good news, but remember to maintain good security practices regardless."
    }
  ];

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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4 text-foreground">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about data breaches and FindMyLeak
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <div className="mt-12 text-center">
            <Card className="p-8 bg-primary/5 border-primary/20">
              <h2 className="text-2xl font-bold mb-3 text-foreground">Still have questions?</h2>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Check out our About page or 
                search for information about specific data breaches.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a 
                  href="/about" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Learn More About Us
                </a>
                <span className="text-muted-foreground">•</span>
                <a 
                  href="/" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Search for Breaches
                </a>
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
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
