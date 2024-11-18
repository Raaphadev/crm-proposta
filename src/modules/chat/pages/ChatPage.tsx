import React from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { useChatStore } from '../store/chatStore';
import { MessageSquare, Users } from 'lucide-react';

export function ChatPage() {
  const { conversations } = useChatStore();
  const [selectedConversation, setSelectedConversation] = React.useState(conversations[0]?.id);

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-4 bg-white rounded-lg shadow-sm">
      <div className="w-80 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Conversas</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`w-full p-4 text-left hover:bg-gray-50 ${
                selectedConversation === conversation.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {conversation.participants.join(', ')}
                  </p>
                  {conversation.lastMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1">
        {selectedConversation ? (
          <ChatWindow conversationId={selectedConversation} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Selecione uma conversa para começar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}