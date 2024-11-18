export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position?: string;
  lastContact?: Date;
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  currency: string;
  contactId: string;
  stageId: string;
  assignedTo: string;
  expectedCloseDate?: Date;
  probability?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}