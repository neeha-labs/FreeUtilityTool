import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Copy, Check, RefreshCw, ShieldCheck } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charset = lowercase;
    if (includeUppercase) charset += uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyResults = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = () => {
    if (length < 8) return { label: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (length < 12) return { label: "Medium", color: "text-orange-500", bg: "bg-orange-500" };
    if (length < 16) return { label: "Strong", color: "text-green-500", bg: "bg-green-500" };
    return { label: "Very Strong", color: "text-indigo-500", bg: "bg-indigo-500" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-slate-700 font-bold uppercase tracking-wider text-xs">Password Length: {length}</Label>
          </div>
          <Slider 
            value={[length]} 
            min={4} 
            max={64} 
            step={1} 
            onValueChange={(v) => {
              const val = Array.isArray(v) ? v[0] : v;
              if (val !== undefined) setLength(val);
            }} 
          />
        </div>

        <div className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <Label className="text-slate-700 font-bold uppercase tracking-wider text-xs mb-4 block">Settings</Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="text-sm font-medium">Include Uppercase (A-Z)</Label>
              <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(v) => setIncludeUppercase(!!v)} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="numbers" className="text-sm font-medium">Include Numbers (0-9)</Label>
              <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(v) => setIncludeNumbers(!!v)} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="symbols" className="text-sm font-medium">Include Symbols (!@#$)</Label>
              <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(v) => setIncludeSymbols(!!v)} />
            </div>
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full h-12 gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-2xl">
          <RefreshCw className="w-4 h-4" /> Regenerate Password
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        <div className="w-full space-y-4">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold text-center">Generated Password</p>
          <div className="relative group">
            <Input 
              readOnly 
              value={password} 
              className="h-16 text-2xl font-mono text-center bg-white border-2 border-slate-200 rounded-2xl pr-12"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={copyResults}
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-slate-100 rounded-xl"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-slate-400" />}
            </Button>
          </div>
          
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className={`w-4 h-4 ${strength.color}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${strength.color}`}>Strength: {strength.label}</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 w-8 rounded-full ${i < (length / 8) ? strength.bg : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-[10px] text-indigo-700 italic text-center">
          * Security Note: Your password is generated locally in your browser. It is never sent to our servers or stored anywhere.
        </div>
      </div>
    </div>
  );
}
