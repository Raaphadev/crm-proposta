import React from 'react';
import { useWhatsAppStore } from '../store/whatsAppStore';
import { Plus, Edit, Trash, Check, X } from 'lucide-react';

export function WhatsAppTemplates() {
  const { templates, createTemplate } = useWhatsAppStore();
  const [isCreating, setIsCreating] = React.useState(false);
  const [newTemplate, setNewTemplate] = React.useState({
    name: '',
    content: '',
    variables: [] as string[],
  });

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTemplate(newTemplate);
      setIsCreating(false);
      setNewTemplate({ name: '', content: '', variables: [] });
    } catch (error) {
      console.error('Failed to create template:', error);
    }
  };

  const addVariable = () => {
    setNewTemplate((prev) => ({
      ...prev,
      variables: [...prev.variables, `variable${prev.variables.length + 1}`],
      content: prev.content + ` {{variable${prev.variables.length + 1}}}`,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Message Templates</h2>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleCreateTemplate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Template Name
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) =>
                    setNewTemplate((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter template name"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
                <textarea
                  value={newTemplate.content}
                  onChange={(e) =>
                    setNewTemplate((prev) => ({ ...prev, content: e.target.value }))
                  }
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter template content with {{variables}}"
                />
              </label>
            </div>

            <div>
              <button
                type="button"
                onClick={addVariable}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Variable
              </button>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Template
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {templates.map((template) => (
          <div key={template.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {template.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{template.content}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    template.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : template.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {template.status}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
            {template.variables.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Variables:</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {template.variables.map((variable) => (
                    <span
                      key={variable}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}