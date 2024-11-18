import { create } from 'zustand';
import type { Message } from '../types';

interface AIState {
  messages: Message[];
  isProcessing: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
}

// Mock responses for development
const mockResponses = [
  "Entendi sua solicitação. Posso ajudar com isso!",
  "Baseado nas informações fornecidas, sugiro...",
  "Vou analisar os dados e retornar com uma recomendação.",
  "Isso é interessante! Deixa eu te explicar melhor..."
];

const getRandomResponse = () => {
  const index = Math.floor(Math.random() * mockResponses.length);
  return mockResponses[index];
};

export const useAIStore = create<AIState>((set, get) => ({
  messages: [],
  isProcessing: false,
  error: null,

  sendMessage: async (content: string) => {
    try {
      set({ isProcessing: true, error: null });
      const messages = [...get().messages, { role: 'user', content }];

      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResponse = getRandomResponse();

      set({
        messages: [...messages, { role: 'assistant', content: mockResponse }],
        isProcessing: false
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      set({ 
        isProcessing: false,
        error: 'Falha ao processar mensagem. Tente novamente.'
      });
    }
  }
}));