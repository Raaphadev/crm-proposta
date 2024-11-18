import { useToast } from './useToast';

export function useErrorHandler() {
  const toast = useToast();

  const handleError = (error: unknown) => {
    console.error('Error:', error);
    
    if (error instanceof Error) {
      toast.error('Erro', error.message);
    } else {
      toast.error('Erro', 'Ocorreu um erro inesperado');
    }
  };

  return { handleError };
}