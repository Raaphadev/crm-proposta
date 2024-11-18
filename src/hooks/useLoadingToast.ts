import { useToast } from './useToast';
import { useCallback } from 'react';

export function useLoadingToast() {
  const toast = useToast();

  const promise = useCallback(
    async <T,>(
      promise: Promise<T>,
      {
        loading = 'Carregando...',
        success = 'Operação concluída',
        error = 'Ocorreu um erro'
      }: {
        loading?: string;
        success?: string;
        error?: string;
      } = {}
    ) => {
      const toastId = toast.loading(loading);

      try {
        const result = await promise;
        toast.success('Sucesso', success);
        return result;
      } catch (err) {
        toast.error('Erro', error);
        throw err;
      } finally {
        toast.dismiss(toastId);
      }
    },
    [toast]
  );

  return { promise };
}