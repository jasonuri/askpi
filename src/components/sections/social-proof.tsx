const namedClients = [
  { name: "Handicaddie", href: "https://handicaddie.com/" },
  { name: "Run It Once", href: "https://www.runitonce.com/" },
  { name: "Teleya Hospitality", href: "https://www.teleyahospitality.com/" },
  { name: "Slippery Saints", href: "https://slipperysaints.com/" },
];

const ndaClients = [
  "Major UK Broadcaster",
  "Global Production Company",
];

export function SocialProof() {
  return (
    <section className="w-full px-4 py-12 border-y border-border bg-card">
      <div className="max-w-5xl mx-auto">
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
          Trusted by Founders, Growth Leads, Consultants and Directors of
          Strategy and Insights in Consumer Challenger Brands, SportsTech,
          Hospitality, Broadcasters and Media.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-6">
          {namedClients.map((client) => (
            <a
              key={client.name}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif font-normal text-foreground/70 hover:text-foreground transition-colors"
            >
              {client.name}
            </a>
          ))}

          {ndaClients.map((label) => (
            <span
              key={label}
              className="text-xs font-medium text-muted-foreground backdrop-blur-sm bg-muted/60 rounded-full px-3 py-1.5"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
