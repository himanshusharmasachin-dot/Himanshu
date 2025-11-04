
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToBot } from '../services/geminiService';

const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.839 8.839 0 01-4.083-.98L2 17l1.437-3.248A7.995 7.995 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.706 11.294a5.973 5.973 0 003.199 3.199L6.75 16.648 4.706 11.294z" clipRule="evenodd" />
  </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        if(messages.length === 0){
             setMessages([{ sender: 'bot', text: "Hello! I'm your AI mentor. Ask me anything about game art, career advice, or recent industry news." }]);
        }
    }
  }, [isOpen, messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponse = await sendMessageToBot(input);
    const newBotMessage: ChatMessage = { sender: 'bot', text: botResponse.text, sources: botResponse.sources };
    setMessages(prev => [...prev, newBotMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-200 hover:scale-110 z-50"
        aria-label="Open chat"
      >
        <ChatIcon />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-5 w-full max-w-sm h-[70vh] max-h-[600px] bg-gray-800 shadow-2xl rounded-lg flex flex-col z-40">
          <header className="bg-gray-900 p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="text-white font-bold text-lg">AI Mentor Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <CloseIcon />
            </button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                    <p className="text-sm">{msg.text}</p>
                    {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 border-t border-gray-600 pt-2">
                            <p className="text-xs font-semibold text-gray-400 mb-1">Sources:</p>
                            <ul className="list-disc list-inside space-y-1">
                                {msg.sources.map((source, i) => (
                                    <li key={i} className="text-xs">
                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline truncate">
                                            {source.title || source.uri}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                  <div className="flex justify-start">
                      <div className="bg-gray-700 text-gray-200 rounded-lg px-4 py-2">
                          <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
                              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                          </div>
                      </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
