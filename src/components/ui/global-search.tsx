import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, MessageSquare, FileText, Brain, BarChart3, Phone, Command } from 'lucide-react';
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem, CommandShortcut } from './command';
import { useSearch } from '../../hooks/useSearch';
import { motion } from 'framer-motion';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { searchResults, search } = useSearch();

  const sections = [
    {
      title: 'CRM',
      icon: Users,
      items: searchResults.deals.map(deal => ({
        id: deal.id,
        title: deal.title,
        subtitle: `${deal.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
        path: `/crm/deals/${deal.id}`
      }))
    },
    {
      title: 'Propostas',
      icon: FileText,
      items: searchResults.proposals.map(proposal => ({
        id: proposal.id,
        title: proposal.title,
        subtitle: proposal.clientName,
        path: `/proposals/${proposal.id}`
      }))
    },
    {
      title: 'Chat',
      icon: MessageSquare,
      items: searchResults.chats.map(chat => ({
        id: chat.id,
        title: chat.title,
        subtitle: chat.lastMessage,
        path: `/chat/${chat.id}`
      }))
    }
  ];

  const quickActions = [
    { title: 'Nova Proposta', icon: FileText, path: '/proposals/new' },
    { title: 'Novo Lead', icon: Users, path: '/crm/leads/new' },
    { title: 'Relatórios', icon: BarChart3, path: '/reports' },
    { title: 'WhatsApp', icon: Phone, path: '/whatsapp' },
    { title: 'Assistente IA', icon: Brain, path: '/ai' }
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center w-full max-w-sm px-4 py-2 text-sm text-muted-foreground bg-muted rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
      >
        <Search className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
        <span>Pesquisar...</span>
        <div className="ml-auto flex items-center space-x-1">
          <Command className="w-4 h-4" />
          <span className="text-xs bg-background px-1.5 py-0.5 rounded border">K</span>
        </div>
      </motion.button>

      <CommandDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CommandInput
          placeholder="Digite para pesquisar..."
          onChange={(e) => search(e.target.value)}
        />
        <CommandList>
          <CommandGroup heading="Ações Rápidas">
            {quickActions.map((action) => (
              <CommandItem
                key={action.path}
                onSelect={() => {
                  navigate(action.path);
                  setIsOpen(false);
                }}
              >
                <action.icon className="w-4 h-4 mr-2" />
                {action.title}
              </CommandItem>
            ))}
          </CommandGroup>

          {sections.map((section) => (
            <CommandGroup key={section.title} heading={section.title}>
              {section.items.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                >
                  <section.icon className="w-4 h-4 mr-2" />
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}