export function StaticPage({ title }: { title: string }) {
  const getContent = () => {
    switch (title) {
      case "About Us":
        return (
          <>
            <p className="text-lg text-slate-600 mb-6">
              Welcome to FreeUtilityTool.in, your comprehensive destination for free, fast, and secure online utility tools.
            </p>
            <p className="text-slate-600 mb-4">
              Our mission is to empower users worldwide by providing a wide range of essential tools that simplify digital tasks. Whether you're a developer, student, or professional, our tools are designed to boost your productivity without any cost or registration.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Why We Started</h2>
            <p className="text-slate-600 mb-4">
              We realized that many utility tools online are either cluttered with intrusive ads, require complex sign-ups, or process data on servers, compromising user privacy. We built FreeUtilityTool.in to be different: clean, client-side, and completely free.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Core Values</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Privacy First:</strong> Most of our tools process data directly in your browser. Your sensitive information never leaves your device.</li>
              <li><strong>Accessibility:</strong> High-quality tools should be available to everyone for free.</li>
              <li><strong>Simplicity:</strong> No complex interfaces. Just input your data and get results instantly.</li>
              <li><strong>Performance:</strong> Built with modern web technologies to ensure sub-second load times.</li>
            </ul>
          </>
        );
      case "Privacy Policy":
        return (
          <>
            <p className="text-lg text-slate-600 mb-6">
              At FreeUtilityTool.in, we take your privacy seriously. This policy outlines how we handle data.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Data Processing</h2>
            <p className="text-slate-600 mb-4">
              The vast majority of our tools (Calculators, Converters, Text Tools, etc.) are <strong>client-side only</strong>. This means all processing happens in your browser using JavaScript. We do not receive, store, or see the data you input into these tools.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              We do not require user accounts or registration. We may use standard web analytics (like Google Analytics) to understand site traffic and improve our services. These tools may collect non-personally identifiable information such as your browser type, device, and pages visited.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Cookies</h2>
            <p className="text-slate-600 mb-4">
              We may use cookies to enhance your experience, such as remembering your preferences. You can disable cookies in your browser settings at any time.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-Party Links</h2>
            <p className="text-slate-600 mb-4">
              Our site may contain links to other websites. We are not responsible for the privacy practices or content of these external sites.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Updates</h2>
            <p className="text-slate-600 mb-4">
              We may update this policy from time to time. Any changes will be posted on this page.
            </p>
          </>
        );
      case "Contact Us":
        return (
          <>
            <p className="text-lg text-slate-600 mb-6">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <p className="text-slate-600 mb-4">
              Your feedback helps us improve FreeUtilityTool.in and build new tools that you need.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-8">
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <p className="text-slate-600 mb-2"><strong>Email:</strong> support@freeutilitytool.in</p>
              <p className="text-slate-600"><strong>Response Time:</strong> We typically respond within 24-48 hours.</p>
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4">Feature Requests</h2>
            <p className="text-slate-600 mb-4">
              Is there a tool you need that we don't have? Send us a request! We are constantly expanding our library of utilities.
            </p>
          </>
        );
      default:
        return <p>Content coming soon...</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">{title}</h1>
      <div className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        {getContent()}
      </div>
    </div>
  );
}
