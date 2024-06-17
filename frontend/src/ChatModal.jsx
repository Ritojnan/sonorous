import React, { useState, useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { LuBadgePercent, LuLanguages, LuMaximize, LuMinimize, LuRefreshCcw, LuSendHorizonal as Send, LuX as X } from 'react-icons/lu';
import { motion } from 'framer-motion';
import './index.css';
import { AiOutlineWechatWork } from 'react-icons/ai';
import MDXRenderer from './MDXRenderer.jsx';
import Carousel from './Carousel.jsx';
import SpeechRecognitionButton from './SpeechRecognitionButton.jsx';
import SpeechSynthesisButton from './SpeechSynthesisButton.jsx';
import LanguageSelector from './LanguageSelector.jsx';

const ChatModal = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setLoading(true);

    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: input }),
    });

    const data = await response.json();

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.message, sender: 'bot' },
    ]);

    setLoading(false);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
          <AiOutlineWechatWork className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content asChild>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-4 ${
              isMaximized ? 'h-[calc(100%-2rem)]' : ''
            } `}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center border-b pb-2 mb-4 gap-2">
                <h2 className="text-lg font-semibold">Chat</h2>
                <div className="flex items-center gap-2 ml-auto">
                  <LuBadgePercent className="h-6 w-6 text-black fill-yellow-300" />

                  {isMaximized ? (
                    <LuMinimize
                      className="h-6 w-6 text-gray-500"
                      onClick={() => setIsMaximized(false)}
                    />
                  ) : (
                    <LuMaximize
                      className="h-6 w-6 text-gray-500"
                      onClick={() => setIsMaximized(true)}
                    />
                  )}
                  <LuRefreshCcw className="h-6 w-6 text-gray-500" />
                  <Dialog.Close asChild>
                    <button>
                      <X className="h-6 w-6 text-gray-500" />
                    </button>
                  </Dialog.Close>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto h-64">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-black'
                        }`}
                      >
                        <MDXRenderer content={msg.text} />
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-center">
                      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="mt-4 flex">
                <SpeechRecognitionButton setInput={setInput} selectedLanguage={selectedLanguage} />
                <SpeechSynthesisButton message={messages[messages.length - 1]?.text || ''} />
                <input
                  type="text"
                  className="border p-2 w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 focus:border-transparent"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
                />
                <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
                <button
                  className={`bg-blue-500 text-white p-2 rounded-r-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={!loading ? sendMessage : null}
                  disabled={loading}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChatModal;