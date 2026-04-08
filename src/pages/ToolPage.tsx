import { useParams } from "react-router-dom";
import { ALL_TOOLS } from "@/lib/tools";
import { ToolLayout } from "@/components/layout/ToolLayout";
import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";

// Lazy load tools
const EMICalculator = lazy(() => import("@/components/tools/EMICalculator"));
const CurrencyConverter = lazy(() => import("@/components/tools/CurrencyConverter"));
const LengthConverter = lazy(() => import("@/components/tools/LengthConverter"));
const GSTCalculator = lazy(() => import("@/components/tools/GSTCalculator"));
const JSONFormatter = lazy(() => import("@/components/tools/JSONFormatter"));
const WordCounter = lazy(() => import("@/components/tools/WordCounter"));
const ImageCompressor = lazy(() => import("@/components/tools/ImageCompressor"));
const Base64Tool = lazy(() => import("@/components/tools/Base64Tool"));
const AgeCalculator = lazy(() => import("@/components/tools/AgeCalculator"));
const BMICalculator = lazy(() => import("@/components/tools/BMICalculator"));
const CaseConverter = lazy(() => import("@/components/tools/CaseConverter"));
const PasswordGenerator = lazy(() => import("@/components/tools/PasswordGenerator"));
const DiscountCalculator = lazy(() => import("@/components/tools/DiscountCalculator"));
const PercentageCalculator = lazy(() => import("@/components/tools/PercentageCalculator"));
const TipCalculator = lazy(() => import("@/components/tools/TipCalculator"));
const TemperatureConverter = lazy(() => import("@/components/tools/TemperatureConverter"));
const WeightConverter = lazy(() => import("@/components/tools/WeightConverter"));
const AreaConverter = lazy(() => import("@/components/tools/AreaConverter"));
const TimeConverter = lazy(() => import("@/components/tools/TimeConverter"));
const LoremIpsumGenerator = lazy(() => import("@/components/tools/LoremIpsumGenerator"));
const TextToSlug = lazy(() => import("@/components/tools/TextToSlug"));
const RemoveExtraSpaces = lazy(() => import("@/components/tools/RemoveExtraSpaces"));
const CharacterCounter = lazy(() => import("@/components/tools/CharacterCounter"));
const URLEncoderDecoder = lazy(() => import("@/components/tools/URLEncoderDecoder"));
const HTMLFormatter = lazy(() => import("@/components/tools/HTMLFormatter"));
const QRCodeGenerator = lazy(() => import("@/components/tools/QRCodeGenerator"));
const ColorPicker = lazy(() => import("@/components/tools/ColorPicker"));
const UnitConverter = lazy(() => import("@/components/tools/UnitConverter"));
const BinaryConverter = lazy(() => import("@/components/tools/BinaryConverter"));
const HexRGBConverter = lazy(() => import("@/components/tools/HexRGBConverter"));
const HashGenerator = lazy(() => import("@/components/tools/HashGenerator"));
const CSVJSONConverter = lazy(() => import("@/components/tools/CSVJSONConverter"));
const XMLFormatter = lazy(() => import("@/components/tools/XMLFormatter"));
const SQLFormatter = lazy(() => import("@/components/tools/SQLFormatter"));
const JSBeautifier = lazy(() => import("@/components/tools/JSBeautifier"));
const CSSBeautifier = lazy(() => import("@/components/tools/CSSBeautifier"));
const RandomNumberGenerator = lazy(() => import("@/components/tools/RandomNumberGenerator"));
const ListRandomizer = lazy(() => import("@/components/tools/ListRandomizer"));
const TextReverser = lazy(() => import("@/components/tools/TextReverser"));
const WordFrequencyCounter = lazy(() => import("@/components/tools/WordFrequencyCounter"));
const LineCounter = lazy(() => import("@/components/tools/LineCounter"));
const DuplicateLineRemover = lazy(() => import("@/components/tools/DuplicateLineRemover"));
const MarkdownToHTML = lazy(() => import("@/components/tools/MarkdownToHTML"));
const HTMLToMarkdown = lazy(() => import("@/components/tools/HTMLToMarkdown"));
const JSONYAMLConverter = lazy(() => import("@/components/tools/JSONYAMLConverter"));
const ImageBase64Converter = lazy(() => import("@/components/tools/ImageBase64Converter"));
const ImageFormatConverter = lazy(() => import("@/components/tools/ImageFormatConverter"));
const ImageResizer = lazy(() => import("@/components/tools/ImageResizer"));
const ImageCrop = lazy(() => import("@/components/tools/ImageCrop"));
const TextHexConverter = lazy(() => import("@/components/tools/TextHexConverter"));
const TextOctalConverter = lazy(() => import("@/components/tools/TextOctalConverter"));
const CaesarCipher = lazy(() => import("@/components/tools/CaesarCipher"));
const VigenereCipher = lazy(() => import("@/components/tools/VigenereCipher"));
const MortgageCalculator = lazy(() => import("@/components/tools/MortgageCalculator"));
const CompoundInterestCalculator = lazy(() => import("@/components/tools/CompoundInterestCalculator"));
const SalesTaxCalculator = lazy(() => import("@/components/tools/SalesTaxCalculator"));
const ProfitMarginCalculator = lazy(() => import("@/components/tools/ProfitMarginCalculator"));
const SalaryCalculator = lazy(() => import("@/components/tools/SalaryCalculator"));
const FuelCostCalculator = lazy(() => import("@/components/tools/FuelCostCalculator"));
const MorseCodeConverter = lazy(() => import("@/components/tools/MorseCodeConverter"));
const NATOPhoneticAlphabet = lazy(() => import("@/components/tools/NATOPhoneticAlphabet"));
const ROT13Converter = lazy(() => import("@/components/tools/ROT13Converter"));
const TextToASCII = lazy(() => import("@/components/tools/TextToASCII"));
const ASCIIToText = lazy(() => import("@/components/tools/ASCIIToText"));
const BinaryToHex = lazy(() => import("@/components/tools/BinaryToHex"));
const HexToBinary = lazy(() => import("@/components/tools/HexToBinary"));
const DecimalToHex = lazy(() => import("@/components/tools/DecimalToHex"));
const HexToDecimal = lazy(() => import("@/components/tools/HexToDecimal"));
const DecimalToOctal = lazy(() => import("@/components/tools/DecimalToOctal"));
const OctalToDecimal = lazy(() => import("@/components/tools/OctalToDecimal"));
const JSONToCSV = lazy(() => import("@/components/tools/JSONToCSV"));
const PlaceholderTool = lazy(() => import("@/components/tools/PlaceholderTool"));

