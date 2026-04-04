import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Copy, Check, Tag, Globe } from "lucide-react";
import { SUPPORTED_CURRENCIES, formatCurrency } from "@/lib/currencies";
import { getExchangeRate } from "@/lib/exchange";
import { toast } from "sonner";

export default function DiscountCalculator() {
  const [currency, setCurrency] = useState("INR");
  const [price, setPrice] = useState(1000);
  const [priceInput, setPriceInput] = useState("1000");
  const [discount, setDiscount] = useState(20);
  const [discountInput, setDiscountInput] = useState("20");
  const [tax, setTax] = useState(0);
  const [taxInput, setTaxInput] = useState("0");
  const [copied, setCopied] = useState(false);

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  const symbol = selectedCurrency.symbol;
  const locale = selectedCurrency.locale;

  const handleCurrencyChange = async (newCurrency: string) => {
    try {
      const rate = await getExchangeRate(currency, newCurrency);
      const newPrice = Number((price * rate).toFixed(2));
      setPrice(newPrice);
      setPriceInput(newPrice.toString());
      setCurrency(newCurrency);
      toast.success(`Converted values to ${newCurrency}`);
    } catch (error) {
      setCurrency(newCurrency);
    }
  };

  const results = useMemo(() => {
    const discountAmount = (price * discount) / 100;
    const discountedPrice = price - discountAmount;
    const taxAmount = (discountedPrice * tax) / 100;
    const finalPrice = discountedPrice + taxAmount;

    return {
      discountAmount: Math.round(discountAmount * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      savings: Math.round(discountAmount * 100) / 100
    };
  }, [price, discount, tax]);

  const downloadResults = () => {
    const content = `
Discount Calculation Results (${currency})
-----------------------
Original Price: ${formatCurrency(price, currency)}
Discount: ${discount}%
Tax: ${tax}%
Final Price: ${formatCurrency(results.finalPrice, currency)}
You Save: ${formatCurrency(results.savings, currency)}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "discount-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const content = `Final Price: ${formatCurrency(results.finalPrice, currency)}, You Save: ${formatCurrency(results.savings, currency)}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Select value={currency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="w-[150px]">
            <Globe className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_CURRENCIES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-slate-700 font-bold">Original Price ({symbol})</Label>
              <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{formatCurrency(price, currency)}</span>
            </div>
            <Slider value={[price]} min={0} max={100000} step={100} onValueChange={(v) => {
              const val = Array.isArray(v) ? v[0] : v;
              if (val !== undefined) {
                setPrice(val);
                setPriceInput(val.toString());
              }
            }} />
            <Input
              type="text"
              inputMode="decimal"
              value={priceInput}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^\d*\.?\d*$/.test(val)) {
                  setPriceInput(val);
                  const num = parseFloat(val);
                  if (!isNaN(num)) setPrice(num);
                }
              }}
              onBlur={() => {
                if (priceInput === "" || isNaN(parseFloat(priceInput))) {
                  setPriceInput(price.toString());
                }
              }}
              className="font-mono"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-slate-700 font-bold">Discount (%)</Label>
              <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{discount}%</span>
            </div>
            <Slider value={[discount]} min={0} max={100} step={1} onValueChange={(v) => {
              const val = Array.isArray(v) ? v[0] : v;
              if (val !== undefined) {
                setDiscount(val);
                setDiscountInput(val.toString());
              }
            }} />
            <Input
              type="text"
              inputMode="decimal"
              value={discountInput}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^\d*\.?\d*$/.test(val)) {
                  setDiscountInput(val);
                  const num = parseFloat(val);
                  if (!isNaN(num)) setDiscount(num);
                }
              }}
              onBlur={() => {
                if (discountInput === "" || isNaN(parseFloat(discountInput))) {
                  setDiscountInput(discount.toString());
                }
              }}
              className="font-mono"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-slate-700 font-bold">Tax (%)</Label>
              <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{tax}%</span>
            </div>
            <Slider value={[tax]} min={0} max={50} step={0.5} onValueChange={(v) => {
              const val = Array.isArray(v) ? v[0] : v;
              if (val !== undefined) {
                setTax(val);
                setTaxInput(val.toString());
              }
            }} />
            <Input
              type="text"
              inputMode="decimal"
              value={taxInput}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^\d*\.?\d*$/.test(val)) {
                  setTaxInput(val);
                  const num = parseFloat(val);
                  if (!isNaN(num)) setTax(num);
                }
              }}
              onBlur={() => {
                if (taxInput === "" || isNaN(parseFloat(taxInput))) {
                  setTaxInput(tax.toString());
                }
              }}
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
          <div className="text-center space-y-4">
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Final Price</p>
            <h3 className="text-7xl font-black text-indigo-600">{formatCurrency(results.finalPrice, currency)}</h3>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-2xl font-bold text-lg">
              <Tag className="w-5 h-5" /> You Save {formatCurrency(results.savings, currency)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Discount Amount</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(results.discountAmount, currency)}</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Tax Amount</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(results.taxAmount, currency)}</p>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <Button onClick={downloadResults} className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl">
              <Download className="w-4 h-4" /> Download
            </Button>
            <Button variant="outline" onClick={copyResults} className="flex-1 gap-2 h-11 rounded-xl border-slate-200">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy Results"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
