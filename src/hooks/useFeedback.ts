import { useState, useCallback } from 'react';

interface FeedbackOptions {
  duration?: number;
  onClose?: () => void;
}

export function useFeedback() {
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
    isVisible: boolean;
  }>({
    type: 'success',
    message: '',
    isVisible: false
  });

  const showFeedback = useCallback(
    (type: 'success' | 'error', message: string, options: FeedbackOptions = {}) => {
      const { duration = 3000, onClose } = options;

      setFeedback({
        type,
        message,
        isVisible: true
      });

      if (duration > 0) {
        setTimeout(() => {
          setFeedback(prev => ({ ...prev, isVisible: false }));
          onClose?.();
        }, duration);
      }
    },
    []
  );

  const hideFeedback = useCallback(() => {
    setFeedback(prev => ({ ...prev, isVisible: false }));
  }, []);

  return {
    feedback,
    showFeedback,
    hideFeedback
  };
}