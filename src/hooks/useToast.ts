import { toast } from '../components/ui/toast';

export function useToast() {
  return {
    success: (title: string, description?: string) => toast.success(title, description),
    error: (title: string, description?: string) => toast.error(title, description),
    warning: (title: string, description?: string) => toast.warning(title, description),
    info: (title: string, description?: string) => toast.info(title, description)
  };
}