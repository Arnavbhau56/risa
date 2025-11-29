import Link from 'next/link';
import { Microscope } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-foreground hover:opacity-80 transition-opacity">
          <div className="bg-primary p-1.5 rounded-md">
            <Microscope className="w-5 h-5 text-primary-foreground" />
          </div>
          Risa <span className="text-muted-foreground font-normal text-sm ml-1">Research Workspace</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">v1.0.0 (Demo)</div>
          <div className="w-8 h-8 rounded-full bg-secondary border flex items-center justify-center text-secondary-foreground font-medium text-xs">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
