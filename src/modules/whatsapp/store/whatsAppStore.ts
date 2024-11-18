import { create } from 'zustand';

interface WhatsAppMessage {
  id: string;
  contactId: string;
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'received';
  type: 'text' | 'image' | 'file' | 'template';
  metadata?: Record<string, any>;
}

interface WhatsAppContact {
  id: string;
  name: string;
  phone: string;
  profilePic?: string;
  lastMessage?: WhatsAppMessage;
}

interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
  status: 'pending' | 'approved' | 'rejected';
}

interface WhatsAppAccount {
  id: string;
  phoneNumber: string;
  name: string;
  status: 'connected' | 'disconnected';
  businessProfile?: {
    name: string;
    description: string;
    address: string;
    email: string;
    websites: string[];
  };
}

interface WhatsAppState {
  messages: WhatsAppMessage[];
  contacts: WhatsAppContact[];
  templates: WhatsAppTemplate[];
  accounts: WhatsAppAccount[];
  activeAccountId: string | null;
  isConnected: boolean;
  sendMessage: (message: Omit<WhatsAppMessage, 'id' | 'timestamp' | 'status'>) => Promise<void>;
  sendTemplate: (templateId: string, contactId: string, variables: Record<string, string>) => Promise<void>;
  connectAccount: (phoneNumber: string) => Promise<void>;
  disconnectAccount: (accountId: string) => Promise<void>;
  createTemplate: (template: Omit<WhatsAppTemplate, 'id' | 'status'>) => Promise<void>;
}

const mockTemplates: WhatsAppTemplate[] = [
  {
    id: '1',
    name: 'Boas-vindas',
    content: 'Olá {{nome}}, seja bem-vindo(a) à {{empresa}}! Como podemos ajudar?',
    variables: ['nome', 'empresa'],
    status: 'approved'
  },
  {
    id: '2',
    name: 'Confirmação de Reunião',
    content: 'Confirmando nossa reunião para {{data}} às {{hora}}. Tema: {{assunto}}',
    variables: ['data', 'hora', 'assunto'],
    status: 'approved'
  },
  {
    id: '3',
    name: 'Proposta Comercial',
    content: 'Prezado(a) {{nome}}, sua proposta no valor de {{valor}} está disponível para análise.',
    variables: ['nome', 'valor'],
    status: 'pending'
  }
];

const mockContacts: WhatsAppContact[] = [
  {
    id: '1',
    name: 'João Cliente',
    phone: '+5511987654321',
    profilePic: 'https://ui-avatars.com/api/?name=João+Cliente'
  },
  {
    id: '2',
    name: 'Maria Empresa',
    phone: '+5511912345678',
    profilePic: 'https://ui-avatars.com/api/?name=Maria+Empresa'
  }
];

const mockMessages: WhatsAppMessage[] = [
  {
    id: '1',
    contactId: '1',
    content: 'Olá, gostaria de mais informações sobre os serviços',
    timestamp: new Date('2024-02-15T09:00:00'),
    status: 'read',
    type: 'text'
  },
  {
    id: '2',
    contactId: '1',
    content: 'Claro! Vou te enviar nossa apresentação comercial.',
    timestamp: new Date('2024-02-15T09:05:00'),
    status: 'delivered',
    type: 'text'
  }
];

export const useWhatsAppStore = create<WhatsAppState>((set, get) => ({
  messages: mockMessages,
  contacts: mockContacts,
  templates: mockTemplates,
  accounts: [],
  activeAccountId: null,
  isConnected: false,

  sendMessage: async (message) => {
    try {
      const newMessage: WhatsAppMessage = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        status: 'sending',
        ...message,
      };

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));

      setTimeout(() => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === newMessage.id ? { ...m, status: 'sent' } : m
          ),
        }));
      }, 1000);

      setTimeout(() => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === newMessage.id ? { ...m, status: 'delivered' } : m
          ),
        }));
      }, 2000);
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
    }
  },

  sendTemplate: async (templateId, contactId, variables) => {
    try {
      const template = get().templates.find((t) => t.id === templateId);
      if (!template) throw new Error('Template not found');

      let content = template.content;
      Object.entries(variables).forEach(([key, value]) => {
        content = content.replace(`{{${key}}}`, value);
      });

      await get().sendMessage({
        contactId,
        content,
        type: 'template',
        metadata: { templateId, variables },
      });
    } catch (error) {
      console.error('Failed to send template message:', error);
    }
  },

  connectAccount: async (phoneNumber) => {
    try {
      const newAccount: WhatsAppAccount = {
        id: crypto.randomUUID(),
        phoneNumber,
        name: `Business Account ${phoneNumber}`,
        status: 'connected',
      };

      set((state) => ({
        accounts: [...state.accounts, newAccount],
        activeAccountId: newAccount.id,
        isConnected: true,
      }));
    } catch (error) {
      console.error('Failed to connect WhatsApp account:', error);
    }
  },

  disconnectAccount: async (accountId) => {
    try {
      set((state) => ({
        accounts: state.accounts.map((acc) =>
          acc.id === accountId ? { ...acc, status: 'disconnected' } : acc
        ),
        activeAccountId: state.activeAccountId === accountId ? null : state.activeAccountId,
        isConnected: state.activeAccountId === accountId ? false : state.isConnected,
      }));
    } catch (error) {
      console.error('Failed to disconnect WhatsApp account:', error);
    }
  },

  createTemplate: async (template) => {
    try {
      const newTemplate: WhatsAppTemplate = {
        id: crypto.randomUUID(),
        status: 'pending',
        ...template,
      };

      set((state) => ({
        templates: [...state.templates, newTemplate],
      }));
    } catch (error) {
      console.error('Failed to create template:', error);
    }
  },
}));