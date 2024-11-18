import { z } from 'zod';

export const proposalSchema = z.object({
  title: z.string()
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  clientName: z.string()
    .min(3, 'Nome do cliente deve ter no mínimo 3 caracteres')
    .max(100, 'Nome do cliente deve ter no máximo 100 caracteres'),
  value: z.number()
    .min(0, 'Valor deve ser positivo')
    .max(1000000000, 'Valor muito alto'),
  description: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(5000, 'Descrição deve ter no máximo 5000 caracteres'),
  validUntil: z.string()
    .refine((date) => new Date(date) > new Date(), {
      message: 'Data de validade deve ser no futuro'
    }),
  terms: z.string()
    .min(10, 'Termos devem ter no mínimo 10 caracteres')
    .max(10000, 'Termos devem ter no máximo 10000 caracteres')
});

export type ProposalFormData = z.infer<typeof proposalSchema>;