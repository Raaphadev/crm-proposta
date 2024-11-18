import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function HoverCard({ trigger, children, side = 'bottom', className }: HoverCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: side === 'top' ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: side === 'top' ? -4 : 4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 w-64 rounded-lg border bg-card p-4 shadow-lg',
              side === 'top' && 'bottom-full mb-2',
              side === 'bottom' && 'top-full mt-2',
              side === 'left' && 'right-full mr-2',
              side === 'right' && 'left-full ml-2',
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}