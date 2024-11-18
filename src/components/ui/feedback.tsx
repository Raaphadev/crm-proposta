import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FeedbackProps {
  type: 'success' | 'error';
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  className?: string;
}

export function Feedback({
  type,
  message,
  isVisible,
  onClose,
  className
}: FeedbackProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />
  };

  const styles = {
    success: 'border-green-500/30 bg-green-500/10 text-green-700',
    error: 'border-red-500/30 bg-red-500/10 text-red-700'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            'fixed top-4 right-4 z-50 flex items-center space-x-3 rounded-lg border p-4 shadow-lg',
            styles[type],
            className
          )}
        >
          {icons[type]}
          <p className="text-sm font-medium">{message}</p>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 text-current opacity-70 hover:opacity-100"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}