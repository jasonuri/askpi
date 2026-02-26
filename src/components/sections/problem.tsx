export function Problem() {
  return (
    <section id="problem" className="w-full px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Left column — 60% editorial */}
          <div className="md:col-span-3 space-y-8">
            <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-tight text-foreground leading-snug">
              Every audience assumption you haven&apos;t validated compounds.
            </h2>

            <div className="space-y-3">
              <p className="text-lg text-muted-foreground">
                It&apos;s in the campaign that bombed and you can&apos;t explain why.
              </p>
              <p className="text-lg text-muted-foreground">
                The positioning your team loved but the market ignored.
              </p>
              <p className="text-lg text-muted-foreground">
                The pitch you lost because your insights sounded exactly like
                everyone else&apos;s.
              </p>
            </div>

            <p className="text-xl font-semibold text-foreground">
              You&apos;re not missing data. You&apos;re missing the reason people
              decide.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Decision velocity has increased tenfold. Insight speed hasn&apos;t.
              Traditional research takes weeks, costs thousands, and delivers
              demographics and stated preferences — not the psychological drivers
              behind actual decisions.
            </p>

            {/* Inline stats */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">3-4 weeks</p>
                <p className="text-sm text-muted-foreground">
                  minimum for persona research
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">&pound;10k+</p>
                <p className="text-sm text-muted-foreground">
                  for proper audience research
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">
                  Geography + salary
                </p>
                <p className="text-sm text-muted-foreground">
                  still the default segmentation
                  <br />
                  for a major broadcaster
                </p>
              </div>
            </div>
          </div>

          {/* Right column — 40% data viz placeholder */}
          <div className="md:col-span-2 flex items-center justify-center">
            <div className="w-full aspect-square max-w-sm rounded-2xl bg-muted/50 border border-border p-8 flex flex-col justify-between">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Decision speed vs insight speed
              </p>

              {/* Stylised gap chart placeholder */}
              <div className="flex-1 flex items-end gap-3 pt-8">
                {/* Decision speed — rising bars */}
                <div className="flex-1 flex items-end gap-1.5">
                  {[28, 40, 55, 68, 85, 96].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/80 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                {/* Insight speed — flat bars */}
                <div className="flex-1 flex items-end gap-1.5">
                  {[24, 26, 25, 27, 26, 28].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-muted-foreground/30 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary/80" />
                  Decision speed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  Insight speed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
