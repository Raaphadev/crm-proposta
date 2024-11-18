import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-card text-card-foreground rounded-lg border border-border shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

Card.Header = function CardHeader({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Content = function CardContent({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};