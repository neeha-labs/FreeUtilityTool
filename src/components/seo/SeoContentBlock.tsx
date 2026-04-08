import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedTool {
  title: string;
  slug: string;
}

interface SeoContentBlockProps {
  title: string;
  intro: string;
  useCases: string[];
  longTailSections: {
    title: string;
    content: string;
  }[];
  benefits: string[];
  faqs: FAQ[];
  relatedTools: RelatedTool[];
}

export function SeoContentBlock({
  title,
  intro,
  useCases,
  longTailSections,
  benefits,
  faqs,
  relatedTools,
}: SeoContentBlockProps) {
  return (
    <div className="mt-12 space-y-12">
      {/* Intro Section */}
      <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">{title}</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          {intro}
        </p>
      </section>

      {/* Use Cases Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="mt-1 bg-indigo-50 p-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-slate-700 font-medium">{useCase}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Long-tail Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {longTailSections.map((section, index) => (
          <section key={index} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h2>
            <p className="text-slate-600 leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      {/* Benefits Section */}
      <section className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white">
        <h2 className="text-3xl font-bold mb-8">Key Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="bg-white/20 p-1 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-indigo-200" />
              </div>
              <span className="font-medium text-indigo-50">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Expanded FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">?</span>
          More Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="pt-12 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedTools.map((tool) => (
            <Link key={tool.slug} to={`/tools/${tool.slug}`} className="group">
              <Card className="hover:bg-indigo-50 transition-colors border-slate-200 group-hover:border-indigo-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{tool.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
