import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormValidationProps {
  name: string;
}

export function FormValidation({ name }: FormValidationProps) {
  const { formState: { errors } } = useFormContext();
  const error = errors[name];

  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-2 mt-1 text-sm text-destructive"
    >
      <AlertCircle className="w-4 h-4" />
      <span>{error.message as string}</span>
    </motion.div>
  );
}