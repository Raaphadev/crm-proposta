import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export function FormField({
  name,
  label,
  description,
  required,
  children,
  className,
  ...props
}: FormFieldProps) {
  const { formState: { errors, dirtyFields } } = useFormContext();
  const error = errors[name];
  const isDirty = dirtyFields[name];

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {label && (
        <label htmlFor={name} className="flex items-center text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {children}
        <AnimatePresence>
          {isDirty && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-success"
            >
              <CheckCircle className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error?.message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center space-x-1 text-destructive text-sm overflow-hidden"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error.message as string}</span>
          </motion.div>
        )}
      </AnimatePresence>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  form: ReturnType<typeof useFormContext>;
  onSubmit: (data: any) => void;
}

export function Form({ form, onSubmit, children, className, ...props }: FormProps) {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
      {...props}
    >
      {children}
    </form>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ icon, className, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          icon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
}

export function Select({ options, className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className={cn(
          "rounded border-input text-primary focus:ring-primary",
          className
        )}
        {...props}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  options: Array<{ value: string; label: string }>;
  name: string;
}

export function RadioGroup({ options, name, className, ...props }: RadioGroupProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {options.map(({ value, label }) => (
        <label key={value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={value}
            className="text-primary focus:ring-primary"
          />
          <span className="text-sm">{label}</span>
        </label>
      ))}
    </div>
  );
}

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="bg-card p-4 rounded-lg border border-border">
        {children}
      </div>
    </div>
  );
}