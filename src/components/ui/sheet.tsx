import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
  className?: string;
}

const positions = {
  left: {
    sheet: 'left-0 h-full max-w-[90%] w-[400px]',
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' }
  },
  right: {
    sheet: 'right-0 h-full max-w-[90%] w-[400px]',
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' }
  },
  top: {
    sheet: 'top-0 w-full max-h-[90%] h-[400px]',
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' }
  },
  bottom: {
    sheet: 'bottom-0 w-full max-h-[90%] h-[400px]',
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' }
  }
};

export function Sheet({
  isOpen,
  onClose,
  position = 'right',
  children,
  className
}: SheetProps) {
  const pos = positions[position];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={pos.initial}
            animate={pos.animate}
            exit={pos.exit}
            transition={{ type: 'spring', damping: 20 }}
            className={cn(
              'fixed bg-background shadow-lg z-50',
              pos.sheet,
              className
            )}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent"
            >
              <X className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}