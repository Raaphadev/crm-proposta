import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useToast } from './useToast';

export function useFormError<T extends FieldValues>(form: UseFormReturn<T>) {
  const toast = useToast();
  const { formState: { errors } } = form;

  const showFormErrors = () => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error('Erro de Validação', firstError.message as string);
    }
  };

  return { showFormErrors };
}