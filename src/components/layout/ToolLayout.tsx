import React from "react";
import { ALL_TOOLS } from "@/lib/tools";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Share2, Copy, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

interface ToolLayoutProps {
  tool: typeof ALL_TOOLS[0];
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const relatedTools = ALL_TOOLS.filter(t => tool.relatedTools.includes(t.slug));

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this ${tool.title} on FreeUtilityTool.in!`;
    if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    if (platform === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.title,
    "description": tool.shortDesc,
    "applicationCategory": tool.category,
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": tool.howToUse?.join(", ") || "Online utility tool",
    "mainEntity": {
      "@type": "Question",
      "name": `How to use ${tool.title}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": tool.howToUse?.join(" ") || `Enter the required values in the input fields and get results instantly.`
      }
    }
  };

  // FAQ Structured Data
  const faqStructuredData = tool.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Helmet>
        <title>{`${tool.title} - Free Online Utility Tool`}</title>
        <meta name="description" content={tool.shortDesc} />
        <meta name="keywords" content={tool.seoKeywords.join(", ")} />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        {faqStructuredData && (
          <script type="application/ld+json">
            {JSON.stringify(faqStructuredData)}
          </script>
        )}
      </Helmet>

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink render={<Link to={`/category/${tool.category.toLowerCase().replace(/\s+/g, "-")}`} />}>{tool.category}</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{tool.title}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Tool Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{tool.title}</h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">{tool.shortDesc}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("twitter")}>
                <Twitter className="w-4 h-4 text-sky-500" /> Tweet
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("whatsapp")}>
                <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("copy")}>
                <Copy className="w-4 h-4" /> Copy Link
              </Button>
            </div>
          </div>

          <Card className="border-none shadow-xl bg-white overflow-hidden">
            <CardContent className="p-6 md:p-10">
              {children}
            </CardContent>
          </Card>

          {/* SEO Content Section */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">How to use the {tool.title}?</h2>
              <p>
                {tool.howToUseIntro || `Our ${tool.title} is designed to be simple, fast, and secure. Follow these easy steps to get your results instantly:`}
              </p>
              <ol>
                {tool.howToUse ? (
                  tool.howToUse.map((step, i) => <li key={i}>{step}</li>)
                ) : (
                  <>
                    <li>Enter the required values in the input fields above.</li>
                    <li>The results will be calculated or generated automatically as you type.</li>
                    <li>Use the available buttons (Copy/Download) to save or share your results.</li>
                  </>
                )}
              </ol>
            </section>
            
            <section className="mb-12">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Why our {tool.title} is better?</h3>
              <ul>
                <li><strong>Privacy:</strong> All processing happens in your browser. No data is sent to our servers.</li>
                <li><strong>Speed:</strong> Instant results with zero latency.</li>
                <li><strong>Accuracy:</strong> Built with precision algorithms and real-time data sources.</li>
              </ul>
            </section>

            <section className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">?</span>
                Frequently Asked Questions (FAQs)
              </h3>
              <div className="space-y-6 not-prose">
                {tool.faqs ? (
                  tool.faqs.map((faq, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-100 transition-all hover:shadow-md">
                      <h4 className="font-bold text-slate-900 mb-3 text-lg">{faq.question}</h4>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))
                ) : (
                  tool.seoKeywords.slice(0, 3).map((kw, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-100 transition-all hover:shadow-md">
                      <h4 className="font-bold text-slate-900 mb-3 text-lg">Is this {kw} free to use?</h4>
                      <p className="text-slate-600 leading-relaxed">Yes, our {tool.title} is 100% free to use for everyone. No registration or payment is required.</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* AdSense Placeholder */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 text-center text-slate-400 text-sm italic min-h-[300px] flex items-center justify-center">
            AdSense Placeholder: Sidebar Ad
          </div>

          {/* Related Tools */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-900">Related Tools</h3>
            <div className="space-y-3">
              {relatedTools.map(t => (
                <Link key={t.slug} to={`/tools/${t.slug}`} className="block group">
                  <Card className="hover:bg-slate-50 transition-colors border-slate-200">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm group-hover:text-indigo-600 transition-colors">{t.title}</CardTitle>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">{t.shortDesc}</p>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* AdSense Placeholder */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 text-center text-slate-400 text-sm italic min-h-[250px] flex items-center justify-center">
            AdSense Placeholder: Sidebar Ad 2
          </div>
        </aside>
      </div>
    </div>
  );
}
