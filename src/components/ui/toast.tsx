import { Toast, toast as hotToast } from 'react-hot-toast';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  toast: Toast;
  title: string;
  description?: string;
  type?: ToastType;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />
};

const styles = {
  success: 'border-green-500 bg-green-50',
  error: 'border-red-500 bg-red-50',
  warning: 'border-yellow-500 bg-yellow-50',
  info: 'border-blue-500 bg-blue-50'
};

export function ToastComponent({
  toast,
  title,
  description,
  type = 'info',
  className,
  ...props
}: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        'flex w-full max-w-md items-center space-x-4 rounded-lg border p-4 shadow-lg',
        styles[type],
        toast.visible ? 'animate-enter' : 'animate-leave',
        className
      )}
      {...props}
    >
      {icons[type]}
      <div className="flex-1">
        <motion.h3 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-medium text-gray-900"
        >
          {title}
        </motion.h3>
        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-1 text-sm text-gray-500"
          >
            {description}
          </motion.p>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => hotToast.dismiss(toast.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}

export const toast = {
  success: (title: string, description?: string) =>
    hotToast.custom((t) => (
      <ToastComponent toast={t} title={title} description={description} type="success" />
    )),
  
  error: (title: string, description?: string) =>
    hotToast.custom((t) => (
      <ToastComponent toast={t} title={title} description={description} type="error" />
    )),
  
  warning: (title: string, description?: string) =>
    hotToast.custom((t) => (
      <ToastComponent toast={t} title={title} description={description} type="warning" />
    )),
  
  info: (title: string, description?: string) =>
    hotToast.custom((t) => (
      <ToastComponent toast={t} title={title} description={description} type="info" />
    ))
};