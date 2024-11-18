import { create } from 'zustand';
import type { Proposal, ProposalTemplate } from '../types';

interface ProposalState {
  proposals: Proposal[];
  templates: ProposalTemplate[];
  createProposal: (proposal: Proposal) => void;
  updateProposal: (id: string, proposal: Partial<Proposal>) => void;
  deleteProposal: (id: string) => void;
  createTemplate: (template: ProposalTemplate) => void;
  updateTemplate: (id: string, template: Partial<ProposalTemplate>) => void;
  deleteTemplate: (id: string) => void;
}

const defaultTemplate: ProposalTemplate = {
  id: 'default',
  name: 'Modelo Padrão',
  description: 'Modelo padrão de proposta comercial',
  fields: [
    {
      id: 'title',
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      order: 0,
      placeholder: 'Digite o título da proposta'
    },
    {
      id: 'clientName',
      name: 'clientName',
      label: 'Nome do Cliente',
      type: 'text',
      required: true,
      order: 1,
      placeholder: 'Nome do cliente ou empresa'
    },
    {
      id: 'value',
      name: 'value',
      label: 'Valor',
      type: 'currency',
      required: true,
      order: 2
    },
    {
      id: 'description',
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      required: true,
      order: 3,
      placeholder: 'Descreva os detalhes da proposta'
    },
    {
      id: 'validUntil',
      name: 'validUntil',
      label: 'Válido até',
      type: 'date',
      required: true,
      order: 4
    }
  ],
  style: {
    headerColor: '#2AA3B5',
    headerTextColor: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    showLogo: true,
    useCustomHeader: false
  },
  isDefault: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const useProposalStore = create<ProposalState>((set) => ({
  proposals: [],
  templates: [defaultTemplate],
  
  createProposal: (proposal) => 
    set((state) => ({
      proposals: [...state.proposals, proposal]
    })),
  
  updateProposal: (id, updatedProposal) =>
    set((state) => ({
      proposals: state.proposals.map((proposal) =>
        proposal.id === id
          ? { ...proposal, ...updatedProposal, updatedAt: new Date() }
          : proposal
      )
    })),
  
  deleteProposal: (id) =>
    set((state) => ({
      proposals: state.proposals.filter((proposal) => proposal.id !== id)
    })),

  createTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template]
    })),

  updateTemplate: (id, updatedTemplate) =>
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === id
          ? { ...template, ...updatedTemplate, updatedAt: new Date() }
          : template
      )
    })),

  deleteTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((template) => template.id !== id)
    }))
}));