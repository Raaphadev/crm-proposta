import { create } from 'zustand';
import type { Lead, Pipeline, Deal, Contact } from '../types';

interface CrmState {
  leads: Lead[];
  pipelines: Pipeline[];
  deals: Deal[];
  contacts: Contact[];
  setLeads: (leads: Lead[]) => void;
  setPipelines: (pipelines: Pipeline[]) => void;
  setDeals: (deals: Deal[]) => void;
  setContacts: (contacts: Contact[]) => void;
  addLead: (lead: Lead) => void;
  addDeal: (deal: Deal) => void;
  updateDeal: (id: string, deal: Partial<Deal>) => void;
  moveDeal: (dealId: string, newStageId: string) => void;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '(11) 98765-4321',
    company: 'Tech Solutions',
    status: 'new',
    assignedTo: 'user1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@corporacao.com',
    phone: '(11) 91234-5678',
    company: 'Corporação ABC',
    status: 'contacted',
    assignedTo: 'user2',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-03')
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@startup.com',
    phone: '(11) 99876-5432',
    company: 'Startup XYZ',
    status: 'qualified',
    assignedTo: 'user1',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12')
  }
];

const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Projeto ERP',
    value: 150000,
    currency: 'BRL',
    contactId: '1',
    stageId: 'proposal',
    assignedTo: 'user1',
    expectedCloseDate: new Date('2024-03-30'),
    probability: 0.7,
    notes: 'Cliente interessado em implementação completa',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '2',
    title: 'Consultoria Tech',
    value: 75000,
    currency: 'BRL',
    contactId: '2',
    stageId: 'negotiation',
    assignedTo: 'user2',
    expectedCloseDate: new Date('2024-04-15'),
    probability: 0.85,
    notes: 'Aguardando aprovação final do orçamento',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    title: 'Desenvolvimento Mobile',
    value: 95000,
    currency: 'BRL',
    contactId: '3',
    stageId: 'qualified',
    assignedTo: 'user1',
    expectedCloseDate: new Date('2024-05-01'),
    probability: 0.6,
    notes: 'Desenvolvimento de app iOS e Android',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-15')
  }
];

export const useCrmStore = create<CrmState>((set) => ({
  leads: mockLeads,
  pipelines: [
    {
      id: 'default',
      name: 'Sales Pipeline',
      stages: [
        { id: 'new', name: 'New', order: 0, color: 'bg-gray-500' },
        { id: 'contacted', name: 'Contacted', order: 1, color: 'bg-blue-500' },
        { id: 'qualified', name: 'Qualified', order: 2, color: 'bg-indigo-500' },
        { id: 'proposal', name: 'Proposal', order: 3, color: 'bg-purple-500' },
        { id: 'negotiation', name: 'Negotiation', order: 4, color: 'bg-yellow-500' },
        { id: 'won', name: 'Won', order: 5, color: 'bg-green-500' },
        { id: 'lost', name: 'Lost', order: 6, color: 'bg-red-500' },
      ],
    },
  ],
  deals: mockDeals,
  contacts: [],
  setLeads: (leads) => set({ leads }),
  setPipelines: (pipelines) => set({ pipelines }),
  setDeals: (deals) => set({ deals }),
  setContacts: (contacts) => set({ contacts }),
  addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
  addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
  updateDeal: (id, updatedDeal) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === id ? { ...deal, ...updatedDeal } : deal
      ),
    })),
  moveDeal: (dealId, newStageId) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === dealId ? { ...deal, stageId: newStageId } : deal
      ),
    })),
}));