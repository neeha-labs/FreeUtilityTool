import { Tool } from "../types";

export const ALL_TOOLS: Tool[] = [
  {
    slug: "emi-calculator-india",
    title: "EMI Calculator India",
    category: "Calculators",
    shortDesc: "Calculate your home, car, or personal loan EMI with detailed amortization schedule.",
    icon: "Calculator",
    region: "IN",
    relatedTools: ["gst-calculator-india", "currency-converter"],
    seoKeywords: ["emi calculator", "loan emi calculator", "home loan emi", "car loan emi", "india emi calculator"],
    faqs: [
      { question: "How is EMI calculated?", answer: "EMI is calculated using the formula: [P x R x (1+R)^N] / [(1+R)^N-1], where P is the principal, R is the monthly interest rate, and N is the number of monthly installments." },
      { question: "Can I use this for home loans?", answer: "Yes, this EMI calculator is suitable for home loans, car loans, personal loans, and any other reducing balance loans." },
      { question: "Is this EMI calculator accurate for Indian banks?", answer: "Yes, it uses standard banking formulas used by major Indian banks like SBI, HDFC, and ICICI." }
    ]
  },
  {
    slug: "currency-converter",
    title: "Currency Converter",
    category: "Converters",
    shortDesc: "Real-time currency conversion with live exchange rates.",
    icon: "Coins",
    region: "GLOBAL",
    relatedTools: ["length-converter", "emi-calculator-india"],
    seoKeywords: ["currency converter", "usd to inr", "forex rates", "exchange rate calculator"],
    faqs: [
      { question: "How often are exchange rates updated?", answer: "Our currency rates are updated every few minutes from reliable financial data sources to ensure accuracy." },
      { question: "Can I convert currencies offline?", answer: "No, an active internet connection is required to fetch the latest live exchange rates." },
      { question: "Which currencies are supported?", answer: "We support all major global currencies including USD, EUR, GBP, INR, JPY, and many more." }
    ]
  },
  {
    slug: "length-converter",
    title: "Length Converter",
    category: "Converters",
    shortDesc: "Convert between meters, feet, inches, kilometers, and more.",
    icon: "Ruler",
    region: "GLOBAL",
    relatedTools: ["currency-converter", "word-counter"],
    seoKeywords: ["length converter", "meters to feet", "inches to cm", "unit converter"],
    faqs: [
      { question: "How many inches are in a foot?", answer: "There are exactly 12 inches in one foot." },
      { question: "Is this length converter accurate?", answer: "Yes, it uses standard international conversion factors for high precision." },
      { question: "Can I convert metric to imperial units?", answer: "Yes, our tool seamlessly converts between metric (meters, km) and imperial (feet, inches, miles) systems." }
    ]
  },
  {
    slug: "gst-calculator-india",
    title: "GST Calculator India",
    category: "Calculators",
    shortDesc: "Calculate GST (CGST, SGST, IGST) for your products and services.",
    icon: "Percent",
    region: "IN",
    relatedTools: ["emi-calculator-india", "currency-converter"],
    seoKeywords: ["gst calculator", "gst calculator india", "calculate gst online", "cgst sgst calculator"],
    faqs: [
      { question: "What is GST Inclusive and Exclusive?", answer: "GST Exclusive means the tax is added to the base price. GST Inclusive means the tax is already included in the total price." },
      { question: "How are CGST and SGST calculated?", answer: "For intra-state transactions, the total GST is split equally into CGST (Central) and SGST (State)." },
      { question: "What are the common GST rates in India?", answer: "The most common GST slabs in India are 5%, 12%, 18%, and 28%." }
    ]
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    category: "Development Tools",
    shortDesc: "Beautify, validate, and format your JSON data.",
    icon: "Code",
    region: "GLOBAL",
    relatedTools: ["base64-encoder-decoder", "word-counter"],
    seoKeywords: ["json formatter", "beautify json", "json validator", "json viewer"],
    faqs: [
      { question: "Is my JSON data secure?", answer: "Yes, all processing happens locally in your browser. Your data is never sent to our servers." },
      { question: "Can this tool fix invalid JSON?", answer: "It will highlight syntax errors, but you must manually correct them based on the error message provided." },
      { question: "What is the difference between Format and Minify?", answer: "Formatting adds indentation for readability, while Minifying removes all whitespace to reduce file size." }
    ]
  },
  {
    slug: "word-counter",
    title: "Word Counter",
    category: "Text Tools",
    shortDesc: "Count words, characters, and reading time of your text.",
    icon: "Type",
    region: "GLOBAL",
    relatedTools: ["json-formatter", "base64-encoder-decoder"],
    seoKeywords: ["word counter", "character count", "text analyzer", "word count online"],
    faqs: [
      { question: "Does it count spaces as characters?", answer: "Yes, the character count usually includes spaces, but we also provide a count excluding spaces." },
      { question: "How is reading time calculated?", answer: "It's based on an average reading speed of 200-250 words per minute." },
      { question: "Is there a limit to the text length?", answer: "No, you can paste large documents, and it will process them instantly in your browser." }
    ]
  },
  {
    slug: "image-compressor",
    title: "Image Compressor",
    category: "Image Tools",
    shortDesc: "Compress images without losing quality. Support PNG, JPG, WEBP.",
    icon: "Image",
    region: "GLOBAL",
    relatedTools: ["base64-encoder-decoder", "json-formatter"],
    seoKeywords: ["image compressor", "compress image online", "reduce image size", "photo compressor"],
    faqs: [
      { question: "Will I lose image quality?", answer: "Our tool uses smart compression algorithms to significantly reduce file size while maintaining high visual quality." },
      { question: "Which image formats are supported?", answer: "We support JPEG, PNG, and WebP formats for compression." },
      { question: "Is it safe to upload my photos?", answer: "Your photos are processed entirely in your browser and are never uploaded to any server." }
    ]
  },
  {
    slug: "base64-encoder-decoder",
    title: "Base64 Encoder/Decoder",
    category: "Development Tools",
    shortDesc: "Encode or decode text and images to Base64 format.",
    icon: "FileCode",
    region: "GLOBAL",
    relatedTools: ["json-formatter", "image-compressor"],
    seoKeywords: ["base64 encoder", "base64 decoder", "base64 online", "text to base64"],
    faqs: [
      { question: "What is Base64 encoding used for?", answer: "It's commonly used to embed binary data (like images) into text documents like HTML, CSS, or JSON." },
      { question: "Can I decode any Base64 string?", answer: "Yes, as long as it's a valid Base64 encoded string, this tool will decode it back to plain text." },
      { question: "Is Base64 a form of encryption?", answer: "No, Base64 is an encoding scheme, not encryption. It can be easily decoded by anyone." }
    ]
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    category: "Calculators",
    shortDesc: "Calculate your exact age in years, months, and days.",
    icon: "Calendar",
    region: "GLOBAL",
    relatedTools: ["bmi-calculator", "emi-calculator-india"],
    seoKeywords: ["age calculator", "calculate age", "how old am i", "birthday calculator"],
    faqs: [
      { question: "How is my age calculated?", answer: "We calculate the difference between your birth date and the current date to give you your age in years, months, and days." },
      { question: "Can I calculate age for a future date?", answer: "Yes, you can select any date as the 'Current Date' to see how old you will be then." },
      { question: "Is this age calculator accurate?", answer: "Yes, it accounts for leap years and varying month lengths for precise calculation." }
    ]
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    category: "Calculators",
    shortDesc: "Calculate your Body Mass Index (BMI) and check your health status.",
    icon: "Activity",
    region: "GLOBAL",
    relatedTools: ["age-calculator", "discount-calculator"],
    seoKeywords: ["bmi calculator", "body mass index", "bmi chart", "health calculator"],
    faqs: [
      { question: "What is BMI?", answer: "Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women." },
      { question: "What is a healthy BMI range?", answer: "A BMI of 18.5 to 24.9 is generally considered healthy for most adults." },
      { question: "Is BMI accurate for everyone?", answer: "BMI is a useful screening tool but doesn't account for muscle mass, bone density, or overall body composition." }
    ]
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    category: "Calculators",
    shortDesc: "Calculate the final price after applying discounts and taxes.",
    icon: "Tag",
    region: "GLOBAL",
    relatedTools: ["percentage-calculator", "gst-calculator-india"],
    seoKeywords: ["discount calculator", "sale price calculator", "calculate discount", "shopping calculator"],
    faqs: [
      { question: "How do I calculate a 20% discount?", answer: "Multiply the original price by 0.20 to find the discount amount, then subtract that from the original price." },
      { question: "Can I add tax to the discounted price?", answer: "Yes, our tool allows you to specify a tax percentage to be applied after the discount." },
      { question: "What is 'You Save' amount?", answer: "It's the difference between the original price and the final price you pay." }
    ]
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    category: "Calculators",
    shortDesc: "Solve common percentage problems like 'what is X% of Y'.",
    icon: "Percent",
    region: "GLOBAL",
    relatedTools: ["discount-calculator", "tip-calculator"],
    seoKeywords: ["percentage calculator", "calculate percentage", "percent off calculator", "math calculator"],
    faqs: [
      { question: "How do I find the percentage of a number?", answer: "Divide the part by the whole and multiply by 100." },
      { question: "Can I calculate percentage increase?", answer: "Yes, our tool can calculate the percentage change between two values." },
      { question: "Is this useful for school math?", answer: "Absolutely! It's a great tool for verifying homework or solving everyday math problems." }
    ]
  },
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    category: "Calculators",
    shortDesc: "Calculate the tip amount and split the bill among friends.",
    icon: "Utensils",
    region: "GLOBAL",
    relatedTools: ["percentage-calculator", "discount-calculator"],
    seoKeywords: ["tip calculator", "bill splitter", "restaurant tip", "gratuity calculator"],
    faqs: [
      { question: "What is the standard tip percentage?", answer: "Standard tips usually range from 15% to 20% depending on the service quality and local customs." },
      { question: "Can I split the bill evenly?", answer: "Yes, just enter the number of people, and the tool will tell you exactly how much each person owes." },
      { question: "Does it include tax in the tip calculation?", answer: "You can choose to tip on the pre-tax or post-tax amount based on your preference." }
    ]
  },
  {
    slug: "temperature-converter",
    title: "Temperature Converter",
    category: "Converters",
    shortDesc: "Convert between Celsius, Fahrenheit, and Kelvin.",
    icon: "Thermometer",
    region: "GLOBAL",
    relatedTools: ["weight-converter", "length-converter"],
    seoKeywords: ["temperature converter", "celsius to fahrenheit", "f to c", "kelvin converter"],
    faqs: [
      { question: "How do I convert Celsius to Fahrenheit?", answer: "Multiply by 9/5 and add 32." },
      { question: "What is absolute zero in Celsius?", answer: "Absolute zero is -273.15°C, which is 0 Kelvin." },
      { question: "Is this tool accurate for scientific use?", answer: "Yes, it uses standard conversion formulas used in physics and chemistry." }
    ]
  },
  {
    slug: "weight-converter",
    title: "Weight Converter",
    category: "Converters",
    shortDesc: "Convert between Kilograms, Pounds, Grams, and Ounces.",
    icon: "Scale",
    region: "GLOBAL",
    relatedTools: ["temperature-converter", "area-converter"],
    seoKeywords: ["weight converter", "kg to lbs", "pounds to kg", "mass converter"],
    faqs: [
      { question: "How many pounds are in a kilogram?", answer: "There are approximately 2.20462 pounds in one kilogram." },
      { question: "Can I convert grams to ounces?", answer: "Yes, our tool supports both metric and imperial units for weight." },
      { question: "Is this useful for cooking?", answer: "Definitely! It's perfect for converting recipe measurements between different systems." }
    ]
  },
  {
    slug: "area-converter",
    title: "Area Converter",
    category: "Converters",
    shortDesc: "Convert between Square Meters, Acres, Hectares, and more.",
    icon: "Square",
    region: "GLOBAL",
    relatedTools: ["weight-converter", "length-converter"],
    seoKeywords: ["area converter", "sq ft to sq m", "acres to hectares", "land measurement converter"],
    faqs: [
      { question: "How many square feet are in an acre?", answer: "There are 43,560 square feet in one acre." },
      { question: "Can I convert local land units?", answer: "We support major international units; for local units, you can convert to a standard unit first." },
      { question: "Is this accurate for real estate?", answer: "Yes, it uses standard geometric conversion factors." }
    ]
  },
  {
    slug: "time-converter",
    title: "Time Converter",
    category: "Converters",
    shortDesc: "Convert between Seconds, Minutes, Hours, Days, and Weeks.",
    icon: "Clock",
    region: "GLOBAL",
    relatedTools: ["area-converter", "length-converter"],
    seoKeywords: ["time converter", "hours to minutes", "seconds to hours", "duration converter"],
    faqs: [
      { question: "How many seconds are in a day?", answer: "There are 86,400 seconds in a full 24-hour day." },
      { question: "Can I calculate total minutes in a week?", answer: "Yes, simply enter 1 week and select minutes as the target unit." },
      { question: "Does it account for leap seconds?", answer: "For standard conversions, we use the fixed 60s/min, 60min/hr, 24hr/day logic." }
    ]
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    category: "Text Tools",
    shortDesc: "Convert text to UPPERCASE, lowercase, Title Case, and more.",
    icon: "CaseUpper",
    region: "GLOBAL",
    relatedTools: ["lorem-ipsum-generator", "word-counter"],
    seoKeywords: ["case converter", "uppercase to lowercase", "title case converter", "text formatter"],
    faqs: [
      { question: "What is Title Case?", answer: "Title Case capitalizes the first letter of every major word in a sentence." },
      { question: "Can I convert a whole paragraph?", answer: "Yes, just paste your text, and select the desired case to transform it instantly." },
      { question: "Is there a Sentence Case option?", answer: "Yes, Sentence Case capitalizes only the first letter of each sentence." }
    ]
  },
  {
    slug: "lorem-ipsum-generator",
    title: "Lorem Ipsum Generator",
    category: "Text Tools",
    shortDesc: "Generate placeholder text for your designs and layouts.",
    icon: "FileText",
    region: "GLOBAL",
    relatedTools: ["case-converter", "text-to-slug"],
    seoKeywords: ["lorem ipsum generator", "placeholder text", "dummy text", "filler text"],
    faqs: [
      { question: "What is Lorem Ipsum?", answer: "It's standard placeholder text used in the design industry since the 1500s." },
      { question: "Can I choose the number of paragraphs?", answer: "Yes, you can specify how many paragraphs, sentences, or words you need." },
      { question: "Is the generated text always the same?", answer: "You can choose the standard version or generate randomized variations." }
    ]
  },
  {
    slug: "text-to-slug",
    title: "Text to Slug",
    category: "Text Tools",
    shortDesc: "Convert any string into a URL-friendly slug.",
    icon: "Link",
    region: "GLOBAL",
    relatedTools: ["lorem-ipsum-generator", "remove-extra-spaces"],
    seoKeywords: ["text to slug", "url slug generator", "slugify text", "seo friendly url"],
    faqs: [
      { question: "What is a URL slug?", answer: "A slug is the part of a URL that identifies a specific page in a human-readable format." },
      { question: "Does it remove special characters?", answer: "Yes, it removes symbols and replaces spaces with hyphens for URL compatibility." },
      { question: "Is it good for SEO?", answer: "Absolutely! Descriptive slugs are a key part of on-page SEO optimization." }
    ]
  },
  {
    slug: "remove-extra-spaces",
    title: "Remove Extra Spaces",
    category: "Text Tools",
    shortDesc: "Clean up your text by removing multiple spaces and empty lines.",
    icon: "Eraser",
    region: "GLOBAL",
    relatedTools: ["text-to-slug", "character-counter"],
    seoKeywords: ["remove extra spaces", "clean text", "text cleaner", "remove double spaces"],
    faqs: [
      { question: "Does it remove all spaces?", answer: "No, it only removes redundant spaces, leaving single spaces between words." },
      { question: "Can it remove empty lines?", answer: "Yes, there is an option to collapse multiple line breaks into a single one." },
      { question: "Is this useful for code?", answer: "It can be used to clean up messy code or text copied from PDFs." }
    ]
  },
  {
    slug: "character-counter",
    title: "Character Counter",
    category: "Text Tools",
    shortDesc: "Detailed character count including and excluding spaces.",
    icon: "Hash",
    region: "GLOBAL",
    relatedTools: ["word-counter", "remove-extra-spaces"],
    seoKeywords: ["character counter", "count characters", "text length", "twitter character count"],
    faqs: [
      { question: "Does it count line breaks?", answer: "Yes, line breaks are usually counted as one or two characters depending on the system." },
      { question: "Is it useful for social media?", answer: "Yes, it's perfect for checking limits for Twitter, Meta descriptions, or SMS." },
      { question: "Can I see word count too?", answer: "Yes, we provide both character and word counts in the same view." }
    ]
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    category: "Image Tools",
    shortDesc: "Create custom QR codes for URLs, text, or Wi-Fi.",
    icon: "QrCode",
    region: "GLOBAL",
    relatedTools: ["color-picker", "image-compressor"],
    seoKeywords: ["qr code generator", "create qr code", "free qr code", "qr code for url"],
    faqs: [
      { question: "Do these QR codes expire?", answer: "No, the QR codes generated are static and will work as long as the destination URL is active." },
      { question: "Can I customize the color?", answer: "Yes, you can change the foreground and background colors of your QR code." },
      { question: "Is it free for commercial use?", answer: "Yes, our QR code generator is free for both personal and commercial projects." }
    ]
  },
  {
    slug: "color-picker",
    title: "Color Picker",
    category: "Image Tools",
    shortDesc: "Pick colors and get HEX, RGB, and HSL codes.",
    icon: "Palette",
    region: "GLOBAL",
    relatedTools: ["qr-code-generator", "json-formatter"],
    seoKeywords: ["color picker", "hex color code", "rgb to hex", "color palette"],
    faqs: [
      { question: "What color formats are supported?", answer: "We provide HEX, RGB, RGBA, HSL, and HSLA formats." },
      { question: "Can I save my colors?", answer: "You can copy the codes to your clipboard; we also show a history of recently picked colors." },
      { question: "Is it useful for web design?", answer: "Absolutely! It's a must-have tool for any front-end developer or designer." }
    ]
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    category: "Development Tools",
    shortDesc: "Generate strong, secure, and random passwords.",
    icon: "Lock",
    region: "GLOBAL",
    relatedTools: ["url-encoder-decoder", "json-formatter"],
    seoKeywords: ["password generator", "strong password", "random password", "secure password"],
    faqs: [
      { question: "Is the generated password safe?", answer: "Yes, passwords are generated locally in your browser using secure random number generators." },
      { question: "Can I include symbols?", answer: "Yes, you can customize the length and include numbers, symbols, and mixed-case letters." },
      { question: "Do you store my passwords?", answer: "Never. All generation happens on your device and nothing is sent to our servers." }
    ]
  },
  {
    slug: "url-encoder-decoder",
    title: "URL Encoder/Decoder",
    category: "Development Tools",
    shortDesc: "Safely encode or decode URLs for web development.",
    icon: "Globe",
    region: "GLOBAL",
    relatedTools: ["password-generator", "html-formatter"],
    seoKeywords: ["url encoder", "url decoder", "percent encoding", "url safe text"],
    faqs: [
      { question: "Why do I need to encode a URL?", answer: "URLs can only contain certain characters. Encoding replaces unsafe characters with a '%' followed by two hexadecimal digits." },
      { question: "What is Percent Encoding?", answer: "It's the same as URL encoding, used to represent data in a URI." },
      { question: "Can I decode a URL with parameters?", answer: "Yes, it will decode the entire string, making the parameters readable." }
    ]
  },
  {
    slug: "html-formatter",
    title: "HTML Formatter",
    category: "Development Tools",
    shortDesc: "Beautify and indent your HTML code for better readability.",
    icon: "Layout",
    region: "GLOBAL",
    relatedTools: ["url-encoder-decoder", "json-formatter"],
    seoKeywords: ["html formatter", "beautify html", "html indent", "clean html"],
    faqs: [
      { question: "Does it fix broken HTML tags?", answer: "It will try to indent correctly, but it won't fix structural logic errors in your code." },
      { question: "Can I minify HTML too?", answer: "Yes, we provide both 'Beautify' and 'Minify' options." },
      { question: "Is it safe for large files?", answer: "Yes, it can handle large HTML documents efficiently in your browser." }
    ]
  },
  {
    slug: "unit-converter",
    title: "Unit Converter",
    category: "Converters",
    shortDesc: "All-in-one converter for various measurement units.",
    icon: "Layers",
    region: "GLOBAL",
    relatedTools: ["length-converter", "weight-converter"],
    seoKeywords: ["unit converter", "convert units", "measurement converter", "all in one converter"],
    faqs: [
      { question: "What units are supported?", answer: "We support length, weight, volume, area, temperature, and more." },
      { question: "Is it easy to use?", answer: "Yes, simply select the category, enter the value, and see results for all units instantly." },
      { question: "Can I use it on mobile?", answer: "Yes, it's fully responsive and works great on all devices." }
    ]
  },
  {
    slug: "binary-converter",
    title: "Binary Converter",
    category: "Development Tools",
    shortDesc: "Convert text to binary and binary back to text.",
    icon: "Binary",
    region: "GLOBAL",
    relatedTools: ["base64-encoder-decoder", "url-encoder-decoder"],
    seoKeywords: ["binary converter", "text to binary", "binary to text", "binary code translator"],
    faqs: [
      { question: "How does text to binary conversion work?", answer: "Each character is converted to its ASCII/Unicode numerical value, which is then represented in base-2 (binary)." },
      { question: "Can I convert large blocks of text?", answer: "Yes, our tool can handle long strings of text or binary code efficiently." },
      { question: "Is binary code still used today?", answer: "Yes, binary is the fundamental language of all modern computers and digital systems." }
    ]
  },
  {
    slug: "hex-rgb-converter",
    title: "Hex to RGB Converter",
    category: "Image Tools",
    shortDesc: "Convert between Hex color codes and RGB values.",
    icon: "Palette",
    region: "GLOBAL",
    relatedTools: ["color-picker", "qr-code-generator"],
    seoKeywords: ["hex to rgb", "rgb to hex", "color converter", "hex code finder"],
    faqs: [
      { question: "What is a Hex color code?", answer: "A Hex code is a 6-digit hexadecimal representation of a color used in web design (e.g., #FF5733)." },
      { question: "How do I convert RGB to Hex?", answer: "Each RGB value (0-255) is converted to a 2-digit hexadecimal number and combined." },
      { question: "Does it support transparency (RGBA)?", answer: "Yes, our tool also handles alpha channels for transparency in both Hex and RGB formats." }
    ]
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    category: "Development Tools",
    shortDesc: "Generate MD5, SHA-1, and SHA-256 hashes from text.",
    icon: "Fingerprint",
    region: "GLOBAL",
    relatedTools: ["password-generator", "base64-encoder-decoder"],
    seoKeywords: ["hash generator", "md5 generator", "sha256 generator", "online hash tool"],
    faqs: [
      { question: "What is a hash function?", answer: "A hash function takes an input and produces a fixed-size string of characters, which is typically a 'fingerprint' of the data." },
      { question: "Can I reverse a hash?", answer: "No, cryptographic hashes are designed to be one-way functions and cannot be easily reversed." },
      { question: "Is MD5 still secure?", answer: "MD5 is considered cryptographically broken and should not be used for sensitive security purposes, but it's still useful for checksums." }
    ]
  },
  {
    slug: "csv-json-converter",
    title: "CSV to JSON Converter",
    category: "Development Tools",
    shortDesc: "Convert CSV data to JSON format and vice versa.",
    icon: "FileJson",
    region: "GLOBAL",
    relatedTools: ["json-formatter", "html-formatter"],
    seoKeywords: ["csv to json", "json to csv", "convert csv to json online", "data converter"],
    faqs: [
      { question: "How do I convert CSV to JSON?", answer: "Paste your CSV data, and the tool will automatically parse the headers and create a JSON array of objects." },
      { question: "Does it support different delimiters?", answer: "Yes, you can specify commas, semicolons, or tabs as delimiters." },
      { question: "Can I convert JSON back to CSV?", answer: "Yes, our tool provides bi-directional conversion between CSV and JSON formats." }
    ]
  },
  {
    slug: "xml-formatter",
    title: "XML Formatter",
    category: "Development Tools",
    shortDesc: "Beautify and format your XML data for better readability.",
    icon: "FileCode",
    region: "GLOBAL",
    relatedTools: ["html-formatter", "json-formatter"],
    seoKeywords: ["xml formatter", "beautify xml", "xml validator", "clean xml"],
    faqs: [
      { question: "What is XML used for?", answer: "XML (Extensible Markup Language) is used to store and transport data in a structured, hierarchical format." },
      { question: "Can this tool minify XML?", answer: "Yes, you can choose to either beautify (indent) or minify (remove whitespace) your XML code." },
      { question: "Does it check for XML errors?", answer: "It will highlight basic structural errors, but a full schema validation is not performed." }
    ]
  },
  {
    slug: "sql-formatter",
    title: "SQL Formatter",
    category: "Development Tools",
    shortDesc: "Format and beautify your SQL queries for better clarity.",
    icon: "Database",
    region: "GLOBAL",
    relatedTools: ["json-formatter", "html-formatter"],
    seoKeywords: ["sql formatter", "beautify sql", "sql query formatter", "clean sql"],
    faqs: [
      { question: "Which SQL dialects are supported?", answer: "Our formatter works well with standard SQL, MySQL, PostgreSQL, and SQL Server syntax." },
      { question: "Does it fix SQL errors?", answer: "No, it only formats the code for readability. It does not validate the logic of your queries." },
      { question: "Can I minify SQL queries?", answer: "Yes, you can remove comments and whitespace to create a compact version of your query." }
    ]
  },
  {
    slug: "js-beautifier",
    title: "JavaScript Beautifier",
    category: "Development Tools",
    shortDesc: "Format and clean up your JavaScript and TypeScript code.",
    icon: "FileCode",
    region: "GLOBAL",
    relatedTools: ["html-formatter", "json-formatter"],
    seoKeywords: ["js beautifier", "javascript formatter", "beautify js", "clean javascript"],
    faqs: [
      { question: "Does it support TypeScript?", answer: "Yes, it can format both standard JavaScript and TypeScript code." },
      { question: "Can I minify my JS code?", answer: "Yes, there is an option to remove all unnecessary characters for production use." },
      { question: "Is my code safe?", answer: "All formatting is done locally in your browser; your code is never sent to any server." }
    ]
  },
  {
    slug: "css-beautifier",
    title: "CSS Beautifier",
    category: "Development Tools",
    shortDesc: "Format and beautify your CSS code for better organization.",
    icon: "FileCode",
    region: "GLOBAL",
    relatedTools: ["html-formatter", "js-beautifier"],
    seoKeywords: ["css beautifier", "css formatter", "beautify css", "clean css"],
    faqs: [
      { question: "Does it support SCSS/SASS?", answer: "It works best with standard CSS, but can handle basic SCSS structures as well." },
      { question: "Can I minify my CSS?", answer: "Yes, you can remove whitespace and comments to reduce the file size of your stylesheets." },
      { question: "How does it handle vendor prefixes?", answer: "It preserves existing prefixes but does not automatically add new ones." }
    ]
  },
  {
    slug: "random-number-generator",
    title: "Random Number Generator",
    category: "Calculators",
    shortDesc: "Generate random numbers within a specified range.",
    icon: "Dices",
    region: "GLOBAL",
    relatedTools: ["password-generator", "list-randomizer"],
    seoKeywords: ["random number generator", "generate random number", "rng online", "random digit generator"],
    faqs: [
      { question: "Can I set a range?", answer: "Yes, you can specify the minimum and maximum values for the random number." },
      { question: "Can I generate multiple numbers at once?", answer: "Yes, you can choose how many random numbers you want to generate in a single click." },
      { question: "Are the numbers truly random?", answer: "They are generated using cryptographically secure pseudo-random number generators in your browser." }
    ]
  },
  {
    slug: "list-randomizer",
    title: "List Randomizer",
    category: "Text Tools",
    shortDesc: "Shuffle and randomize any list of items instantly.",
    icon: "Shuffle",
    region: "GLOBAL",
    relatedTools: ["random-number-generator", "remove-extra-spaces"],
    seoKeywords: ["list randomizer", "shuffle list", "randomize list online", "pick random item"],
    faqs: [
      { question: "How do I use the list randomizer?", answer: "Simply paste your list (one item per line) and click 'Shuffle' to randomize the order." },
      { question: "Can I pick a random winner?", answer: "Yes, this is perfect for giveaways or picking a random name from a list." },
      { question: "Is there a limit to the list size?", answer: "It can handle thousands of items efficiently right in your browser." }
    ]
  },
  {
    slug: "text-reverser",
    title: "Text Reverser",
    category: "Text Tools",
    shortDesc: "Reverse your text, words, or even entire paragraphs.",
    icon: "RotateCcw",
    region: "GLOBAL",
    relatedTools: ["case-converter", "remove-extra-spaces"],
    seoKeywords: ["text reverser", "reverse text online", "backwards text generator", "flip text"],
    faqs: [
      { question: "Can I reverse just the words?", answer: "Yes, we provide options to reverse the entire string or just the order of words." },
      { question: "Does it handle special characters?", answer: "Yes, all characters including symbols and emojis will be reversed correctly." },
      { question: "What is this used for?", answer: "It's often used for fun, creating puzzles, or simple text manipulation tasks." }
    ]
  },
  {
    slug: "word-frequency-counter",
    title: "Word Frequency Counter",
    category: "Text Tools",
    shortDesc: "Analyze your text to find the most frequently used words.",
    icon: "BarChart3",
    region: "GLOBAL",
    relatedTools: ["word-counter", "character-counter"],
    seoKeywords: ["word frequency counter", "keyword density tool", "most used words", "text analyzer"],
    faqs: [
      { question: "Does it exclude common words?", answer: "Yes, you can choose to ignore 'stop words' like 'the', 'is', and 'at' for better analysis." },
      { question: "Can I see the percentage of usage?", answer: "Yes, the tool provides both the count and the percentage frequency for each word." },
      { question: "Is this good for SEO?", answer: "Yes, it helps you identify keyword density and avoid keyword stuffing in your content." }
    ]
  },
  {
    slug: "line-counter",
    title: "Line Counter",
    category: "Text Tools",
    shortDesc: "Count the total number of lines in your text or code.",
    icon: "Rows",
    region: "GLOBAL",
    relatedTools: ["character-counter", "remove-extra-spaces"],
    seoKeywords: ["line counter", "count lines in text", "online line count", "code line counter"],
    faqs: [
      { question: "Does it count empty lines?", answer: "Yes, but we also provide a separate count for non-empty lines." },
      { question: "Can I use it for code files?", answer: "Absolutely! It's great for checking the length of scripts or configuration files." },
      { question: "Is there a limit to the file size?", answer: "It can handle very large text blocks efficiently in your browser." }
    ]
  },
  {
    slug: "duplicate-line-remover",
    title: "Duplicate Line Remover",
    category: "Text Tools",
    shortDesc: "Remove duplicate lines from your lists and text files.",
    icon: "CopyMinus",
    region: "GLOBAL",
    relatedTools: ["remove-extra-spaces", "list-randomizer"],
    seoKeywords: ["duplicate line remover", "remove duplicates online", "clean list", "deduplicate text"],
    faqs: [
      { question: "Does it preserve the original order?", answer: "Yes, it keeps the first occurrence of each line and removes subsequent duplicates." },
      { question: "Is it case-sensitive?", answer: "You can choose whether to treat 'Apple' and 'apple' as duplicates or not." },
      { question: "Can it remove empty lines too?", answer: "Yes, there is an option to strip out all empty lines during the process." }
    ]
  },
  {
    slug: "markdown-to-html",
    title: "Markdown to HTML",
    category: "Text Tools",
    shortDesc: "Convert Markdown syntax into clean, valid HTML code.",
    icon: "FileCode",
    region: "GLOBAL",
    relatedTools: ["html-formatter", "text-to-slug"],
    seoKeywords: ["markdown to html", "convert markdown to html", "md to html online", "markdown editor"],
    faqs: [
      { question: "What is Markdown?", answer: "Markdown is a lightweight markup language with plain-text-formatting syntax." },
      { question: "Does it support GitHub Flavored Markdown?", answer: "Yes, our converter supports standard GFM features like tables and task lists." },
      { question: "Can I preview the HTML?", answer: "Yes, we provide a live preview of how the rendered HTML will look." }
    ]
  },
  {
    slug: "html-to-markdown",
    title: "HTML to Markdown",
    category: "Text Tools",
    shortDesc: "Convert HTML code back into simplified Markdown syntax.",
    icon: "FileText",
    region: "GLOBAL",
    relatedTools: ["markdown-to-html", "html-formatter"],
    seoKeywords: ["html to markdown", "convert html to md", "html to markdown online", "html cleaner"],
    faqs: [
      { question: "How accurate is the conversion?", answer: "It handles all standard HTML tags and converts them to their Markdown equivalents." },
      { question: "Does it handle complex tables?", answer: "Yes, it will attempt to convert HTML tables into Markdown table syntax." },
      { question: "Can I clean up messy HTML?", answer: "Yes, this is a great way to strip away unnecessary HTML tags and keep just the content." }
    ]
  },
  {
    slug: "json-to-yaml",
    title: "JSON to YAML Converter",
    category: "Development Tools",
    shortDesc: "Convert JSON data into clean, readable YAML format.",
    icon: "FileCode",
    region: "GLOBAL",
    relatedTools: ["json-formatter", "csv-json-converter"],
    seoKeywords: ["json to yaml", "convert json to yaml", "json to yaml online", "data formatter"],
    faqs: [
      { question: "What is YAML?", answer: "YAML is a human-readable data serialization language often used for configuration files." },
      { question: "Is YAML better than JSON?", answer: "YAML is generally more readable for humans, while JSON is more common for machine-to-machine communication." },
      { question: "Can I convert YAML back to JSON?", answer: "Yes, we provide bi-directional conversion between JSON and YAML." }
    ]
  },
  {
    slug: "yaml-to-json",
    title: "YAML to JSON Converter",
    category: "Development Tools",
    shortDesc: "Convert YAML configuration files into JSON format.",
    icon: "FileJson",
    region: "GLOBAL",
    relatedTools: ["json-to-yaml", "json-formatter"],
    seoKeywords: ["yaml to json", "convert yaml to json", "yaml to json online", "config converter"],
    faqs: [
      { question: "Why convert YAML to JSON?", answer: "Many APIs and programming languages have better native support for parsing JSON data." },
      { question: "Does it handle comments in YAML?", answer: "Comments in YAML are stripped out during the conversion to JSON, as JSON doesn't support comments." },
      { question: "Is it safe for large config files?", answer: "Yes, it can process large YAML files efficiently in your browser." }
    ]
  },
  {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    category: "Calculators",
    shortDesc: "Calculate your monthly mortgage payments, including interest and taxes.",
    icon: "Home",
    region: "GLOBAL",
    relatedTools: ["emi-calculator-india", "compound-interest-calculator"],
    seoKeywords: ["mortgage calculator", "home loan calculator", "monthly mortgage payment", "mortgage interest"],
    faqs: [
      { question: "What is a mortgage calculator?", answer: "A mortgage calculator helps you estimate your monthly house payments, including principal and interest." },
      { question: "How is the monthly payment calculated?", answer: "It's based on the loan amount, interest rate, and loan term (usually 15 or 30 years)." },
      { question: "Does it include property taxes?", answer: "Our advanced calculator allows you to include estimated property taxes and insurance for a more accurate result." }
    ]
  },
  {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    category: "Calculators",
    shortDesc: "Calculate how your investments grow over time with compound interest.",
    icon: "TrendingUp",
    region: "GLOBAL",
    relatedTools: ["mortgage-calculator", "percentage-calculator"],
    seoKeywords: ["compound interest calculator", "investment growth", "savings calculator", "future value"],
    faqs: [
      { question: "What is compound interest?", answer: "Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods." },
      { question: "How often can interest be compounded?", answer: "Common frequencies include daily, monthly, quarterly, and annually." },
      { question: "Why is compound interest important?", answer: "It allows your wealth to grow exponentially over long periods, making it a powerful tool for long-term saving." }
    ]
  },
  {
    slug: "sales-tax-calculator",
    title: "Sales Tax Calculator",
    category: "Calculators",
    shortDesc: "Calculate the total price including sales tax for any purchase.",
    icon: "Receipt",
    region: "GLOBAL",
    relatedTools: ["discount-calculator", "percentage-calculator"],
    seoKeywords: ["sales tax calculator", "calculate tax", "total price with tax", "tax rate"],
    faqs: [
      { question: "How do I calculate sales tax?", answer: "Multiply the original price by the tax rate (as a decimal) to get the tax amount, then add it to the original price." },
      { question: "Can I calculate the original price from the total?", answer: "Yes, our tool can work backwards if you know the total price and the tax rate." },
      { question: "Is sales tax the same everywhere?", answer: "No, sales tax rates vary by country, state, and sometimes even by city." }
    ]
  },
  {
    slug: "profit-margin-calculator",
    title: "Profit Margin Calculator",
    category: "Calculators",
    shortDesc: "Calculate your gross profit margin and markup based on cost and revenue.",
    icon: "DollarSign",
    region: "GLOBAL",
    relatedTools: ["discount-calculator", "sales-tax-calculator"],
    seoKeywords: ["profit margin calculator", "gross margin", "markup calculator", "business profit"],
    faqs: [
      { question: "What is profit margin?", answer: "Profit margin is the percentage of revenue that remains after all costs are deducted." },
      { question: "What is the difference between margin and markup?", answer: "Margin is profit as a percentage of the selling price, while markup is profit as a percentage of the cost price." },
      { question: "How do I calculate gross margin?", answer: "Gross Margin = ((Revenue - Cost) / Revenue) * 100." }
    ]
  },
  {
    slug: "salary-calculator",
    title: "Salary Calculator",
    category: "Calculators",
    shortDesc: "Convert your annual salary to hourly, daily, weekly, and monthly rates.",
    icon: "Wallet",
    region: "GLOBAL",
    relatedTools: ["time-converter", "percentage-calculator"],
    seoKeywords: ["salary calculator", "hourly to annual", "monthly salary", "paycheck calculator"],
    faqs: [
      { question: "How many working hours are in a year?", answer: "Typically, a full-time job is considered 2,080 hours per year (40 hours per week for 52 weeks)." },
      { question: "Does this include taxes?", answer: "This tool calculates gross pay. Net pay depends on your specific tax bracket and deductions." },
      { question: "Can I calculate daily pay?", answer: "Yes, the tool breaks down your salary into hourly, daily, weekly, bi-weekly, and monthly amounts." }
    ]
  },
  {
    slug: "fuel-cost-calculator",
    title: "Fuel Cost Calculator",
    category: "Calculators",
    shortDesc: "Estimate the cost of fuel for your next road trip.",
    icon: "Fuel",
    region: "GLOBAL",
    relatedTools: ["length-converter", "unit-converter"],
    seoKeywords: ["fuel cost calculator", "gas money calculator", "trip cost", "fuel efficiency"],
    faqs: [
      { question: "How do I calculate fuel cost?", answer: "Divide the distance by the fuel efficiency, then multiply by the price per unit of fuel." },
      { question: "What is MPG?", answer: "MPG stands for Miles Per Gallon, a common measure of fuel efficiency in the US and UK." },
      { question: "Can I use liters and kilometers?", answer: "Yes, our tool supports both metric and imperial units for your convenience." }
    ]
  },
  {
    slug: "morse-code-converter",
    title: "Morse Code Converter",
    category: "Text Tools",
    shortDesc: "Translate text to Morse code and decode Morse code back to text.",
    icon: "MessageSquare",
    region: "GLOBAL",
    relatedTools: ["binary-converter", "text-reverser"],
    seoKeywords: ["morse code converter", "text to morse", "decode morse code", "morse code translator"],
    faqs: [
      { question: "What is Morse code?", answer: "Morse code is a method used in telecommunication to encode text characters as standardized sequences of two different signal durations, called dots and dashes." },
      { question: "How do I represent a space in Morse code?", answer: "Typically, a forward slash (/) or a double space is used to separate words in Morse code." },
      { question: "Is Morse code still used?", answer: "While no longer the primary method of communication, it is still used by amateur radio operators and in some aviation and nautical contexts." }
    ]
  },
  {
    slug: "nato-phonetic-alphabet",
    title: "NATO Phonetic Alphabet",
    category: "Text Tools",
    shortDesc: "Convert text to the NATO phonetic alphabet (Alpha, Bravo, Charlie...).",
    icon: "Mic",
    region: "GLOBAL",
    relatedTools: ["morse-code-converter", "text-to-slug"],
    seoKeywords: ["nato phonetic alphabet", "alpha bravo charlie", "phonetic alphabet converter", "spelling alphabet"],
    faqs: [
      { question: "What is the NATO phonetic alphabet?", answer: "It is a spelling alphabet used by professional communicators, especially in aviation and the military, to ensure clear communication of letters." },
      { question: "Why is it used?", answer: "It prevents confusion between similar-sounding letters (like 'B' and 'D') over noisy radio or telephone connections." },
      { question: "Is it the same as the International Phonetic Alphabet?", answer: "No, the IPA is used in linguistics to represent the sounds of spoken language, while the NATO alphabet is for spelling out words." }
    ]
  },
  {
    slug: "rot13-encoder-decoder",
    title: "ROT13 Encoder/Decoder",
    category: "Development Tools",
    shortDesc: "Encode and decode text using the ROT13 substitution cipher.",
    icon: "RefreshCw",
    region: "GLOBAL",
    relatedTools: ["caesar-cipher", "vigenere-cipher"],
    seoKeywords: ["rot13", "rot13 encoder", "rot13 decoder", "substitution cipher"],
    faqs: [
      { question: "What is ROT13?", answer: "ROT13 ('rotate by 13 places') is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet." },
      { question: "Is ROT13 secure?", answer: "No, it provides no real cryptographic security and is mainly used for hiding spoilers or punchlines in online forums." },
      { question: "How do I decode ROT13?", answer: "Since there are 26 letters in the alphabet, applying ROT13 twice restores the original text. So the encoder is also the decoder." }
    ]
  },
  {
    slug: "text-to-ascii",
    title: "Text to ASCII Converter",
    category: "Development Tools",
    shortDesc: "Convert text characters to their corresponding ASCII numerical codes.",
    icon: "Code",
    region: "GLOBAL",
    relatedTools: ["ascii-to-text", "binary-converter"],
    seoKeywords: ["text to ascii", "ascii converter", "ascii codes", "string to ascii"],
    faqs: [
      { question: "What is ASCII?", answer: "ASCII (American Standard Code for Information Interchange) is a character encoding standard for electronic communication." },
      { question: "How many characters are in ASCII?", answer: "Standard ASCII uses 7 bits and represents 128 characters, including control characters, numbers, and letters." },
      { question: "Can I convert special characters?", answer: "Yes, all standard characters have a unique ASCII value." }
    ]
  },
  {
    slug: "ascii-to-text",
    title: "ASCII to Text Converter",
    category: "Development Tools",
    shortDesc: "Convert ASCII numerical codes back into readable text characters.",
    icon: "FileText",
    region: "GLOBAL",
    relatedTools: ["text-to-ascii", "binary-converter"],
    seoKeywords: ["ascii to text", "ascii decoder", "ascii to string", "convert ascii"],
    faqs: [
      { question: "How do I use this tool?", answer: "Enter a sequence of ASCII numbers (separated by spaces or commas), and the tool will output the corresponding text." },
      { question: "What if I have extended ASCII codes?", answer: "Our tool supports standard 8-bit extended ASCII characters as well." },
      { question: "Is this the same as Unicode?", answer: "ASCII is a subset of Unicode. While ASCII covers basic English characters, Unicode covers almost all written languages." }
    ]
  },
  {
    slug: "binary-to-hex",
    title: "Binary to Hex Converter",
    category: "Development Tools",
    shortDesc: "Convert binary (base-2) numbers to hexadecimal (base-16).",
    icon: "Binary",
    region: "GLOBAL",
    relatedTools: ["hex-to-binary", "binary-to-decimal"],
    seoKeywords: ["binary to hex", "bin to hex", "binary to hexadecimal", "base2 to base16"],
    faqs: [
      { question: "How do I convert binary to hex?", answer: "Group the binary digits into sets of four from right to left, then convert each set to its corresponding hex digit." },
      { question: "Why use hex instead of binary?", answer: "Hexadecimal is much more compact and easier for humans to read than long strings of 0s and 1s." },
      { question: "Can I convert large binary strings?", answer: "Yes, our tool can handle binary strings of any length." }
    ]
  },
  {
    slug: "hex-to-binary",
    title: "Hex to Binary Converter",
    category: "Development Tools",
    shortDesc: "Convert hexadecimal (base-16) numbers to binary (base-2).",
    icon: "Binary",
    region: "GLOBAL",
    relatedTools: ["binary-to-hex", "hex-to-decimal"],
    seoKeywords: ["hex to binary", "hex to bin", "hexadecimal to binary", "base16 to base2"],
    faqs: [
      { question: "How do I convert hex to binary?", answer: "Each hex digit corresponds to exactly four binary digits. Simply replace each hex digit with its binary equivalent." },
      { question: "Is this conversion lossless?", answer: "Yes, converting between bases is a purely mathematical process and no data is lost." },
      { question: "What are common uses for this?", answer: "It's frequently used in low-level programming, debugging, and understanding how data is stored in memory." }
    ]
  },
  {
    slug: "decimal-to-hex",
    title: "Decimal to Hex Converter",
    category: "Development Tools",
    shortDesc: "Convert decimal (base-10) numbers to hexadecimal (base-16).",
    icon: "Hash",
    region: "GLOBAL",
    relatedTools: ["hex-to-decimal", "decimal-to-binary"],
    seoKeywords: ["decimal to hex", "dec to hex", "decimal to hexadecimal", "base10 to base16"],
    faqs: [
      { question: "How is decimal converted to hex?", answer: "The decimal number is repeatedly divided by 16, and the remainders form the hex digits from right to left." },
      { question: "What happens to numbers larger than 9 in hex?", answer: "Hexadecimal uses letters A-F to represent the values 10-15." },
      { question: "Can I convert negative numbers?", answer: "Our tool currently focuses on non-negative integers for base conversion." }
    ]
  },
  {
    slug: "hex-to-decimal",
    title: "Hex to Decimal Converter",
    category: "Development Tools",
    shortDesc: "Convert hexadecimal (base-16) numbers to decimal (base-10).",
    icon: "Hash",
    region: "GLOBAL",
    relatedTools: ["decimal-to-hex", "hex-to-binary"],
    seoKeywords: ["hex to decimal", "hex to dec", "hexadecimal to decimal", "base16 to base10"],
    faqs: [
      { question: "How do I convert hex to decimal?", answer: "Multiply each hex digit by 16 raised to the power of its position (starting from 0 on the right) and sum the results." },
      { question: "What does '0x' mean in hex?", answer: "It's a common prefix used in programming to indicate that the following number is in hexadecimal format." },
      { question: "Is there a limit to the number size?", answer: "Our tool can handle very large numbers, but precision may be limited by standard JavaScript number constraints for extremely large values." }
    ]
  },
  {
    slug: "decimal-to-octal",
    title: "Decimal to Octal Converter",
    category: "Development Tools",
    shortDesc: "Convert decimal (base-10) numbers to octal (base-8).",
    icon: "Hash",
    region: "GLOBAL",
    relatedTools: ["octal-to-decimal", "decimal-to-hex"],
    seoKeywords: ["decimal to octal", "dec to octal", "base10 to base8", "octal converter"],
    faqs: [
      { question: "What is the octal system?", answer: "The octal system is a base-8 number system that uses digits 0 through 7." },
      { question: "How do I convert decimal to octal?", answer: "Repeatedly divide the decimal number by 8 and record the remainders from right to left." },
      { question: "Where is octal still used?", answer: "It's still used in some computing contexts, like file permissions in Unix-based systems." }
    ]
  },
  {
    slug: "octal-to-decimal",
    title: "Octal to Decimal Converter",
    category: "Development Tools",
    shortDesc: "Convert octal (base-8) numbers to decimal (base-10).",
    icon: "Hash",
    region: "GLOBAL",
    relatedTools: ["decimal-to-octal", "octal-to-binary"],
    seoKeywords: ["octal to decimal", "oct to dec", "base8 to base10", "octal decoder"],
    faqs: [
      { question: "How do I convert octal to decimal?", answer: "Multiply each octal digit by 8 raised to the power of its position and sum the results." },
      { question: "Can I use digits 8 or 9 in octal?", answer: "No, octal only uses digits 0-7. Any number containing 8 or 9 is not a valid octal number." },
      { question: "Is octal related to binary?", answer: "Yes, since 8 is 2 to the power of 3, each octal digit corresponds exactly to three binary digits." }
    ]
  },
  {
    slug: "json-to-csv",
    title: "JSON to CSV Converter",
    category: "Development Tools",
    shortDesc: "Convert JSON data into a CSV (Comma Separated Values) file.",
    icon: "FileSpreadsheet",
    region: "GLOBAL",
    relatedTools: ["csv-json-converter", "json-formatter"],
    seoKeywords: ["json to csv", "convert json to csv", "json to excel", "data converter"],
    faqs: [
      { question: "How does the conversion work?", answer: "The tool flattens the JSON objects and maps their keys to CSV column headers." },
      { question: "Can it handle nested JSON?", answer: "Yes, our tool can flatten nested structures into a flat CSV format." },
      { question: "Is my data safe?", answer: "Yes, all processing happens locally in your browser. Your data is never uploaded to our servers." }
    ]
  },
  {
    slug: "caesar-cipher",
    title: "Caesar Cipher",
    category: "Development Tools",
    shortDesc: "Encode and decode text using the classic Caesar substitution cipher.",
    icon: "Lock",
    region: "GLOBAL",
    relatedTools: ["vigenere-cipher", "rot13-encoder-decoder"],
    seoKeywords: ["caesar cipher", "shift cipher", "substitution cipher", "classic encryption"],
    faqs: [
      { question: "What is a Caesar cipher?", answer: "A Caesar cipher is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet." },
      { question: "How do I decode a Caesar cipher?", answer: "To decode, you shift the letters in the opposite direction by the same number of positions." },
      { question: "Is it secure?", answer: "No, it is very easy to break using frequency analysis or brute force, as there are only 25 possible shifts." }
    ]
  },
  {
    slug: "vigenere-cipher",
    title: "Vigenere Cipher",
    category: "Development Tools",
    shortDesc: "Encode and decode text using the Vigenere polyalphabetic cipher.",
    icon: "Shield",
    region: "GLOBAL",
    relatedTools: ["caesar-cipher", "rot13-encoder-decoder"],
    seoKeywords: ["vigenere cipher", "polyalphabetic cipher", "encryption tool", "secure text"],
    faqs: [
      { question: "What is a Vigenere cipher?", answer: "The Vigenere cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a keyword." },
      { question: "How is it different from a Caesar cipher?", answer: "A Caesar cipher uses a single shift for the entire message, while a Vigenere cipher uses different shifts for each letter based on a repeating keyword." },
      { question: "Is it more secure than Caesar?", answer: "Yes, it is much more resistant to simple frequency analysis, although it can still be broken with more advanced techniques." }
    ]
  },
  {
    slug: "text-hex-converter",
    title: "Text to Hex Converter",
    category: "Development Tools",
    shortDesc: "Convert text characters into their hexadecimal (base-16) representation.",
    icon: "Hash",
    region: "GLOBAL",
    relatedTools: ["text-to-ascii", "binary-converter"],
    seoKeywords: ["text to hex", "string to hex", "hex converter", "hexadecimal text"],
    faqs: [
      { question: "How does text to hex work?", answer: "Each character is converted to its ASCII/Unicode numerical value, which is then converted to a hexadecimal number." },
      { question: "Can I convert emojis?", answer: "Yes, our tool supports Unicode, so emojis and special characters can be converted to hex." },
      { question: "Is hex the same as binary?", answer: "No, hex is base-16 while binary is base-2. However, hex is often used as a more compact way to represent binary data." }
    ]
  },
  {
    slug: "text-octal-converter",
    title: "Text to Octal Converter",
    category: "Development Tools",
    shortDesc: "Convert text characters into their octal (base-8) representation.",
    icon: "Hash",
    region: "GLOBAL",
    relatedTools: ["text-to-ascii", "binary-converter"],
    seoKeywords: ["text to octal", "string to octal", "octal converter", "octal text"],
    faqs: [
      { question: "How does text to octal work?", answer: "Each character is converted to its ASCII value, which is then converted to an octal number." },
      { question: "Why use octal?", answer: "Octal was more common in older computing systems, but it's still used in some areas like Unix file permissions." },
      { question: "Can I convert back from octal to text?", answer: "Yes, our tool supports bidirectional conversion." }
    ]
  },
];
