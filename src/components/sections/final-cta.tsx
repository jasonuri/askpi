import { Button } from "@/components/ui/button";
import { CALENDAR_URL } from "@/lib/constants";

export function FinalCTA() {
  return (
    <section className="w-full px-4 py-24 md:py-32 bg-foreground">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-card">
          Stop guessing. Start knowing.
        </h2>
        <p className="text-lg text-card/70">
          Book a discovery call. We&apos;ll show you what your audience data is
          missing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-3 w-full sm:w-auto"
          >
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Discovery Call
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-3 border-card/30 text-card hover:bg-card/10 hover:text-card w-full sm:w-auto"
          >
            <a href="#top">Try the Free Analysis</a>
          </Button>
        </div>

        <p className="text-sm text-card/50">No commitment required.</p>
      </div>
    </section>
  );
}
