import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Save, Play, Pause } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { useToast } from '../../../hooks/useToast';
import { automationApi } from '../../../lib/api/automation';

const triggerSchema = z.object({
  type: z.enum(['deal_stage_changed', 'proposal_status_changed', 'new_lead_created']),
  conditions: z.record(z.any())
});

const actionSchema = z.object({
  type: z.enum(['send_email', 'create_task', 'notify_user', 'update_field']),
  params: z.record(z.any())
});

const automationSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  trigger: triggerSchema,
  actions: z.array(actionSchema).min(1, 'Adicione pelo menos uma ação')
});

type AutomationFormData = z.infer<typeof automationSchema>;

export function AutomationBuilder() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AutomationFormData>({
    resolver: zodResolver(automationSchema),
    defaultValues: {
      actions: []
    }
  });
  const toast = useToast();

  const onSubmit = async (data: AutomationFormData) => {
    try {
      await automationApi.createRule({
        ...data,
        isActive: true
      });
      toast.success('Automação criada com sucesso');
    } catch (error) {
      toast.error('Erro ao criar automação');
    }
  };

  const addAction = () => {
    const actions = watch('actions') || [];
    setValue('actions', [
      ...actions,
      { type: 'send_email', params: {} }
    ]);
  };

  return (
    <Card>
      <Card.Header>
        <h2 className="text-lg font-semibold">Nova Automação</h2>
      </Card.Header>

      <Card.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome da Automação
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Ex: Enviar email de boas-vindas"
              />
            </label>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gatilho
              <select
                {...register('trigger.type')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="new_lead_created">Novo Lead Criado</option>
                <option value="deal_stage_changed">Estágio do Negócio Alterado</option>
                <option value="proposal_status_changed">Status da Proposta Alterado</option>
              </select>
            </label>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Ações</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAction}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Ação
              </Button>
            </div>

            {watch('actions')?.map((action, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <select
                  {...register(`actions.${index}.type`)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="send_email">Enviar Email</option>
                  <option value="create_task">Criar Tarefa</option>
                  <option value="notify_user">Notificar Usuário</option>
                  <option value="update_field">Atualizar Campo</option>
                </select>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Salvar Automação
            </Button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
}