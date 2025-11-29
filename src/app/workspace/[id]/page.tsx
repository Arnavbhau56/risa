'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { AddItemDialog } from '@/components/AddItemDialog';
import { AISummaryPanel } from '@/components/AISummaryPanel';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { getWorkspace, addItemToWorkspace, deleteItem, updateWorkspaceSummary } from '@/lib/store';
import { Workspace, Item } from '@/lib/types';

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = params.id as string;

  useEffect(() => {
    if (!id) return;
    
    const ws = getWorkspace(id);
    if (!ws) {
      // Handle 404 - redirect to home
      router.push('/');
      return;
    }
    
    setWorkspace(ws);
    setIsLoading(false);
  }, [id, router]);

  const handleAddItem = (url: string) => {
    if (!workspace) return;
    const newItem = addItemToWorkspace(workspace.id, url);
    setWorkspace(prev => prev ? ({
      ...prev,
      items: [newItem, ...prev.items]
    }) : null);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!workspace) return;
    deleteItem(workspace.id, itemId);
    setWorkspace(prev => prev ? ({
      ...prev,
      items: prev.items.filter(i => i.id !== itemId)
    }) : null);
  };

  const handleUpdateSummary = (summary: string) => {
    if (!workspace) return;
    updateWorkspaceSummary(workspace.id, summary);
    setWorkspace(prev => prev ? ({
      ...prev,
      summary,
      lastSummaryAt: new Date().toISOString()
    }) : null);
  };

  if (isLoading || !workspace) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl h-[calc(100vh-64px)]">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{workspace.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> {workspace.items.length} items
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Created {new Date(workspace.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Additional workspace actions could go here */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:h-[calc(100%-80px)] pb-6">
          {/* Left Column: Items List */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-semibold text-foreground">Saved Sources</h2>
              <AddItemDialog onAdd={handleAddItem} />
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 min-h-[300px]">
              {workspace.items.length > 0 ? (
                workspace.items.map(item => (
                  <ItemCard 
                    key={item.id} 
                    item={item} 
                    onDelete={handleDeleteItem} 
                  />
                ))
              ) : (
                <div className="h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground">
                  <p>No items yet.</p>
                  <p className="text-sm">Add links or PDFs to get started.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: AI Panel */}
          <div className="lg:col-span-5 h-full">
            <AISummaryPanel 
              items={workspace.items} 
              summary={workspace.summary} 
              onUpdateSummary={handleUpdateSummary}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
