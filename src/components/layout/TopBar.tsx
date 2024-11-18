import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, User, Menu, Search, HelpCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { ThemeToggle } from '../ui/theme-toggle';
import { GlobalSearch } from '../ui/global-search';
import { HoverCard } from '../ui/hover-card';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState([
    { id: 1, title: 'Nova mensagem', description: 'Você recebeu uma nova mensagem' },
    { id: 2, title: 'Proposta aceita', description: 'Cliente aceitou sua proposta' }
  ]);

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 w-full bg-background/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50"
    >
      <div className="h-full w-full flex items-center px-4 lg:px-6">
        <div className="flex items-center space-x-4 flex-1">
          <button 
            onClick={onMenuClick}
            className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-transparent bg-clip-text"
          >
            SmartNexus
          </motion.h1>
          <div className="hidden md:block max-w-md w-full">
            <GlobalSearch />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <HoverCard
            trigger={
              <button className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent transition-colors relative">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
            }
          >
            <div className="w-64 p-4 space-y-2">
              <h3 className="font-medium">Notificações</h3>
              {notifications.map(notification => (
                <div key={notification.id} className="text-sm">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-muted-foreground">{notification.description}</p>
                </div>
              ))}
            </div>
          </HoverCard>

          <ThemeToggle />

          <HoverCard
            trigger={
              <button className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            }
          >
            <div className="w-64 p-4">
              <h3 className="font-medium mb-2">Precisa de ajuda?</h3>
              <p className="text-sm text-muted-foreground">Nossa equipe está disponível 24/7 para te ajudar</p>
              <button className="mt-2 w-full px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                Abrir chat de suporte
              </button>
            </div>
          </HoverCard>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSettingsClick}
            className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent transition-colors"
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center pl-4 border-l border-border ml-2">
            <HoverCard
              trigger={
                <div className="flex items-center space-x-3 cursor-pointer">
                  <div className="mr-3 text-right hidden sm:block">
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <User className="w-5 h-5 text-foreground" />
                    )}
                  </motion.button>
                </div>
              }
            >
              <div className="w-64 p-4 space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    ) : (
                      <User className="w-6 h-6 text-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.role}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <button className="w-full text-left px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    Perfil
                  </button>
                  <button className="w-full text-left px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    Configurações
                  </button>
                  <button className="w-full text-left px-2 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors">
                    Sair
                  </button>
                </div>
              </div>
            </HoverCard>
          </div>
        </div>
      </div>
    </motion.header>
  );
}