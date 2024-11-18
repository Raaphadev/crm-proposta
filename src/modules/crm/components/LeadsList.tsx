import React from 'react';
import { MoreHorizontal, Search, Plus } from 'lucide-react';
import { useCrmStore } from '../store/crmStore';

export function LeadsList() {
  const leads = useCrmStore((state) => state.leads);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Leads</h2>
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {leads.map((lead) => (
          <div key={lead.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{lead.name}</h3>
                <p className="text-sm text-gray-500">{lead.company}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {lead.status}
              </span>
              <span className="text-xs text-gray-500">
                Added {new Date(lead.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}