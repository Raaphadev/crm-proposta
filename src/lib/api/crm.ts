import type { Deal, Pipeline, Lead } from '../../modules/crm/types';

// Simula uma API com delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const crmApi = {
  getDeals: async (): Promise<Deal[]> => {
    await delay(1000);
    return JSON.parse(localStorage.getItem('deals') || '[]');
  },

  getDeal: async (id: string): Promise<Deal | null> => {
    await delay(500);
    const deals = JSON.parse(localStorage.getItem('deals') || '[]');
    return deals.find((deal: Deal) => deal.id === id) || null;
  },

  updateDeal: async (id: string, data: Partial<Deal>): Promise<Deal> => {
    await delay(500);
    const deals = JSON.parse(localStorage.getItem('deals') || '[]');
    const index = deals.findIndex((deal: Deal) => deal.id === id);
    if (index === -1) throw new Error('Deal not found');
    
    deals[index] = { ...deals[index], ...data, updatedAt: new Date() };
    localStorage.setItem('deals', JSON.stringify(deals));
    return deals[index];
  },

  moveDeal: async (dealId: string, stageId: string): Promise<Deal> => {
    await delay(500);
    const deals = JSON.parse(localStorage.getItem('deals') || '[]');
    const index = deals.findIndex((deal: Deal) => deal.id === dealId);
    if (index === -1) throw new Error('Deal not found');
    
    deals[index] = { ...deals[index], stageId, updatedAt: new Date() };
    localStorage.setItem('deals', JSON.stringify(deals));
    return deals[index];
  },

  getPipelines: async (): Promise<Pipeline[]> => {
    await delay(1000);
    return JSON.parse(localStorage.getItem('pipelines') || '[]');
  },

  getLeads: async (): Promise<Lead[]> => {
    await delay(1000);
    return JSON.parse(localStorage.getItem('leads') || '[]');
  }
};