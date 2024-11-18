interface AutomationRule {
  id: string;
  name: string;
  trigger: {
    type: 'deal_stage_changed' | 'proposal_status_changed' | 'new_lead_created';
    conditions: Record<string, any>;
  };
  actions: Array<{
    type: 'send_email' | 'create_task' | 'notify_user' | 'update_field';
    params: Record<string, any>;
  }>;
  isActive: boolean;
}

export const automationApi = {
  async getRules(): Promise<AutomationRule[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
      {
        id: '1',
        name: 'Enviar email de boas-vindas',
        trigger: {
          type: 'new_lead_created',
          conditions: {}
        },
        actions: [
          {
            type: 'send_email',
            params: {
              template: 'welcome_email',
              delay: 0
            }
          }
        ],
        isActive: true
      }
    ];
  },

  async createRule(rule: Omit<AutomationRule, 'id'>): Promise<AutomationRule> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: crypto.randomUUID(),
      ...rule
    };
  },

  async toggleRule(id: string, isActive: boolean): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};