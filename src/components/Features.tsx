import { Clock, Users, MessageCircle, Target, FileText, Image } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function Features() {
  const features = [
    {
      icon: Target,
      title: "Actionable Insights",
      description: "Uri pulls out real audience reactions, themes, and reasons from your conversations - insights you can use the same day."
    },
    {
      icon: FileText,
      title: "Conversation Transcripts",
      description: "Every interaction is saved. Revisit insights anytime to pull quotes, patterns, and deeper insights."
    },
    {
      icon: Image,
      title: "Creative Testing (Text & Imagery)",
      description: "Upload your ads, content, or messaging. Let your AI audience vote, comment, and explain which version resonates most - and why."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Get feedback instantly, any time of day. No more waiting weeks for results or juggling schedules."
    },
    {
      icon: Users,
      title: "Scalable Audiences",
      description: "Generate up to 50 personas tailored to your target audience - diverse, authentic, and ready to test."
    },
    {
      icon: MessageCircle,
      title: "Real Conversations",
      description: "Go beyond surveys. Have natural back-and-forth chats to uncover the \"why\" behind reactions."
    }
  ];

  return (
    <section id="features" className="w-full px-4 py-16 bg-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why Choose Uri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uri brings your audience to life - making consumer insights faster, cheaper, and always within reach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-black shadow-md hover:shadow-lg transition-all bg-background hover:shadow-[0_0_0_4px_rgba(0,0,0,0.1)]">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}