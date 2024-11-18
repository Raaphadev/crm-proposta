import React from 'react';
import { ContractForm } from '../components/ContractForm';
import { Plus } from 'lucide-react';

export function ContractsPage() {
  const [isCreating, setIsCreating] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contratos</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Contrato
        </button>
      </div>
      
      {isCreating ? (
        <ContractForm />
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-500 text-center py-8">
            Nenhum contrato encontrado. Clique em "Novo Contrato" para criar.
          </p>
        </div>
      )}
    </div>
  );
}