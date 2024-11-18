import React from 'react';
import { WhatsAppChat } from '../components/WhatsAppChat';
import { WhatsAppTemplates } from '../components/WhatsAppTemplates';
import { useWhatsAppStore } from '../store/whatsAppStore';
import { Phone, Users } from 'lucide-react';

export function WhatsAppPage() {
  const { contacts } = useWhatsAppStore();
  const [selectedContact, setSelectedContact] = React.useState(contacts[0]?.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">WhatsApp</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-[calc(100vh-16rem)] flex">
            <div className="w-80 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Buscar contato..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="overflow-y-auto h-[calc(100%-4rem)]">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 ${
                      selectedContact === contact.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {contact.profilePic ? (
                        <img
                          src={contact.profilePic}
                          alt={contact.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <Users className="w-10 h-10 text-gray-400" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                        <p className="text-xs text-gray-500">{contact.phone}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              {selectedContact ? (
                <WhatsAppChat contactId={selectedContact} />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Selecione um contato para começar</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <WhatsAppTemplates />
        </div>
      </div>
    </div>
  );
}