import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';


import ChatMessage from '../Chatmessage/ChatMessage';
import ChatInput from '../Chatinput/ChatInput';
import { askChatbot, initializeOpenAI } from '../../services/openai';

function Chatboat() {
  const [apiKey, setApiKey] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInitialize = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      try {
        initializeOpenAI(apiKey);
        setIsInitialized(true);
        setMessages([
          ...messages,
          {
            role: 'assistant',
            content: "Hello! I'm your AI assistant. How can I help you today?"
          }
        ]);
      } catch (error) {
        console.error('Failed to initialize OpenAI client:', error);
        alert('Failed to initialize OpenAI client. Please check your API key.');
      }
    }
  };

  const handleSendMessage = async (content) => {
    const userMessage = { role: 'user', content };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await askChatbot([...messages, userMessage]);

      if (response) {
        const assistantMessage = { role: 'assistant', content: response };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
        <div className="bg-blue-600 text-white p-4 flex items-center">
          <MessageSquare className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-semibold">AI Chatbot</h1>
        </div>

        {!isInitialized ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to AI Chatbot</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              To get started, please enter your OpenAI API key. Your key is processed locally and never stored on our servers.
            </p>
            <form onSubmit={handleInitialize} className="w-full max-w-md">
              <div className="mb-4">
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="sk-..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Start Chatting
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              {messages.filter((msg) => msg.role !== 'system').map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  );
}

export default Chatboat;
