import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command as CommandIcon, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CommandProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function CommandDialog({ isOpen, onClose, children }: CommandProps) {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          document.getElementById('command-input')?.focus();
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-full max-w-[750px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg border bg-background shadow-lg"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div className="flex items-center border-b px-3">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        id="command-input"
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

interface CommandListProps {
  children: React.ReactNode;
}

export function CommandList({ children }: CommandListProps) {
  return (
    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  );
}

interface CommandGroupProps {
  heading: string;
  children: React.ReactNode;
}

export function CommandGroup({ heading, children }: CommandGroupProps) {
  return (
    <div className="overflow-hidden p-1 px-2">
      <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
        {heading}
      </p>
      {children}
    </div>
  );
}

interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelect?: () => void;
}

export function CommandItem({
  children,
  onSelect,
  className,
  ...props
}: CommandItemProps) {
  return (
    <div
      role="button"
      onClick={onSelect}
      className={cn(
        "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CommandShortcutProps {
  children: React.ReactNode;
}

export function CommandShortcut({ children }: CommandShortcutProps) {
  return (
    <span className="ml-auto text-xs tracking-widest text-muted-foreground">
      {children}
    </span>
  );
}