import { useState, useCallback } from 'react';
import { useCrmStore } from '../modules/crm/store/crmStore';
import { useProposalStore } from '../modules/proposals/store/proposalStore';
import { useChatStore } from '../modules/chat/store/chatStore';

interface SearchResults {
  deals: any[];
  proposals: any[];
  chats: any[];
}

export function useSearch() {
  const [searchResults, setSearchResults] = useState<SearchResults>({
    deals: [],
    proposals: [],
    chats: []
  });

  const { deals } = useCrmStore();
  const { proposals } = useProposalStore();
  const { conversations } = useChatStore();

  const search = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults({ deals: [], proposals: [], chats: [] });
      return;
    }

    const normalizedQuery = query.toLowerCase();

    const filteredDeals = deals.filter(deal =>
      deal.title.toLowerCase().includes(normalizedQuery) ||
      deal.company?.toLowerCase().includes(normalizedQuery)
    );

    const filteredProposals = proposals.filter(proposal =>
      proposal.title.toLowerCase().includes(normalizedQuery) ||
      proposal.clientName.toLowerCase().includes(normalizedQuery)
    );

    const filteredChats = conversations.map(chat => ({
      id: chat.id,
      title: chat.participants.join(', '),
      lastMessage: chat.lastMessage?.content
    })).filter(chat =>
      chat.title.toLowerCase().includes(normalizedQuery) ||
      chat.lastMessage?.toLowerCase().includes(normalizedQuery)
    );

    setSearchResults({
      deals: filteredDeals.slice(0, 5),
      proposals: filteredProposals.slice(0, 5),
      chats: filteredChats.slice(0, 5)
    });
  }, [deals, proposals, conversations]);

  return { searchResults, search };
}