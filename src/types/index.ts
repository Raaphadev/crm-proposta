export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'collaborator' | 'client';
  permissions: string[];
  avatar?: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  metadata?: Record<string, any>;
}