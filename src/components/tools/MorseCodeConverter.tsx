import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/', '.': '.-.-.-',
  ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

const REVERSE_MORSE_MAP: Record<string, string> = Object.entries(MORSE_CODE_MAP).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

const MorseCodeConverter = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const convertToMorse = (input: string) => {
    const upperInput = input.toUpperCase();
    const result = upperInput.split('').map(char => MORSE_CODE_MAP[char] || char).join(' ');
    setMorse(result);
  };

  const convertToText = (input: string) => {
    const result = input.split(' ').map(code => REVERSE_MORSE_MAP[code] || code).join('');
    setText(result);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    convertToMorse(val);
  };

  const handleMorseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMorse(val);
    convertToText(val);
  };

  const copyResults = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("Copied to clipboard!");
  };

  const downloadResults = (val: string, filename: string) => {
    const blob = new Blob([val], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text here..."
              className="min-h-[200px]"
              value={text}
              onChange={handleTextChange}
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => copyResults(text)}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => downloadResults(text, "text.txt")}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Morse Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter morse code here (dots and dashes)..."
              className="min-h-[200px]"
              value={morse}
              onChange={handleMorseChange}
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => copyResults(morse)}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => downloadResults(morse, "morse.txt")}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MorseCodeConverter;
