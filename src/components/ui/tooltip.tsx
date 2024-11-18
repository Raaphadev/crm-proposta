import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={cn(
              'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm whitespace-nowrap',
              side === 'top' && 'bottom-full mb-1',
              side === 'bottom' && 'top-full mt-1',
              side === 'left' && 'right-full mr-1',
              side === 'right' && 'left-full ml-1',
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}