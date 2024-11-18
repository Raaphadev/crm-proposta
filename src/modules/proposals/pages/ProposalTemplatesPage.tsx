import React from 'react';
import { Plus, FileText, Pencil, Trash2 } from 'lucide-react';
import { useProposalStore } from '../store/proposalStore';
import { TemplateEditor } from '../components/TemplateEditor';
import { Button } from '../../../components/ui/button';
import { Dialog } from '../../../components/ui/dialog';

export function ProposalTemplatesPage() {
  const { templates, deleteTemplate } = useProposalStore();
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);

  const handleEdit = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleDelete = (templateId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este modelo?')) {
      deleteTemplate(templateId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Modelos de Proposta</h1>
        <Button
          onClick={() => setShowCreateDialog(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Novo Modelo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div
              className="h-2"
              style={{ backgroundColor: template.style.headerColor }}
            />
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {template.description}
                  </p>
                </div>
                {template.isDefault ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Padrão
                  </span>
                ) : null}
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {template.fields.length} campos configurados
                </p>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {!template.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Excluir
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(template.id)}
                  leftIcon={<Pencil className="w-4 h-4" />}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  leftIcon={<FileText className="w-4 h-4" />}
                >
                  Usar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        title="Novo Modelo de Proposta"
      >
        <TemplateEditor onClose={() => setShowCreateDialog(false)} />
      </Dialog>

      <Dialog
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        title="Editar Modelo de Proposta"
      >
        {selectedTemplate && (
          <TemplateEditor
            template={templates.find((t) => t.id === selectedTemplate)}
            onClose={() => setSelectedTemplate(null)}
          />
        )}
      </Dialog>
    </div>
  );
}