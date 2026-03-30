import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Shuffle } from "lucide-react";
import { toast } from "sonner";

export default function ListRandomizer() {
  const [list, setList] = useState("");
  const [shuffled, setShuffled] = useState("");

  const handleShuffle = () => {
    if (!list) return;
    const items = list.split("\n").filter((item) => item.trim() !== "");
    if (items.length < 2) {
      toast.error("Please enter at least two items!");
      return;
    }

    const shuffledItems = [...items];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
    }
    setShuffled(shuffledItems.join("\n"));
    toast.success("List shuffled successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shuffled);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const blob = new Blob([shuffled], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shuffled-list.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">Original List (one item per line)</label>
          <Textarea
            placeholder="Enter your list here..."
            className="h-64 resize-none"
            value={list}
            onChange={(e) => setList(e.target.value)}
          />
          <Button className="w-full" onClick={handleShuffle} disabled={!list}>
            <Shuffle className="h-4 w-4 mr-2" /> Shuffle List
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Shuffled List</label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={copyToClipboard}
                disabled={!shuffled}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={downloadResult}
                disabled={!shuffled}
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Shuffled list will appear here..."
            className="h-64 resize-none bg-slate-50"
            value={shuffled}
            readOnly
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => { setList(""); setShuffled(""); }}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool uses the Fisher-Yates shuffle algorithm to randomize the order of your list items. 
            Simply enter your items, one per line, and click 'Shuffle' to get a randomized version. 
            It's perfect for picking winners, creating random orders, or shuffling any list of data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
