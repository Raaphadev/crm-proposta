import React from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export function ChatWindow({ conversationId }: { conversationId: string }) {
  const { messages, sendMessage } = useChatStore();
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage({
        id: crypto.randomUUID(),
        conversationId,
        content: newMessage,
        senderId: 'currentUser', // Replace with actual user ID
        timestamp: new Date(),
        type: 'text'
      });
      setNewMessage('');
    }
  };

  const conversationMessages = messages.filter(m => m.conversationId === conversationId);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversationMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.senderId === 'currentUser'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}