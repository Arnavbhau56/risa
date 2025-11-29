import { Trash2, ExternalLink, FileText, Link as LinkIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Item } from '@/lib/types';

interface ItemCardProps {
  item: Item;
  onDelete: (id: string) => void;
}

export function ItemCard({ item, onDelete }: ItemCardProps) {
  return (
    <Card className="p-4 flex items-center justify-between group hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-3 overflow-hidden text-left w-full">
        <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center flex-shrink-0 text-muted-foreground">
          {item.type === 'pdf' ? <FileText className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
        </div>
        
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-foreground truncate pr-4">{item.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="truncate max-w-[200px]">{item.domain}</span>
            <span>•</span>
            <span>{new Date(item.addedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
