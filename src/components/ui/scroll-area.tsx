import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string | number;
}

export function ScrollArea({ maxHeight, className, children, ...props }: ScrollAreaProps) {
  const [showScrollbar, setShowScrollbar] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      setShowScrollbar(el.scrollHeight > el.clientHeight);
    }
  }, [children]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className={cn(
          'overflow-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent',
          showScrollbar && 'scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400',
          className
        )}
        style={{ maxHeight }}
        {...props}
      >
        {children}
      </div>
      {showScrollbar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute right-0 top-0 bottom-0 w-2 bg-gray-100 rounded-full"
        />
      )}
    </div>
  );
}