import { ALL_TOOLS } from "@/lib/tools";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Coins, Ruler, Percent, Code, Type, Image, FileCode, ArrowRight, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ICON_MAP: Record<string, any> = {
  Calculator, Coins, Ruler, Percent, Code, Type, Image, FileCode
};

export function Home() {
  const featuredTools = ALL_TOOLS.slice(0, 8);

  return (
    <div className="pb-20">
      <Helmet>
        <title>FreeUtilityTool.in - 50+ Free Online Utility Tools</title>
        <meta name="description" content="Fast, secure, and free online tools for calculators, converters, image compression, and more. No login required. Privacy-first client-side tools." />
        <meta name="keywords" content="free online tools, utility tools, calculators, converters, image compressor, json formatter, word counter, emi calculator india" />
        <link rel="canonical" href="https://freeutilitytool.in" />
        <meta property="og:title" content="FreeUtilityTool.in - 50+ Free Online Utility Tools" />
        <meta property="og:description" content="Fast, secure, and free online tools for calculators, converters, image compression, and more." />
        <meta property="og:url" content="https://freeutilitytool.in" />
        <meta name="twitter:title" content="FreeUtilityTool.in - 50+ Free Online Utility Tools" />
        <meta name="twitter:description" content="Fast, secure, and free online tools for calculators, converters, image compression, and more." />
      </Helmet>
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Free, Fast & Secure <span className="text-indigo-200">Utility Tools</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Boost your productivity with our collection of 68 free online tools. 
            No login required. Fully client-side. Optimized for speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-8 w-full sm:w-auto">
                Explore All Tools
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white/20 bg-transparent text-white hover:bg-white/10 font-semibold px-8 transition-all"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              How it Works
            </Button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: "Calculators", icon: <Calculator className="w-6 h-6" /> },
            { name: "Converters", icon: <Coins className="w-6 h-6" /> },
            { name: "Text Tools", icon: <Type className="w-6 h-6" /> },
            { name: "Image Tools", icon: <Image className="w-6 h-6" /> },
            { name: "Development Tools", icon: <Code className="w-6 h-6" /> }
          ].map((cat) => (
            <Link key={cat.name} to={`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`} className="group">
              <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-md group-hover:-translate-y-1 h-full">
                <CardHeader className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight">{cat.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="container mx-auto px-4 mt-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Tools</h2>
            <p className="text-slate-500 mt-1">Our most popular utilities used by thousands daily.</p>
          </div>
          <Link to="/tools">
            <Button variant="ghost" className="text-indigo-600 gap-2 font-semibold">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool) => {
            const Icon = ICON_MAP[tool.icon] || Calculator;
            return (
              <Link key={tool.slug} to={`/tools/${tool.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-slate-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      {tool.region === "IN" && (
                        <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded uppercase tracking-wider">
                          India Specific
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {tool.shortDesc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {tool.seoKeywords.slice(0, 2).map(kw => (
                        <span key={kw} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">#{kw}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How it Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Using our tools is simple, fast, and secure. We process everything in your browser so your data stays private.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Select a Tool", desc: "Browse our collection of 68+ utility tools and select the one you need." },
            { step: "02", title: "Input Your Data", desc: "Enter your values or paste your text/code into the input fields." },
            { step: "03", title: "Get Results", desc: "Results are generated instantly. Copy or download them as needed." }
          ].map((item) => (
            <div key={item.step} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-indigo-100 mb-4">{item.step}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="container mx-auto px-4 mt-24 max-w-4xl">
        <div className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-bold mb-6">Why Use FreeUtilityTool.in?</h2>
          <p className="text-slate-600 mb-4">
            In today's fast-paced digital world, having access to reliable utility tools can save you hours of manual work. 
            Whether you're a developer needing to format JSON, a student calculating EMI for a loan, or a content creator 
            compressing images, we've got you covered.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="bg-green-100 text-green-600 p-1 rounded-full h-fit"><Star className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold">100% Free Forever</h4>
                  <p className="text-sm text-slate-500">No hidden costs, no subscriptions, no credit cards required.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-green-100 text-green-600 p-1 rounded-full h-fit"><Star className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold">Privacy First</h4>
                  <p className="text-sm text-slate-500">All tools run client-side. Your data never leaves your browser.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="bg-green-100 text-green-600 p-1 rounded-full h-fit"><Star className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold">Blazing Fast</h4>
                  <p className="text-sm text-slate-500">Built with Next.js 15 for sub-second load times and smooth UX.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-green-100 text-green-600 p-1 rounded-full h-fit"><Star className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold">Mobile Optimized</h4>
                  <p className="text-sm text-slate-500">Use our tools on the go with a fully responsive mobile-first design.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
