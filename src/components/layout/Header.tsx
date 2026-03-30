import { Link, useNavigate } from "react-router-dom";
import { Wrench, Search, Menu, X, Calculator, Coins, Type, Image, Ruler, Percent, Code, FileCode } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ALL_TOOLS } from "@/lib/tools";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const ICON_MAP: Record<string, any> = {
  Calculator, Coins, Type, Image, Ruler, Percent, Code, FileCode
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelectTool = (slug: string) => {
    setIsSearchOpen(false);
    navigate(`/tools/${slug}`);
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-2 sm:px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl text-indigo-600 shrink-0">
          <Wrench className="w-5 h-5 sm:w-6 h-6" />
          <span>FreeUtilityTool<span className="text-slate-400">.in</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-medium text-slate-600 overflow-x-auto no-scrollbar">
          <Link to="/category/calculators" className="hover:text-indigo-600 transition-colors whitespace-nowrap">Calculators</Link>
          <Link to="/category/converters" className="hover:text-indigo-600 transition-colors whitespace-nowrap">Converters</Link>
          <Link to="/category/text-tools" className="hover:text-indigo-600 transition-colors whitespace-nowrap">Text Tools</Link>
          <Link to="/category/image-tools" className="hover:text-indigo-600 transition-colors whitespace-nowrap">Image Tools</Link>
          <Link to="/category/development-tools" className="hover:text-indigo-600 transition-colors whitespace-nowrap">Development Tools</Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden lg:flex gap-2 text-slate-500"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-4 h-4" />
            <span>Search Tools</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex lg:hidden text-slate-500"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-slate-500"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} title="Search Tools" description="Search for any utility tool...">
        <CommandInput placeholder="Type a tool name or category..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Available Tools">
            {ALL_TOOLS.map((tool) => {
              const Icon = ICON_MAP[tool.icon] || Calculator;
              return (
                <CommandItem 
                  key={tool.slug} 
                  onSelect={() => handleSelectTool(tool.slug)}
                  className="flex items-center gap-3 p-2 cursor-pointer"
                >
                  <div className="p-1.5 bg-slate-100 rounded text-slate-600">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{tool.title}</span>
                    <span className="text-xs text-slate-400">{tool.category}</span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white p-4 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <Link to="/category/calculators" className="block text-slate-600 font-medium" onClick={() => setIsMenuOpen(false)}>Calculators</Link>
          <Link to="/category/converters" className="block text-slate-600 font-medium" onClick={() => setIsMenuOpen(false)}>Converters</Link>
          <Link to="/category/text-tools" className="block text-slate-600 font-medium" onClick={() => setIsMenuOpen(false)}>Text Tools</Link>
          <Link to="/category/image-tools" className="block text-slate-600 font-medium" onClick={() => setIsMenuOpen(false)}>Image Tools</Link>
          <Link to="/category/development-tools" className="block text-slate-600 font-medium" onClick={() => setIsMenuOpen(false)}>Development Tools</Link>
        </div>
      )}
    </header>
  );
}
