import { create } from 'zustand';
import type { ChatMessage } from '../../../types';

interface ChatState {
  messages: ChatMessage[];
  conversations: {
    id: string;
    participants: string[];
    lastMessage?: ChatMessage;
  }[];
  sendMessage: (message: ChatMessage) => void;
  createConversation: (participants: string[]) => string;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'user1',
    content: 'Olá, como está o andamento do projeto?',
    timestamp: new Date('2024-02-15T10:00:00'),
    type: 'text'
  },
  {
    id: '2',
    senderId: 'user2',
    content: 'Está progredindo bem! Já finalizamos a fase inicial.',
    timestamp: new Date('2024-02-15T10:02:00'),
    type: 'text'
  },
  {
    id: '3',
    senderId: 'user1',
    content: 'Ótimo! Podemos agendar uma reunião para discutir os próximos passos?',
    timestamp: new Date('2024-02-15T10:05:00'),
    type: 'text'
  }
];

const mockConversations = [
  {
    id: '1',
    participants: ['user1', 'user2'],
    lastMessage: mockMessages[2]
  },
  {
    id: '2',
    participants: ['user1', 'user3'],
    lastMessage: {
      id: '4',
      senderId: 'user3',
      content: 'Documentação atualizada disponível',
      timestamp: new Date('2024-02-14T15:30:00'),
      type: 'text'
    }
  }
];

export const useChatStore = create<ChatState>((set) => ({
  messages: mockMessages,
  conversations: mockConversations,
  sendMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      conversations: state.conversations.map((conv) =>
        conv.id === message.conversationId
          ? { ...conv, lastMessage: message }
          : conv
      ),
    })),
  createConversation: (participants) => {
    const id = crypto.randomUUID();
    set((state) => ({
      conversations: [...state.conversations, { id, participants }],
    }));
    return id;
  },
}));