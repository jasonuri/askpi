import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { getPostBySlug } from "../data/blogPosts";
import { Calendar, Clock, ArrowLeft, Mail, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const publishedDate = new Date(post.date);
  const formattedDate = publishedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Uri Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(', ')} />

        {/* Open Graph */}
        <meta property="og:title" content={`${post.title} | Uri Blog`} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.image || "https://www.hellouri.ai/og-image.png"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.imageAlt || post.title} />
        <meta property="og:url" content={`https://www.hellouri.ai/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Uri" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author.name} />
        {post.keywords.map((keyword, index) => (
          <meta key={index} property="article:tag" content={keyword} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hellouri_ai" />
        <meta name="twitter:creator" content="@hellouri_ai" />
        <meta name="twitter:title" content={`${post.title} | Uri Blog`} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.image || "https://www.hellouri.ai/og-image.png"} />

        <link rel="canonical" href={`https://www.hellouri.ai/blog/${post.slug}`} />

        {/* Article JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.metaDescription,
            "image": post.image || "https://www.hellouri.ai/og-image.png",
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "jobTitle": post.author.role
            },
            "publisher": {
              "@type": "Organization",
              "name": "Uri",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.hellouri.ai/favicon.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.hellouri.ai/blog/${post.slug}`
            },
            "keywords": post.keywords.join(', '),
            "articleBody": post.content
          })}
        </script>

        {/* BreadcrumbList JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.hellouri.ai"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://www.hellouri.ai/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://www.hellouri.ai/blog/${post.slug}`
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Back to Blog Link */}
      <div className="w-full px-4 pt-8 pb-4 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="w-full px-4 py-8 md:py-12 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-foreground font-[Instrument_Serif] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4 pb-8 border-b border-white/10">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-foreground font-medium">{post.author.name}</p>
              <p className="text-muted-foreground text-sm">{post.author.role}</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="max-w-5xl mx-auto my-12">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="w-full h-auto rounded-3xl shadow-2xl"
              loading="eager"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Keywords/Tags */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-muted-foreground text-sm font-medium mb-3">Topics:</p>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Author Bio Section */}
      <section className="w-full px-4 py-8 md:py-12 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-background/40 backdrop-blur-md rounded-3xl p-8 shadow-xl">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-2xl">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-foreground font-[Instrument_Serif] text-2xl mb-2">
                  {post.author.name}
                </h3>
                <p className="text-muted-foreground mb-4">{post.author.role}</p>
                <div className="flex items-center gap-3">
                  {post.author.name === "Jason Nguyen" && (
                    <>
                      <a
                        href="https://www.linkedin.com/in/jasonvunguyen/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary/20 hover:bg-primary/30 p-2 rounded-full transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-primary" />
                      </a>
                      <a
                        href="mailto:jason@hellouri.ai"
                        className="bg-primary/20 hover:bg-primary/30 p-2 rounded-full transition-colors"
                      >
                        <Mail className="w-4 h-4 text-primary" />
                      </a>
                    </>
                  )}
                  {post.author.name === "Vanessa Hoh" && (
                    <>
                      <a
                        href="https://www.linkedin.com/in/vanessa-hoh-aa73928a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary/20 hover:bg-primary/30 p-2 rounded-full transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-primary" />
                      </a>
                      <a
                        href="mailto:vanessa@hellouri.ai"
                        className="bg-primary/20 hover:bg-primary/30 p-2 rounded-full transition-colors"
                      >
                        <Mail className="w-4 h-4 text-primary" />
                      </a>
                    </>
                  )}
                  {post.author.name === "Elliott Prince" && (
                    <>
                      <a
                        href="https://www.linkedin.com/in/elliott-prince-a5a42a18/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary/20 hover:bg-primary/30 p-2 rounded-full transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-primary" />
                      </a>
                      <a
                        href="mailto:elliott@hellouri.ai"
                        className="bg-primary/20 hover:bg-primary/30 p-2 rounded-full transition-colors"
                      >
                        <Mail className="w-4 h-4 text-primary" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-8 md:py-16 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-background/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-foreground font-[Instrument_Serif] text-3xl md:text-4xl mb-4">
              Want to understand your Gen Z audience?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-2xl mx-auto">
              See how Uri can help you build AI personas of your ideal customers and make data-driven decisions with confidence.
            </p>
            <Button
              onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z', '_blank')}
              className="bg-primary text-black hover:bg-primary/90 rounded-full px-8 py-3 font-medium"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
