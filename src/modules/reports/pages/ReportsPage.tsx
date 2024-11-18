import React from 'react';
import { Dashboard } from '../components/Dashboard';

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
      </div>
      
      <Dashboard />
    </div>
  );
}