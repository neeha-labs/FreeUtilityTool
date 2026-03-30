import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import { ALL_TOOLS } from "./lib/tools";
import { Home } from "./pages/Home";
import { ToolPage } from "./pages/ToolPage";
import { ToolsPage } from "./pages/ToolsPage";
import { CategoryPage } from "./pages/CategoryPage";
import { StaticPage } from "./pages/StaticPage";
import { SitemapPage } from "./pages/SitemapPage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/:slug" element={<ToolPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/about" element={<StaticPage title="About Us" />} />
            <Route path="/privacy" element={<StaticPage title="Privacy Policy" />} />
            <Route path="/contact" element={<StaticPage title="Contact Us" />} />
            <Route path="/sitemap" element={<SitemapPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
