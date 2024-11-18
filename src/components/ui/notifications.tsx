import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

interface NotificationsProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onClearAll: () => void;
}

export function Notifications({ notifications, onDismiss, onClearAll }: NotificationsProps) {
  return (
    <div className="fixed right-4 top-4 z-50 w-96 space-y-4">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={cn(
              "relative bg-white rounded-lg shadow-lg border p-4",
              notification.type === 'info' && "border-blue-500",
              notification.type === 'success' && "border-green-500",
              notification.type === 'warning' && "border-yellow-500",
              notification.type === 'error' && "border-red-500"
            )}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Bell className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {notification.message}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => onDismiss(notification.id)}
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {notifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
          <button
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        </motion.div>
      )}
    </div>
  );
}