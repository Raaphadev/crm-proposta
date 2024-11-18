import React from 'react';
import { useAIStore } from '../store/aiStore';
import { MessageSquare, Send, AlertCircle, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const suggestions = [
  'Gerar uma proposta comercial',
  'Analisar métricas de vendas',
  'Sugerir próximos passos para um lead',
  'Criar um email de follow-up'
];

export function AIAssistant() {
  const [input, setInput] = React.useState('');
  const { messages, sendMessage, isProcessing, error } = useAIStore();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      await sendMessage(input);
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold flex items-center">
          <Bot className="w-5 h-5 mr-2 text-primary" />
          Assistente IA
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Assistente inteligente para ajudar em suas tarefas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Como posso ajudar hoje?
            </h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {suggestions.map((suggestion) => (
                <motion.button
                  key={suggestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-4 mb-4 text-red-800 bg-red-50 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.2
                  }}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.4
                  }}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isProcessing}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing || !input.trim()}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}