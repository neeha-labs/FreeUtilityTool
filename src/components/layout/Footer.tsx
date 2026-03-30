import { Link } from "react-router-dom";
import { Wrench, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <h3 className="font-semibold text-white mb-4">
              <Link to="/" className="flex items-center gap-2">
                <Wrench className="w-6 h-6 text-indigo-400" />
                <span>FreeUtilityTool<span className="text-slate-400">.in</span></span>
              </Link>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Your one-stop destination for free, fast, and secure utility tools. 
              Designed for productivity and optimized for SEO.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/calculators" className="hover:text-indigo-400 transition-colors">Calculators</Link></li>
              <li><Link to="/category/converters" className="hover:text-indigo-400 transition-colors">Converters</Link></li>
              <li><Link to="/category/text-tools" className="hover:text-indigo-400 transition-colors">Text Tools</Link></li>
              <li><Link to="/category/image-tools" className="hover:text-indigo-400 transition-colors">Image Tools</Link></li>
              <li><Link to="/category/development-tools" className="hover:text-indigo-400 transition-colors">Development Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/sitemap" className="hover:text-indigo-400 transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-xs text-slate-500 italic text-center min-h-[100px] flex items-center justify-center">
              AdSense Placeholder: Footer Ad
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} FreeUtilityTool.in. All rights reserved. 
          Made with ❤️ for the global community.
        </div>
      </div>
    </footer>
  );
}
