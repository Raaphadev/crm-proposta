import { User } from '../../../types';

const MOCK_USER: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'admin',
  permissions: [
    'crm.access',
    'chat.access',
    'whatsapp.access',
    'reports.access',
    'proposals.access',
    'contracts.access',
    'ai.access'
  ],
  avatar: 'https://ui-avatars.com/api/?name=Demo+User'
};

const MOCK_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'demo1234'
};

export async function mockLogin(email: string, password: string): Promise<{ user: User; token: string }> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    const token = btoa(JSON.stringify({ userId: MOCK_USER.id, exp: Date.now() + 24 * 60 * 60 * 1000 }));
    return { user: MOCK_USER, token };
  }

  throw new Error('Invalid credentials');
}