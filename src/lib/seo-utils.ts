import { Tool } from "../types";

export function getExtendedSeo(tool: Tool) {
  // If manual SEO is provided, use it but fill in missing pieces if necessary
  const manual = tool.extendedSeo;

  const categoryLower = tool.category.toLowerCase();
  
  // Dynamic Title
  const title = manual?.title || `${tool.title} Online - Free & Fast ${tool.category} Tool`;

  // Dynamic Meta Description
  const metaDescription = manual?.metaDescription || 
    manual?.intro?.substring(0, 160) || 
    `${tool.shortDesc} 100% free, secure, and browser-based. No signup required. Optimized for ${tool.seoKeywords.slice(0, 3).join(", ")}.`;

  // Dynamic Intro
  const intro = manual?.intro || 
    `Our free online ${tool.title} is a powerful utility designed to help you with ${categoryLower} tasks quickly and efficiently. ${
      tool.seoKeywords.length > 0 
        ? `It is optimized for ${tool.seoKeywords.slice(0, 3).join(", ")} and other common requirements.` 
        : ""
    } Whether you are a student, professional, or hobbyist, this tool provides a seamless experience for ${tool.shortDesc.toLowerCase()}. Built with a focus on speed and privacy, all processing happens directly in your browser, ensuring your data remains secure and never leaves your device.`;

  // Dynamic Use Cases
  const useCases = manual?.useCases || [
    `Professional Workflow: Use the ${tool.title} to streamline your daily tasks and improve productivity in ${categoryLower} projects.`,
    `Educational Purposes: A great resource for students and teachers needing quick and accurate ${categoryLower} results.`,
    `Personal Projects: Perfect for hobbyists who need a reliable and free ${tool.title} online without installing heavy software.`,
    `Quick Fixes: When you need a fast result on the go, our mobile-optimized browser-based tool is here to help.`
  ];

  // Dynamic Long-tail Sections
  const longTailSections = manual?.longTailSections || [
    {
      title: `How to use ${tool.title} Online`,
      content: `Using our ${tool.title} is incredibly straightforward. Simply enter your input data in the fields provided above, and the tool will generate the results instantly. You can then copy or download the output for your use. It's designed to be the most user-friendly ${tool.title} available on the web, requiring zero technical expertise.`
    },
    {
      title: `Why Choose Our ${tool.title}?`,
      content: `Unlike other online utilities, our ${tool.title} prioritizes your privacy and speed. By processing everything client-side (in your browser), we eliminate the need for server uploads, making the tool faster and more secure. Plus, it's completely free with no hidden costs, watermarks, or registration required.`
    }
  ];

  // Dynamic Benefits
  const benefits = manual?.benefits || [
    "100% Free to Use Forever",
    "No Registration or Login Required",
    "Privacy-First (Local Browser Processing)",
    "Instant Results with Zero Latency",
    "Mobile & Desktop Optimized",
    "No Watermarks or Hidden Limits"
  ];

  // Dynamic FAQs
  const faqs = manual?.faqs || tool.faqs || [
    { 
      question: `Is the ${tool.title} free to use?`, 
      answer: `Yes, our ${tool.title} is completely free to use. There are no subscriptions, hidden fees, or limits on how many times you can use it.` 
    },
    { 
      question: `Do I need to download any software?`, 
      answer: `No, this is a web-based tool. It runs directly in your browser (Chrome, Firefox, Safari, Edge) on both desktop and mobile devices.` 
    },
    { 
      question: `Is my data secure?`, 
      answer: `Absolutely. We use client-side processing, which means your data is processed locally on your computer and is never uploaded to our servers.` 
    }
  ];

  return {
    title,
    metaDescription,
    intro,
    useCases,
    longTailSections,
    benefits,
    faqs
  };
}
