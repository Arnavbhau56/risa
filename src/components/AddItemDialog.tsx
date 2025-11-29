'use client';

import { useState } from 'react';
import { Plus, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface AddItemDialogProps {
  onAdd: (url: string) => void;
}

export function AddItemDialog({ onAdd }: AddItemDialogProps) {
  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = () => {
    if (!url.trim()) return;
    onAdd(url);
    setUrl('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Add Link / PDF
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item to Workspace</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
            <LinkIcon className="w-4 h-4 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p>Paste any URL. We'll extract the content automatically.</p>
              <p className="text-blue-600/80 text-xs">
                Note: In the actual browser extension, you'd simply click "Save to Workspace" on any active tab.
              </p>
            </div>
          </div>
          <Input 
            placeholder="https://arxiv.org/abs/..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!url.trim()}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
