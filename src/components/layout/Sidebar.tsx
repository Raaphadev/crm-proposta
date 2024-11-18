import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, MessageSquare, Phone, BarChart3, 
  FileText, ScrollText, Brain, ChevronRight,
  Headphones, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const modules = [
  { id: 'crm', name: 'CRM', icon: Users, path: '/crm' },
  { id: 'internal-chat', name: 'Chat Interno', icon: MessageSquare, path: '/chat' },
  { id: 'whatsapp', name: 'WhatsApp', icon: Phone, path: '/whatsapp' },
  { id: 'reports', name: 'Relatórios', icon: BarChart3, path: '/reports' },
  { id: 'proposals', name: 'Propostas', icon: FileText, path: '/proposals' },
  { id: 'contracts', name: 'Contratos', icon: ScrollText, path: '/contracts' },
  { id: 'ai', name: 'IA', icon: Brain, path: '/ai' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDesktop: boolean;
}

export function Sidebar({ isOpen, onClose, isDesktop }: SidebarProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={isDesktop ? false : { x: -320 }}
        animate={{ x: isOpen ? 0 : isDesktop ? -256 : -320 }}
        transition={{ type: "spring", damping: 20 }}
        className={cn(
          "fixed left-0 h-[calc(100vh-4rem)] glass-effect shadow-lg shadow-primary/5",
          isDesktop ? "z-10" : "z-50 w-80"
        )}
      >
        {!isDesktop && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <nav className="p-4 space-y-1">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <NavLink
                key={module.id}
                to={module.path}
                onClick={() => !isDesktop && onClose()}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )
                }
              >
                <div className="flex items-center min-w-0">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {(isOpen || !isDesktop) && (
                      <motion.span
                        key={`${module.id}-text`}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="ml-3 text-sm font-medium truncate"
                      >
                        {module.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  {(isOpen || !isDesktop) && (
                    <motion.div
                      key={`${module.id}-icon`}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </nav>
        
        <AnimatePresence mode="wait">
          {(isOpen || !isDesktop) && (
            <motion.div
              key="support-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-4 mt-6 mx-4 rounded-lg bg-gradient-to-br from-primary to-primary-foreground/90"
            >
              <p className="text-white text-sm font-medium mb-2">Precisa de ajuda?</p>
              <p className="text-white/80 text-xs mb-3">Nossa equipe está disponível 24/7 para te ajudar</p>
              <button className="w-full px-3 py-2 text-sm font-medium text-primary bg-white rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center">
                <Headphones className="w-4 h-4 mr-2" />
                Suporte
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
}