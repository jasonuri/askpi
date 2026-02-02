import { Check, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Pill } from "./Pill";

export function Comparison() {
  const comparisons = [
    {
      feature: "Cost per session",
      traditional: "$7,000-$20,000+",
      uri: "80% less",
      surveys: "$100-$1,000"
    },
    {
      feature: "Time to results",
      traditional: "Weeks-Months",
      uri: "Minutes",
      surveys: "Days-Weeks"
    },
    {
      feature: "Sample size",
      traditional: "6-12 people",
      uri: "Unlimited personas",
      surveys: "Limited responses"
    },
    {
      feature: "Geographic reach",
      traditional: "Local only",
      uri: "Global instantly",
      surveys: "Global"
    },
    {
      feature: "Scheduling required",
      traditional: "Yes",
      uri: "No (instant)",
      surveys: "Minimal"
    },
    {
      feature: "Follow-up questions",
      traditional: "Impossible",
      uri: "Unlimited",
      surveys: "None"
    },
    {
      feature: "Group dynamics bias",
      traditional: "High",
      uri: "Eliminated",
      surveys: "N/A"
    },
    {
      feature: "Iteration capability",
      traditional: "One-time only",
      uri: "Unlimited",
      surveys: "Limited"
    }
  ];

  return (
    <section className="w-full px-4 py-16 bg-[#2a2a2a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Pill>Compare</Pill>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Culture moves fast. Your research should too.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Traditional methods are too slow for today's audiences. Uri helps you stay ahead.
          </p>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-[#3a3a3a] rounded-xl border-2 border-white/20 shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 border-b-2 border-white/20">
              <div className="p-4 font-semibold text-foreground bg-[#2a2a2a] border-r-2 border-white/20">
                Feature
              </div>
              <div className="p-4 font-semibold bg-[#4a4a4a] border-r-2 border-white/20">
                <span className="text-foreground">Traditional Focus Groups</span>
              </div>
              <div className="p-4 font-semibold bg-primary border-r-2 border-white/20">
                <span className="text-black">Uri</span>
              </div>
              <div className="p-4 font-semibold text-foreground bg-[#4a4a4a]">
                <span className="text-foreground">Online Surveys</span>
              </div>
            </div>
            
            {/* Table Rows */}
            {comparisons.map((item, index) => (
              <div key={index} className="grid grid-cols-4 border-b border-white/20 last:border-b-0">
                <div className="p-4 font-medium text-foreground bg-[#2a2a2a] border-r-2 border-white/20">
                  {item.feature}
                </div>
                <div className="p-4 text-foreground border-r-2 border-white/20">
                  {item.traditional}
                </div>
                <div className="p-4 text-foreground font-medium bg-primary/10 flex items-center space-x-2 border-r-2 border-white/20">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{item.uri}</span>
                </div>
                <div className="p-4 text-foreground">
                  {item.surveys}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden grid grid-cols-1 gap-8">
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>
                <span>Traditional Focus Groups</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                  <span className="font-medium text-foreground">{item.feature}</span>
                  <span className="text-foreground text-sm">{item.traditional}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="border-2 border-primary/30 shadow-lg">
            <CardHeader>
              <CardTitle>
                <span>Uri AI Focus Groups</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                  <span className="font-medium text-foreground">{item.feature}</span>
                  <span className="text-foreground font-medium text-sm">{item.uri}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>
                <span>Online Surveys</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                  <span className="font-medium text-foreground">{item.feature}</span>
                  <span className="text-foreground text-sm">{item.surveys}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        

      </div>
    </section>
  );
}