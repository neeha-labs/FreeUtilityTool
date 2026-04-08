import { useParams, Link } from "react-router-dom";
import { ALL_TOOLS } from "@/lib/tools";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, Coins, Ruler, Percent, Code, Type, Image, FileCode, ArrowRight, Maximize, Minimize, Crop } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ICON_MAP: Record<string, any> = {
  Calculator, Coins, Ruler, Percent, Code, Type, Image, FileCode, Maximize, Minimize, Crop
};

const CATEGORY_SEO: Record<string, { title: string, description: string, intro: string, faqs: {q: string, a: string}[] }> = {
  "image-tools": {
    title: "Free Image Tools - Compress, Resize, Crop & Convert Online",
    description: "A collection of free online image tools. Compress to 50KB, resize, crop, convert JPG to PNG, and more. Fast, secure, and browser-based.",
    intro: "Welcome to our suite of free online image tools. Whether you need to compress a photo for a web upload, resize an image for social media, or convert between JPG and PNG formats, we have you covered. All our tools run directly in your browser, ensuring your images remain private and secure.",
    faqs: [
      { q: "Are these image tools free to use?", a: "Yes, all our image tools are completely free to use with no hidden charges or watermarks." },
      { q: "Are my images uploaded to your servers?", a: "No. We prioritize your privacy. All image processing (compression, resizing, cropping) happens locally in your web browser. Your files never leave your device." },
      { q: "Can I use these tools on my mobile phone?", a: "Absolutely! Our website is fully responsive, and all image tools work seamlessly on smartphones and tablets." }
    ]
  },
  "development-tools": {
    title: "Free Developer Tools - Formatters, Encoders & Generators",
    description: "Essential free online tools for developers. JSON formatters, Base64 encoders, Hash generators, and more. Boost your productivity.",
    intro: "Streamline your development workflow with our collection of free developer tools. From formatting JSON and HTML to encoding Base64 and generating secure hashes, these utilities are designed to save you time and effort.",
    faqs: [
      { q: "Do these tools work offline?", a: "Once the page is loaded, many of our developer tools (like formatters and encoders) process data locally and can work without an active internet connection." },
      { q: "Is my code or data stored?", a: "No, we do not store any of the data you paste into our developer tools. Processing is done client-side for maximum security." }
    ]
  },
  "calculators": {
    title: "Free Online Calculators - Financial, Math & Health",
    description: "A wide range of free online calculators including EMI, GST, BMI, Age, and Discount calculators. Fast and accurate results.",
    intro: "Solve complex calculations instantly with our comprehensive suite of online calculators. Whether you're planning your finances, checking your health metrics, or solving math problems, our tools provide accurate results in seconds.",
    faqs: [
      { q: "Are the financial calculators accurate?", a: "Yes, our financial calculators use standard industry formulas to provide accurate estimates. However, always consult with a financial advisor for official figures." },
      { q: "Can I use the calculators on mobile?", a: "Yes, all our calculators are mobile-friendly and easy to use on any device." }
    ]
  },
  "text-tools": {
    title: "Free Text Tools - Word Counters, Case Converters & Formatters",
    description: "Free online text manipulation tools. Count words, change case, remove extra spaces, and generate placeholder text easily.",
    intro: "Manipulate and analyze your text effortlessly with our free online text tools. Perfect for writers, editors, and developers who need to quickly format, count, or clean up text content.",
    faqs: [
      { q: "Is there a word limit for the text tools?", a: "Our tools can handle large amounts of text efficiently in your browser, typically up to tens of thousands of words without performance issues." },
      { q: "Is my text saved anywhere?", a: "No, your text is processed locally in your browser and is never saved or transmitted to our servers." }
    ]
  },
  "converters": {
    title: "Free Unit Converters - Length, Weight, Temperature & More",
    description: "Convert units easily with our free online converters. Supports length, weight, temperature, area, time, and currency conversions.",
    intro: "Quickly convert between different units of measurement with our easy-to-use online converters. From everyday measurements like temperature and weight to specialized units, get accurate conversions instantly.",
    faqs: [
      { q: "Are the conversion rates accurate?", a: "Yes, we use standard international conversion factors for all physical units. Currency rates are updated frequently from reliable sources." },
      { q: "Can I convert metric to imperial?", a: "Yes, our tools seamlessly convert between metric and imperial systems." }
    ]
  }
};

export function CategoryPage() {
  const { category: categorySlug } = useParams();
  
  // Find the actual category name from the slug
  const tools = ALL_TOOLS.filter(t => 
    t.category.toLowerCase().replace(/\s+/g, "-") === categorySlug?.toLowerCase() ||
    t.category.toLowerCase() === categorySlug?.toLowerCase()
  );

  const categoryName = tools.length > 0 ? tools[0].category : categorySlug;
  const normalizedSlug = categorySlug?.toLowerCase() || "";
  const seoData = CATEGORY_SEO[normalizedSlug] || {
    title: `${categoryName} Tools - FreeUtilityTool.in`,
    description: `Explore our collection of free ${categoryName?.toLowerCase()} tools.`,
    intro: `Explore our collection of free ${categoryName?.toLowerCase()} designed to make your life easier.`,
    faqs: []
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
      </Helmet>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{categoryName}</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
          {seoData.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mb-16">
          <p className="text-slate-400 italic">No tools found in this category yet. We are adding more every day!</p>
          <Link to="/" className="text-indigo-600 font-bold mt-4 inline-block">Back to Home</Link>
        </div>
      )}

      {seoData.faqs.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seoData.faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
