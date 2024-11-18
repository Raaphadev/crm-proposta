import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, GripVertical, Settings } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Dialog } from '../../../components/ui/dialog';
import { useProposalStore } from '../store/proposalStore';
import type { ProposalTemplate, ProposalField } from '../types';

const fieldSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome é obrigatório'),
  label: z.string().min(1, 'Rótulo é obrigatório'),
  type: z.enum(['text', 'number', 'date', 'textarea', 'select', 'currency']),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
  defaultValue: z.union([z.string(), z.number()]).optional(),
  placeholder: z.string().optional(),
  order: z.number()
});

const templateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string(),
  fields: z.array(fieldSchema),
  style: z.object({
    headerColor: z.string(),
    headerTextColor: z.string(),
    fontFamily: z.string(),
    fontSize: z.string(),
    logo: z.string().optional(),
    showLogo: z.boolean(),
    footerText: z.string().optional(),
    useCustomHeader: z.boolean(),
    customHeader: z.string().optional()
  })
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface TemplateEditorProps {
  template?: ProposalTemplate;
  onClose: () => void;
}

export function TemplateEditor({ template, onClose }: TemplateEditorProps) {
  const { createTemplate, updateTemplate } = useProposalStore();
  const [showStyleEditor, setShowStyleEditor] = React.useState(false);

  const { register, control, handleSubmit, formState: { errors } } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: template || {
      name: '',
      description: '',
      fields: [],
      style: {
        headerColor: '#2AA3B5',
        headerTextColor: '#FFFFFF',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        showLogo: true,
        useCustomHeader: false
      }
    }
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'fields'
  });

  const onSubmit = (data: TemplateFormData) => {
    const templateData: ProposalTemplate = {
      id: template?.id || crypto.randomUUID(),
      ...data,
      isDefault: false,
      createdAt: template?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (template) {
      updateTemplate(template.id, templateData);
    } else {
      createTemplate(templateData);
    }
    onClose();
  };

  const addField = () => {
    const newField: ProposalField = {
      id: crypto.randomUUID(),
      name: '',
      label: '',
      type: 'text',
      required: false,
      order: fields.length
    };
    append(newField);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do Modelo
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </label>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Campos do Modelo</h3>
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowStyleEditor(true)}
                leftIcon={<Settings className="w-4 h-4" />}
              >
                Estilo
              </Button>
              <Button
                type="button"
                onClick={addField}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Adicionar Campo
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <button
                  type="button"
                  className="mt-2 text-gray-400 hover:text-gray-600"
                >
                  <GripVertical className="w-5 h-5" />
                </button>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nome do Campo
                      <input
                        type="text"
                        {...register(`fields.${index}.name`)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rótulo
                      <input
                        type="text"
                        {...register(`fields.${index}.label`)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tipo
                      <select
                        {...register(`fields.${index}.type`)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <option value="text">Texto</option>
                        <option value="number">Número</option>
                        <option value="date">Data</option>
                        <option value="textarea">Área de Texto</option>
                        <option value="select">Seleção</option>
                        <option value="currency">Moeda</option>
                      </select>
                    </label>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register(`fields.${index}.required`)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Obrigatório</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {template ? 'Atualizar Modelo' : 'Criar Modelo'}
          </Button>
        </div>
      </form>

      <Dialog
        isOpen={showStyleEditor}
        onClose={() => setShowStyleEditor(false)}
        title="Configurações de Estilo"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cor do Cabeçalho
              <input
                type="color"
                {...register('style.headerColor')}
                className="mt-1 block w-full"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cor do Texto do Cabeçalho
              <input
                type="color"
                {...register('style.headerTextColor')}
                className="mt-1 block w-full"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fonte
              <select
                {...register('style.fontFamily')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="Inter, sans-serif">Inter</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Times New Roman, serif">Times New Roman</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tamanho da Fonte
              <select
                {...register('style.fontSize')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="14px">Pequeno</option>
                <option value="16px">Médio</option>
                <option value="18px">Grande</option>
              </select>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('style.showLogo')}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Mostrar Logo</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL da Logo
              <input
                type="text"
                {...register('style.logo')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="https://exemplo.com/logo.png"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Texto do Rodapé
              <textarea
                {...register('style.footerText')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </label>
          </div>
        </div>
      </Dialog>
    </div>
  );
}