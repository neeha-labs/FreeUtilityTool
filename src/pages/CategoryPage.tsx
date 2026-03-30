import { useParams, Link } from "react-router-dom";
import { ALL_TOOLS } from "@/lib/tools";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, Coins, Ruler, Percent, Code, Type, Image, FileCode, ArrowRight } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Calculator, Coins, Ruler, Percent, Code, Type, Image, FileCode
};

export function CategoryPage() {
  const { category: categorySlug } = useParams();
  
  // Find the actual category name from the slug
  const tools = ALL_TOOLS.filter(t => 
    t.category.toLowerCase().replace(/\s+/g, "-") === categorySlug?.toLowerCase() ||
    t.category.toLowerCase() === categorySlug?.toLowerCase()
  );

  const categoryName = tools.length > 0 ? tools[0].category : categorySlug;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{categoryName}</h1>
        <p className="text-lg text-slate-500">
          Explore our collection of free {categoryName?.toLowerCase()} designed to make your life easier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = ICON_MAP[tool.icon] || Calculator;
          return (
            <Link key={tool.slug} to={`/tools/${tool.slug}`} className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-200 border-slate-200 group-hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    {tool.region === "IN" && (
                      <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded uppercase tracking-wider">
                        India Specific
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">{tool.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">
                    {tool.shortDesc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 italic">No tools found in this category yet. We are adding more every day!</p>
          <Link to="/" className="text-indigo-600 font-bold mt-4 inline-block">Back to Home</Link>
        </div>
      )}
    </div>
  );
}
