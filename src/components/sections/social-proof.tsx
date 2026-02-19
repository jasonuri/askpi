const clients = [
  { name: "Teleya Hospitality", href: "https://www.teleyahospitality.com/" },
  { name: "Slippery Saints", href: "https://slipperysaints.com/" },
  { name: "Run It Once", href: "https://www.runitonce.com/" },
  { name: "Handicaddie", href: "https://handicaddie.com/" },
];

export function SocialProof() {
  return (
    <section className="w-full px-4 py-12 border-y border-border">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-foreground/70 hover:text-foreground transition-colors"
            >
              {client.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