const TOOL_COMPONENTS: Record<string, React.FC<any>> = {
  "emi-calculator-india": EMICalculator,
  "currency-converter": CurrencyConverter,
  "length-converter": LengthConverter,
  "gst-calculator-india": GSTCalculator,
  "json-formatter": JSONFormatter,
  "word-counter": WordCounter,
  "image-compressor": ImageCompressor,
  "base64-encoder-decoder": Base64Tool,
  "age-calculator": AgeCalculator,
  "bmi-calculator": BMICalculator,
  "case-converter": CaseConverter,
  "password-generator": PasswordGenerator,
  "discount-calculator": DiscountCalculator,
  "percentage-calculator": PercentageCalculator,
  "tip-calculator": TipCalculator,
  "temperature-converter": TemperatureConverter,
  "weight-converter": WeightConverter,
  "area-converter": AreaConverter,
  "time-converter": TimeConverter,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "text-to-slug": TextToSlug,
  "remove-extra-spaces": RemoveExtraSpaces,
  "character-counter": CharacterCounter,
  "url-encoder-decoder": URLEncoderDecoder,
  "html-formatter": HTMLFormatter,
  "qr-code-generator": QRCodeGenerator,
  "color-picker": ColorPicker,
  "unit-converter": UnitConverter,
  "binary-converter": BinaryConverter,
  "hex-rgb-converter": HexRGBConverter,
  "hash-generator": HashGenerator,
  "csv-json-converter": CSVJSONConverter,
  "xml-formatter": XMLFormatter,
  "sql-formatter": SQLFormatter,
  "js-beautifier": JSBeautifier,
  "css-beautifier": CSSBeautifier,
  "random-number-generator": RandomNumberGenerator,
  "list-randomizer": ListRandomizer,
  "text-reverser": TextReverser,
  "word-frequency-counter": WordFrequencyCounter,
  "line-counter": LineCounter,
  "duplicate-line-remover": DuplicateLineRemover,
  "markdown-to-html": MarkdownToHTML,
  "html-to-markdown": HTMLToMarkdown,
  "json-to-yaml": JSONYAMLConverter,
  "yaml-to-json": JSONYAMLConverter,
  "image-to-base64": ImageBase64Converter,
  "base64-to-image": ImageBase64Converter,
  "text-hex-converter": TextHexConverter,
  "text-octal-converter": TextOctalConverter,
  "caesar-cipher": CaesarCipher,
  "vigenere-cipher": VigenereCipher,
  "mortgage-calculator": MortgageCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "sales-tax-calculator": SalesTaxCalculator,
  "profit-margin-calculator": ProfitMarginCalculator,
  "salary-calculator": SalaryCalculator,
  "fuel-cost-calculator": FuelCostCalculator,
  "morse-code-converter": MorseCodeConverter,
  "nato-phonetic-alphabet": NATOPhoneticAlphabet,
  "rot13-encoder-decoder": ROT13Converter,
  "text-to-ascii": TextToASCII,
  "ascii-to-text": ASCIIToText,
  "binary-to-hex": BinaryToHex,
  "hex-to-binary": HexToBinary,
  "decimal-to-hex": DecimalToHex,
  "hex-to-decimal": HexToDecimal,
  "decimal-to-octal": DecimalToOctal,
  "octal-to-decimal": OctalToDecimal,
  "json-to-csv": JSONToCSV,
  "jpg-to-png-converter": (props) => <ImageFormatConverter {...props} title="JPG to PNG Converter" defaultToFormat="png" />,
  "png-to-jpg-converter": (props) => <ImageFormatConverter {...props} title="PNG to JPG Converter" defaultToFormat="jpeg" />,
  "image-resizer": ImageResizer,
  "compress-image-to-50kb": (props) => <ImageCompressor {...props} title="Compress Image to 50KB" targetSizeKB={50} />,
  "compress-image-to-100kb": (props) => <ImageCompressor {...props} title="Compress Image to 100KB" targetSizeKB={100} />,
  "image-crop": ImageCrop,
};

export function ToolPage() {
  const { slug } = useParams();
  const tool = ALL_TOOLS.find(t => t.slug === slug);

  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
        <p className="text-slate-500">The tool you are looking for does not exist or has been moved.</p>
      </div>
    );
  }

  const Component = TOOL_COMPONENTS[tool.slug] || PlaceholderTool;

  return (
    <ToolLayout tool={tool}>
      <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading tool...</div>}>
        <Component title={tool.title} />
      </Suspense>
    </ToolLayout>
  );
}
