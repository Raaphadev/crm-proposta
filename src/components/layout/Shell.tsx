import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Menu } from 'lucide-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { LoadingOverlay } from '../ui/loading-overlay';
import { useToast } from '../../hooks/useToast';

export function Shell() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const toast = useToast();

  React.useEffect(() => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  }, [isDesktop]);

  // Adiciona feedback visual durante navegação
  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Página carregada com sucesso');
    }, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10"
    >
      <TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          isDesktop={isDesktop}
          onNavigate={handleNavigation}
        />
        <AnimatePresence mode="wait">
          <motion.main 
            key="main-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex-1 overflow-auto p-4 lg:p-6 transition-all duration-300",
              isDesktop ? (isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20') : 'ml-0'
            )}
          >
            <LoadingOverlay isLoading={isLoading}>
              <motion.div 
                className="max-w-7xl mx-auto"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Outlet />
              </motion.div>
            </LoadingOverlay>
          </motion.main>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}