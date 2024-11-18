import { Deal } from '../../modules/crm/types';

export const analyticsApi = {
  async getDashboardMetrics() {
    // Simula chamada API
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      totalDeals: 157,
      totalRevenue: 1250000,
      averageTicket: 7961.78,
      conversionRate: 32.5,
      metrics: {
        daily: {
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          data: [12, 19, 15, 22, 18, 8, 5]
        },
        monthly: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          data: [65, 72, 85, 92, 88, 95]
        }
      }
    };
  },

  async getDealsAnalytics() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      stageDistribution: {
        labels: ['Novo', 'Qualificado', 'Proposta', 'Negociação', 'Fechado'],
        data: [30, 25, 20, 15, 10]
      },
      conversionBySource: {
        labels: ['Site', 'Indicação', 'LinkedIn', 'Email', 'Outros'],
        data: [40, 25, 15, 12, 8]
      },
      salesForecast: {
        labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        data: [120000, 150000, 180000, 200000, 220000, 250000]
      }
    };
  }
};