'use client';

import { useState } from 'react';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { generateSummary } from '@/lib/mockAI';
import { Item } from '@/lib/types';
import ReactMarkdown from 'react-markdown'; // Need to install this or just render raw

// For this demo, we will just render raw text with simple formatting or use a simple markdown renderer component
// Let's just format it nicely with whitespace-pre-wrap for now if we don't want to add another dep
// Actually, react-markdown is great. I'll add it.

interface AISummaryPanelProps {
  items: Item[];
  summary?: string;
  onUpdateSummary: (summary: string) => void;
}

export function AISummaryPanel({ items, summary, onUpdateSummary }: AISummaryPanelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const result = await generateSummary(items);
      onUpdateSummary(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col border-l rounded-none md:rounded-lg border-border shadow-sm">
      <CardHeader className="pb-3 border-b bg-secondary/30">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg text-foreground">
            <Sparkles className="w-5 h-5 text-primary fill-primary/10" />
            AI Research Assistant
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 relative overflow-hidden flex flex-col">
        {summary ? (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-6">
              <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-foreground leading-relaxed">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-card flex justify-end">
               <Button variant="ghost" size="sm" onClick={handleSummarize} disabled={isLoading} className="text-muted-foreground hover:text-foreground">
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Regenerate
               </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary/50" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Ready to synthesize</h3>
              <p className="text-sm max-w-[240px] mx-auto">
                Ask AI to analyze your {items.length} saved sources and find common themes.
              </p>
            </div>
            <Button 
              onClick={handleSummarize} 
              disabled={isLoading || items.length === 0}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing {items.length} sources...
                </>
              ) : (
                'Summarize Workspace'
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
