import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, RefreshCw, Layout, Minimize2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "sql-formatter";

export default function SQLFormatter() {
  const [sql, setSql] = useState("");
  const [language, setLanguage] = useState("sql");

  const handleFormat = () => {
    if (!sql) return;
    try {
      const formatted = format(sql, {
        language: language as any,
        keywordCase: "upper",
      });
      setSql(formatted);
      toast.success("SQL Formatted!");
    } catch (e) {
      toast.error("Invalid SQL format!");
    }
  };

  const handleMinify = () => {
    if (!sql) return;
    try {
      // Basic minification for SQL
      const minified = sql
        .replace(/\s+/g, " ")
        .replace(/\/\*.*?\*\//g, "")
        .replace(/--.*?\n/g, "")
        .trim();
      setSql(minified);
      toast.success("SQL Minified!");
    } catch (e) {
      toast.error("Error minifying SQL!");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sql);
    toast.success("Copied to clipboard!");
  };

  const downloadResult = () => {
    const blob = new Blob([sql], { type: "application/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "query.sql";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">SQL Dialect</label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select SQL Dialect" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sql">Standard SQL</SelectItem>
              <SelectItem value="mysql">MySQL</SelectItem>
              <SelectItem value="postgresql">PostgreSQL</SelectItem>
              <SelectItem value="sqlite">SQLite</SelectItem>
              <SelectItem value="tsql">T-SQL (SQL Server)</SelectItem>
              <SelectItem value="mariadb">MariaDB</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!sql}>
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={downloadResult} disabled={!sql}>
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Paste your SQL query here..."
          className="h-96 resize-none font-mono text-xs"
          value={sql}
          onChange={(e) => setSql(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleFormat} disabled={!sql}>
          <Layout className="h-4 w-4 mr-2" /> Format SQL
        </Button>
        <Button variant="secondary" onClick={handleMinify} disabled={!sql}>
          <Minimize2 className="h-4 w-4 mr-2" /> Minify SQL
        </Button>
        <Button variant="ghost" onClick={() => setSql("")}>
          <RefreshCw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This tool helps you organize and beautify your SQL queries. 
            It supports multiple dialects like MySQL, PostgreSQL, and SQL Server. 
            Formatting makes complex queries easier to read and debug, while minifying reduces the size for production use.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
