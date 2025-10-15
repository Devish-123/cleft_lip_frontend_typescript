
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { BotIcon } from './icons/BotIcon';
import { SendIcon } from './icons/SendIcon';
import { ApolloLogo } from './ApolloLogo';
import { AlertIcon } from './icons/AlertIcon';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0s]"></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
  </div>
);

const ChatIntroCard: React.FC<{ onQuestionClick: (question: string) => void }> = ({ onQuestionClick }) => {
  const suggestedQuestions = [
    "What exactly is Cleft Lip Syndrome?",
    "What are some of the common causes?",
    "How is it typically diagnosed?",
    "Can Cleft Lip be detected before birth?",
  ];

  return (
    <div className="bg-slate-700/50 rounded-2xl p-6 w-full max-w-xl mx-auto animate-fade-in flex flex-col items-center text-center">
      <div className="mb-4">
        <ApolloLogo />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Welcome!</h2>
      <p className="text-slate-300 mb-5 max-w-md">
        I'm your AI assistant, here to provide information about Cleft Lip Syndrome. How can I help you today?
      </p>

      <div className="w-full space-y-2 mb-6">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => onQuestionClick(q)}
            className="w-full text-left text-sm p-3 bg-slate-600/50 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="bg-slate-800/60 p-3 rounded-lg flex items-start space-x-3 text-left w-full">
        <AlertIcon className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
        <p className="text-xs text-slate-400">
          <strong>Disclaimer:</strong> I am an AI assistant and not a substitute for professional medical advice. Please consult a qualified healthcare provider for any health concerns.
        </p>
      </div>
    </div>
  );
};

export const ChatbotPage: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const newChat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'You are Cleftix AI, a friendly and knowledgeable assistant specialized in Cleft Lip Syndrome. Provide clear, supportive, and informative answers to user questions. Always remind users that you are an AI assistant and not a substitute for professional medical advice.',
      },
    });
    setChat(newChat);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || userInput;
    if (!textToSend.trim() || isLoading || !chat) return;
    
    if (isIntroVisible) {
      setIsIntroVisible(false);
    }

    const userMessage: Message = { role: 'user', text: textToSend };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    if (!messageText) {
      setUserInput('');
    }
    
    setIsLoading(true);

    try {
      const response = await chat.sendMessageStream({ message: textToSend });
      
      let currentModelText = '';
      setMessages((prevMessages) => [...prevMessages, { role: 'model', text: '' }]);

      for await (const chunk of response) {
        currentModelText += chunk.text;
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].text = currentModelText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'model') {
             lastMessage.text = 'Sorry, something went wrong. Please try again.';
          }
          return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-slate-900 min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl h-[85vh] flex flex-col bg-slate-800 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden">
        
        <header className="flex items-center p-4 border-b border-slate-700/80 flex-shrink-0">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center ring-2 ring-slate-800">
              <BotIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-white">Cleftix AI</h1>
            <p className="text-sm text-green-400">Online</p>
          </div>
        </header>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {isIntroVisible && <ChatIntroCard onQuestionClick={handleSendMessage} />}

          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <BotIcon className="w-5 h-5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-md p-3 rounded-xl whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-slate-700/50 text-slate-300'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
               <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <BotIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="max-w-md p-3 rounded-xl bg-slate-700/50 text-slate-300">
                  <TypingIndicator />
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-slate-700/80 bg-slate-800/50 flex-shrink-0">
          <div className="flex items-center space-x-3 bg-slate-700/50 border border-slate-600 rounded-lg pr-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Cleft Lip Syndrome..."
              className="flex-1 w-full p-3 bg-transparent text-slate-200 placeholder:text-slate-400 rounded-lg focus:ring-0 focus:outline-none resize-none"
              rows={1}
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !userInput.trim()}
              className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
