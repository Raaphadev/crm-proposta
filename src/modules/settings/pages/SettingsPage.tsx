import React from 'react';
import { 
  Settings, FileText, Users, Bell, Shield, 
  Palette, Building, CreditCard 
} from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('general');

  const tabs = [
    { id: 'general', label: 'Geral', icon: Settings },
    { id: 'templates', label: 'Modelos', icon: FileText },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'permissions', label: 'Permissões', icon: Shield },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'company', label: 'Empresa', icon: Building },
    { id: 'billing', label: 'Faturamento', icon: CreditCard }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie as configurações do sistema
          </p>
        </div>
      </div>

      <Card>
        <div className="border-b border-border">
          <div className="flex space-x-1 p-1 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6"
          >
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Configurações Gerais</h2>
                <div className="grid gap-6">
                  {/* Add general settings content here */}
                </div>
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Modelos de Documentos</h2>
                <div className="grid gap-6">
                  {/* Add templates content here */}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Gerenciamento de Usuários</h2>
                <div className="grid gap-6">
                  {/* Add users management content here */}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Configurações de Notificações</h2>
                <div className="grid gap-6">
                  {/* Add notifications settings content here */}
                </div>
              </div>
            )}

            {activeTab === 'permissions' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Controle de Permissões</h2>
                <div className="grid gap-6">
                  {/* Add permissions management content here */}
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Personalização da Interface</h2>
                <div className="grid gap-6">
                  {/* Add appearance settings content here */}
                </div>
              </div>
            )}

            {activeTab === 'company' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Dados da Empresa</h2>
                <div className="grid gap-6">
                  {/* Add company settings content here */}
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Faturamento e Assinatura</h2>
                <div className="grid gap-6">
                  {/* Add billing settings content here */}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}