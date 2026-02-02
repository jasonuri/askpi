import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getAllPosts } from "../data/blogPosts";
import { Calendar, Clock } from "lucide-react";

export function Blog() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog - Uri | Gen Z Consumer Insights & Market Research</title>
        <meta
          name="description"
          content="Expert insights on Gen Z consumer behavior, market research trends, and AI-powered audience intelligence. Learn how to connect authentically with the next generation."
        />
        <meta property="og:title" content="Blog - Uri | Gen Z Consumer Insights & Market Research" />
        <meta
          property="og:description"
          content="Expert insights on Gen Z consumer behavior, market research trends, and AI-powered audience intelligence."
        />
        <meta property="og:image" content="https://www.hellouri.ai/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Uri Blog - Gen Z Consumer Insights" />
        <meta property="og:url" content="https://www.hellouri.ai/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Uri" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hellouri_ai" />
        <meta name="twitter:creator" content="@hellouri_ai" />
        <link rel="canonical" href="https://www.hellouri.ai/blog" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Uri Blog",
            "description": "Expert insights on Gen Z consumer behavior and market research",
            "url": "https://www.hellouri.ai/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Uri",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.hellouri.ai/favicon.png"
              }
            },
            "blogPost": posts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.date,
              "author": {
                "@type": "Person",
                "name": post.author.name
              },
              "url": `https://www.hellouri.ai/blog/${post.slug}`
            }))
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="w-full px-4 py-12 md:py-24 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4 text-[12px] md:text-[14px] font-bold">
            INSIGHTS & PERSPECTIVES
          </p>
          <h1 className="mb-4 md:mb-6 md:text-[57px] font-bold leading-tight font-[Instrument_Serif] text-[64px]">
            Uri <span className="text-primary">Blog</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Expert insights on Gen Z consumer behavior, market research trends, and building authentic brand connections.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full px-4 py-8 md:py-16 bg-[#2a2a2a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-background/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                {/* Optional Image Placeholder */}
                {post.image && (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <img
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                {!post.image && (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-primary/40 text-6xl font-bold">Uri</span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-foreground font-[Instrument_Serif] text-2xl mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Author */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-foreground text-sm font-medium">{post.author.name}</p>
                    <p className="text-muted-foreground text-xs">{post.author.role}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-8 md:py-16 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-background/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-foreground font-[Instrument_Serif] text-3xl md:text-4xl mb-4">
              Ready to understand your Gen Z audience?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-2xl mx-auto">
              Discover how Uri can help you build AI personas of your ideal customers and make confident decisions.
            </p>
            <button
              onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z', '_blank')}
              className="bg-primary text-black hover:bg-primary/90 rounded-full px-8 py-3 font-medium transition-colors"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
