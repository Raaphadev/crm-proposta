import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proposalSchema, type ProposalFormData } from '../../../lib/validations/proposal';
import { useProposalQueries } from '../hooks/useProposalQueries';
import { Form, FormField } from '../../../components/ui/form';
import { Button } from '../../../components/ui/button';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { useToast } from '../../../hooks/useToast';

interface ProposalFormProps {
  onCancel: () => void;
}

export function ProposalForm({ onCancel }: ProposalFormProps) {
  const { createProposal } = useProposalQueries();
  const toast = useToast();

  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      value: 0
    },
    mode: 'onChange'
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ProposalFormData) => {
    try {
      await createProposal({
        ...data,
        status: 'draft',
        templateId: 'default'
      });
      toast.success('Proposta criada', 'A proposta foi criada com sucesso');
      onCancel();
    } catch (error) {
      toast.error('Erro', 'Não foi possível criar a proposta');
    }
  };

  return (
    <FormProvider {...form}>
      <Form form={form} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            name="title"
            label="Título"
            description="Digite um título descritivo para a proposta"
          >
            <input
              type="text"
              {...form.register('title')}
              className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: Desenvolvimento de Website"
            />
          </FormField>

          <FormField
            name="clientName"
            label="Cliente"
            description="Nome completo do cliente ou empresa"
          >
            <input
              type="text"
              {...form.register('clientName')}
              className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: Empresa LTDA"
            />
          </FormField>

          <FormField
            name="value"
            label="Valor"
            description="Valor total da proposta"
          >
            <input
              type="number"
              {...form.register('value', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="0,00"
              step="0.01"
              min="0"
            />
          </FormField>

          <FormField
            name="validUntil"
            label="Válido até"
            description="Data de validade da proposta"
          >
            <input
              type="date"
              {...form.register('validUntil')}
              className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
        </div>

        <FormField
          name="description"
          label="Descrição"
          description="Descreva detalhadamente os produtos/serviços oferecidos"
        >
          <textarea
            {...form.register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Descreva os detalhes da proposta..."
          />
        </FormField>

        <FormField
          name="terms"
          label="Termos e Condições"
          description="Defina os termos e condições da proposta"
        >
          <textarea
            {...form.register('terms')}
            rows={4}
            className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Digite os termos e condições..."
          />
        </FormField>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Criando...
              </>
            ) : (
              'Criar Proposta'
            )}
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
}