import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { create } from 'zustand';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 5000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

const toastIcons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <AlertCircle className="w-5 h-5 text-blue-500" />,
};

const toastStyles = {
  success: 'border-green-500 bg-green-50',
  error: 'border-red-500 bg-red-50',
  info: 'border-blue-500 bg-blue-50',
};

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`flex items-center justify-between w-72 p-4 rounded-lg border ${toastStyles[toast.type]}`}
          >
            <div className="flex items-center space-x-3">
              {toastIcons[toast.type]}
              <p className="text-sm text-gray-900">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}