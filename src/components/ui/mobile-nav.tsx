import React from 'react';
import { Sheet } from './sheet';
import { Button } from './button';
import { Menu } from 'lucide-react';

interface MobileNavProps {
  children: React.ReactNode;
}

export function MobileNav({ children }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        className="p-6"
      >
        {children}
      </Sheet>
    </>
  );
}