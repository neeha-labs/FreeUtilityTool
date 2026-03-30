import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, Calendar } from "lucide-react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [copied, setCopied] = useState(false);

  const ageData = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) return { error: "Birth date cannot be in the future of target date" };

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return { years, months, days, totalDays, totalWeeks, totalMonths };
  }, [birthDate, targetDate]);

  const downloadResults = () => {
    if (!ageData || 'error' in ageData) return;
    const content = `
Age Calculation Results
-----------------------
Date of Birth: ${birthDate}
Age as of: ${targetDate}
Result: ${ageData.years} Years, ${ageData.months} Months, ${ageData.days} Days
Total Months: ${ageData.totalMonths}
Total Weeks: ${ageData.totalWeeks}
Total Days: ${ageData.totalDays}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "age-calculation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    if (!ageData || 'error' in ageData) return;
    const content = `Age: ${ageData.years} Years, ${ageData.months} Months, ${ageData.days} Days`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-slate-700 font-bold">Date of Birth</Label>
          <Input 
            type="date" 
            value={birthDate} 
            onChange={(e) => setBirthDate(e.target.value)} 
            className="h-12 text-lg"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-slate-700 font-bold">Age at the Date of</Label>
          <Input 
            type="date" 
            value={targetDate} 
            onChange={(e) => setTargetDate(e.target.value)} 
            className="h-12 text-lg"
          />
        </div>

        {!ageData && (
          <div className="p-8 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
            Select your birth date to calculate your age.
          </div>
        )}

        {ageData && 'error' in ageData && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
            {ageData.error}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        {ageData && !('error' in ageData) ? (
          <>
            <div className="text-center space-y-4">
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Your Current Age</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-indigo-600">{ageData.years}</span>
                <span className="text-xl font-bold text-slate-400">Years</span>
              </div>
              <p className="text-xl font-bold text-slate-700">
                {ageData.months} Months | {ageData.days} Days
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Months</p>
                <p className="text-lg font-bold text-slate-900">{ageData.totalMonths}</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Weeks</p>
                <p className="text-lg font-bold text-slate-900">{ageData.totalWeeks}</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Days</p>
                <p className="text-lg font-bold text-slate-900">{ageData.totalDays}</p>
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
          </>
        ) : (
          <div className="text-center space-y-4 opacity-20">
            <Calendar className="w-20 h-20 mx-auto" />
            <p className="font-bold uppercase tracking-widest">Results will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
