import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TabsProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

Tabs.List = function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn('flex space-x-1', className)}>
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

Tabs.Trigger = function TabsTrigger({ value, children, className, onClick }: TabsTriggerProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
    >
      {children}
    </motion.button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

Tabs.Content = function TabsContent({ value, children, className }: TabsContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn('outline-none', className)}
      role="tabpanel"
      tabIndex={-1}
    >
      {children}
    </motion.div>
  );
};