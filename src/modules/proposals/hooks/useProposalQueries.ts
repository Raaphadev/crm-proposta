import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { proposalsApi } from '../../../lib/api/proposals';
import { useToast } from '../../../hooks/useToast';
import type { Proposal } from '../types';

export const CACHE_KEYS = {
  proposals: ['proposals'],
  templates: ['proposalTemplates'],
  proposal: (id: string) => ['proposals', id]
};

export function useProposalQueries() {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Queries
  const proposalsQuery = useQuery({
    queryKey: CACHE_KEYS.proposals,
    queryFn: proposalsApi.getProposals,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const templatesQuery = useQuery({
    queryKey: CACHE_KEYS.templates,
    queryFn: proposalsApi.getTemplates,
    staleTime: 1000 * 60 * 30 // 30 minutes
  });

  // Mutations
  const createProposalMutation = useMutation({
    mutationFn: (data: Omit<Proposal, 'id' | 'createdAt' | 'updatedAt'>) =>
      proposalsApi.createProposal(data),
    onSuccess: (newProposal) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEYS.proposals });
      toast.success('Sucesso', 'Proposta criada com sucesso');
    },
    onError: () => {
      toast.error('Erro', 'Não foi possível criar a proposta');
    }
  });

  return {
    // Queries
    proposals: proposalsQuery.data || [],
    templates: templatesQuery.data || [],
    isLoading: proposalsQuery.isLoading || templatesQuery.isLoading,
    
    // Mutations
    createProposal: createProposalMutation.mutate,
    
    // Refetch functions
    refetchProposals: () => queryClient.invalidateQueries({ queryKey: CACHE_KEYS.proposals }),
    refetchTemplates: () => queryClient.invalidateQueries({ queryKey: CACHE_KEYS.templates })
  };
}