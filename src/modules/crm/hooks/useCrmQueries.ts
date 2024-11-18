import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { crmApi } from '../../../lib/api/crm';
import { useToast } from '../../../hooks/useToast';
import type { Deal } from '../types';

export const CACHE_KEYS = {
  deals: ['deals'],
  pipelines: ['pipelines'],
  leads: ['leads'],
  deal: (id: string) => ['deals', id]
};

export function useCrmQueries() {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Queries
  const dealsQuery = useQuery({
    queryKey: CACHE_KEYS.deals,
    queryFn: crmApi.getDeals,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const pipelinesQuery = useQuery({
    queryKey: CACHE_KEYS.pipelines,
    queryFn: crmApi.getPipelines,
    staleTime: 1000 * 60 * 30 // 30 minutes
  });

  const leadsQuery = useQuery({
    queryKey: CACHE_KEYS.leads,
    queryFn: crmApi.getLeads,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Mutations
  const updateDealMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Deal> }) =>
      crmApi.updateDeal(id, data),
    onSuccess: (updatedDeal) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEYS.deals });
      queryClient.setQueryData(CACHE_KEYS.deal(updatedDeal.id), updatedDeal);
      toast.success('Sucesso', 'Negócio atualizado com sucesso');
    },
    onError: () => {
      toast.error('Erro', 'Não foi possível atualizar o negócio');
    }
  });

  const moveDealMutation = useMutation({
    mutationFn: ({ dealId, stageId }: { dealId: string; stageId: string }) =>
      crmApi.moveDeal(dealId, stageId),
    onSuccess: (updatedDeal) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEYS.deals });
      queryClient.setQueryData(CACHE_KEYS.deal(updatedDeal.id), updatedDeal);
      
      const stage = pipelinesQuery.data?.[0].stages.find(s => s.id === updatedDeal.stageId);
      if (stage) {
        toast.success(
          'Negócio movido',
          `${updatedDeal.title} foi movido para ${stage.name}`
        );
      }
    },
    onError: () => {
      toast.error('Erro', 'Não foi possível mover o negócio');
    }
  });

  return {
    // Queries
    deals: dealsQuery.data || [],
    pipelines: pipelinesQuery.data || [],
    leads: leadsQuery.data || [],
    isLoading: dealsQuery.isLoading || pipelinesQuery.isLoading || leadsQuery.isLoading,
    
    // Mutations
    updateDeal: updateDealMutation.mutate,
    moveDeal: moveDealMutation.mutate,
    
    // Refetch functions
    refetchDeals: () => queryClient.invalidateQueries({ queryKey: CACHE_KEYS.deals }),
    refetchPipelines: () => queryClient.invalidateQueries({ queryKey: CACHE_KEYS.pipelines }),
    refetchLeads: () => queryClient.invalidateQueries({ queryKey: CACHE_KEYS.leads })
  };
}