import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './loading-spinner';
import { cn } from '../../lib/utils';

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  text?: string;
}

export function LoadingOverlay({
  isLoading,
  text = 'Carregando...',
  className,
  children,
  ...props
}: LoadingOverlayProps) {
  return (
    <div className="relative" {...props}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-col items-center space-y-4"
            >
              <LoadingSpinner size="lg" className="text-primary" />
              {text && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm font-medium text-muted-foreground"
                >
                  {text}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={cn('transition-opacity duration-200', isLoading ? 'opacity-50' : 'opacity-100')}>
        {children}
      </div>
    </div>
  );
}