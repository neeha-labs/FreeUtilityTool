export interface Tool {
  slug: string;
  title: string;
  category: "Calculators" | "Converters" | "PDF Tools" | "Image Tools" | "Text Tools" | "Development Tools";
  shortDesc: string;
  icon: string;
  region: "IN" | "GLOBAL";
  relatedTools: string[];
  seoKeywords: string[];
  faqs?: { question: string; answer: string }[];
}

export interface SEOContent {
  title: string;
  description: string;
  h1: string;
  content: string; // Markdown or HTML
  faqs: { question: string; answer: string }[];
}
