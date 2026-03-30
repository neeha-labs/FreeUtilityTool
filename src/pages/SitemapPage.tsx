import { ALL_TOOLS } from "@/lib/tools";
import { Link } from "react-router-dom";

export function SitemapPage() {
  const categories = Array.from(new Set(ALL_TOOLS.map((tool) => tool.category)));

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Sitemap</h1>
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">Main Pages</h2>
            <ul className="space-y-3">
              <li><Link to="/" className="text-indigo-600 hover:underline">Home</Link></li>
              <li><Link to="/about" className="text-indigo-600 hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="text-indigo-600 hover:underline">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link></li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6 border-b pb-2">Categories</h2>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`} className="text-indigo-600 hover:underline">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">Tools</h2>
            <div className="space-y-8">
              {categories.map((cat) => (
                <div key={cat}>
                  <h3 className="font-bold text-slate-700 mb-3 uppercase text-xs tracking-wider">{cat}</h3>
                  <ul className="space-y-2">
                    {ALL_TOOLS.filter((t) => t.category === cat).map((tool) => (
                      <li key={tool.slug}>
                        <Link to={`/tools/${tool.slug}`} className="text-slate-600 hover:text-indigo-600 text-sm">
                          {tool.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
