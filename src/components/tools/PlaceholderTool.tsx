import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function PlaceholderTool({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center animate-pulse">
        <Wrench className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          We are currently building this tool to provide you with the best possible experience. 
          Check back soon!
        </p>
      </div>
      <Card className="w-full max-w-md border-dashed border-2 bg-slate-50/50">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
          <div className="h-10 bg-indigo-100 rounded-xl w-full"></div>
        </CardContent>
      </Card>
      <Button variant="outline" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
}
