import React from 'react';
import { AIAssistant } from '../components/AIAssistant';

export function AIPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Assistente IA</h1>
      </div>
      
      <div className="h-[calc(100vh-12rem)]">
        <AIAssistant />
      </div>
    </div>
  );
}