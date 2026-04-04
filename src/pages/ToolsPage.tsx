import { ALL_TOOLS } from "@/lib/tools";
import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calculator, Coins, Ruler, Percent, Code, Type, Image, FileCode } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ICON_MAP: Record<string, any> = {
  Calculator, Coins, Ruler, Percent, Code, Type, Image, FileCode
};

export function ToolsPage() {
  const categories = Array.from(new Set(ALL_TOOLS.map((tool) => tool.category)));

  return (
    <div className="container mx-auto px-4 py-20">
      <Helmet>
        <title>All Utility Tools - FreeUtilityTool.in</title>
        <meta name="description" content="Browse our complete collection of 68 free online tools including calculators, converters, text tools, image tools, and development utilities." />
        <link rel="canonical" href="https://freeutilitytool.in/tools" />
        <meta property="og:title" content="All Utility Tools - FreeUtilityTool.in" />
        <meta property="og:description" content="Browse our complete collection of 68 free online tools." />
        <meta property="og:url" content="https://freeutilitytool.in/tools" />
      </Helmet>
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">All Utility Tools</h1>
        <p className="text-lg text-slate-500">Browse our complete collection of 68 free online tools designed to make your life easier.</p>
      </div>

      <div className="space-y-20">
        {categories.map((cat) => (
          <section key={cat}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">{cat}</h2>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ALL_TOOLS.filter(t => t.category === cat).map((tool) => {
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
        ))}
      </div>
    </div>
  );
}
