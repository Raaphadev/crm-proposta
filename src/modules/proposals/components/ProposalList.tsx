import React from 'react';
import { useProposalStore } from '../store/proposalStore';
import { Eye, Edit, Trash, CheckCircle, XCircle, Clock } from 'lucide-react';

export function ProposalList() {
  const { proposals } = useProposalStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <Clock className="w-3 h-3 mr-1" />
          Rascunho
        </span>;
      case 'sent':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Eye className="w-3 h-3 mr-1" />
          Enviada
        </span>;
      case 'accepted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Aceita
        </span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Rejeitada
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {proposals.map((proposal) => (
              <li key={proposal.id} className="py-5">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {proposal.title}
                      </p>
                      <div className="ml-4 flex-shrink-0">
                        {getStatusBadge(proposal.status)}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {proposal.clientName}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(proposal.value)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Válida até {new Date(proposal.validUntil).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-gray-500">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}