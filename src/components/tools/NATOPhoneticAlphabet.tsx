import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const NATO_MAP: Record<string, string> = {
  'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot', 'G': 'Golf',
  'H': 'Hotel', 'I': 'India', 'J': 'Juliett', 'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November',
  'O': 'Oscar', 'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform',
  'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee', 'Z': 'Zulu',
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven',
  '8': 'Eight', '9': 'Nine', ' ': '(space)'
};

const NATOPhoneticAlphabet = () => {
  const [text, setText] = useState("");
  const [nato, setNato] = useState("");

  useEffect(() => {
    const result = text.toUpperCase().split('').map(char => NATO_MAP[char] || char).join(' ');
    setNato(result);
  }, [text]);

  const copyResults = () => {
    navigator.clipboard.writeText(nato);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = () => {
    const blob = new Blob([nato], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nato-phonetic.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>NATO Phonetic Alphabet Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Enter Text</Label>
            <Textarea
              placeholder="Type something to spell it out..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label>Phonetic Spelling</Label>
            <div className="p-4 bg-muted rounded-lg font-mono min-h-[100px] break-words">
              {nato || "Spelling will appear here..."}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={copyResults} disabled={!nato}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button variant="outline" className="flex-1" onClick={downloadResults} disabled={!nato}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NATOPhoneticAlphabet;
