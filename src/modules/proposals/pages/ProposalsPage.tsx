import React from 'react';
import { ProposalForm } from '../components/ProposalForm';
import { ProposalList } from '../components/ProposalList';
import { Plus } from 'lucide-react';

export function ProposalsPage() {
  const [isCreating, setIsCreating] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Propostas</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Proposta
        </button>
      </div>
      
      {isCreating ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ProposalForm onCancel={() => setIsCreating(false)} />
        </div>
      ) : (
        <ProposalList />
      )}
    </div>
  );
}