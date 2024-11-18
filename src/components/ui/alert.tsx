import * as React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  title?: string;
}

const icons = {
  default: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
};

const styles = {
  default: 'border-blue-500/30 bg-blue-500/10 text-blue-700',
  success: 'border-green-500/30 bg-green-500/10 text-green-700',
  warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700',
  error: 'border-red-500/30 bg-red-500/10 text-red-700',
};

export function Alert({
  className,
  variant = 'default',
  title,
  children,
  ...props
}: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4',
        styles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          <div className="text-sm [&_p]:leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}