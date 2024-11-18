export interface ProposalField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea' | 'select' | 'currency';
  required: boolean;
  options?: string[]; // Para campos do tipo select
  defaultValue?: string | number;
  placeholder?: string;
  order: number;
}

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  fields: ProposalField[];
  style: {
    headerColor: string;
    headerTextColor: string;
    fontFamily: string;
    fontSize: string;
    logo?: string;
    showLogo: boolean;
    footerText?: string;
    useCustomHeader: boolean;
    customHeader?: string;
  };
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Proposal {
  id: string;
  templateId: string;
  title: string;
  clientName: string;
  value: number;
  description: string;
  validUntil: string;
  terms: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  fields: Record<string, any>; // Campos dinâmicos baseados no template
  createdAt: Date;
  updatedAt: Date;
}