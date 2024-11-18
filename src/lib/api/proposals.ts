import type { Proposal, ProposalTemplate } from '../../modules/proposals/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const proposalsApi = {
  getProposals: async (): Promise<Proposal[]> => {
    await delay(1000);
    return JSON.parse(localStorage.getItem('proposals') || '[]');
  },

  getProposal: async (id: string): Promise<Proposal | null> => {
    await delay(500);
    const proposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    return proposals.find((proposal: Proposal) => proposal.id === id) || null;
  },

  createProposal: async (data: Omit<Proposal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Proposal> => {
    await delay(500);
    const proposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    const newProposal: Proposal = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    proposals.push(newProposal);
    localStorage.setItem('proposals', JSON.stringify(proposals));
    return newProposal;
  },

  getTemplates: async (): Promise<ProposalTemplate[]> => {
    await delay(1000);
    return JSON.parse(localStorage.getItem('proposalTemplates') || '[]');
  }
};