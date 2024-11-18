import React from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { useWhatsAppStore } from '../store/whatsAppStore';

export function WhatsAppChat({ contactId }: { contactId: string }) {
  const { messages, sendMessage } = useWhatsAppStore();
  const [newMessage, setNewMessage] = React.useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage({
        id: crypto.randomUUID(),
        contactId,
        content: newMessage,
        timestamp: new Date(),
        status: 'sending',
        type: 'text'
      });
      setNewMessage('');
    }
  };

  const contactMessages = messages.filter(m => m.contactId === contactId);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {contactMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.status === 'received' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.status === 'received'
                  ? 'bg-white text-gray-900'
                  : 'bg-green-500 text-white'
              }`}
            >
              <p>{message.content}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
                {message.status === 'sent' && (
                  <span className="text-xs">✓</span>
                )}
                {message.status === 'delivered' && (
                  <span className="text-xs">✓✓</span>
                )}
                {message.status === 'read' && (
                  <span className="text-xs text-blue-500">✓✓</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600"
          >
            <Smile className="w-5 h-5" />
          </button>
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
            placeholder="Type a message"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}