import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, ArrowRight } from 'lucide-react';
import { Workspace } from '@/lib/types';

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <Link href={`/workspace/${workspace.id}`} className="block group">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 group-hover:-translate-y-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium line-clamp-1 group-hover:text-primary transition-colors">
            {workspace.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>{workspace.items.length} items</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{new Date(workspace.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {workspace.lastSummaryAt && (
            <div className="mt-4">
              <Badge variant="secondary" className="text-xs font-normal bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                AI Summary available
              </Badge>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <div className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 transform translate-x-[-10px] group-hover:translate-x-0 duration-200">
            Open Workspace <ArrowRight className="w-3 h-3" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
