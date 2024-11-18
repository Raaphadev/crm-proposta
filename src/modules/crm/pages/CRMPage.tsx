import React from 'react';
import { Pipeline } from '../components/Pipeline';
import { LeadsList } from '../components/LeadsList';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';

export function CRMPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { handleError } = useErrorHandler();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        // Simular carregamento de dados
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        handleError(error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [handleError]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">CRM</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Pipeline />
        </div>
        <div>
          <LeadsList />
        </div>
      </div>
    </div>
  );
}