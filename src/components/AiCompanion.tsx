import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, X, ArrowUpRight, MessageSquareCode } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiCompanionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiCompanion({ isOpen, onClose }: AiCompanionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "HELLO, I AM PRIYANK'S DIGITAL DOUBLE. UNBOUND BY SINGULAR DISCIPLINES, I CAN ANSWER QUESTIONS REGARDING MY ART DIRECTION, SOFTWARE ARCHITECTURE, SYNTHESIS PIPELINES, OR PROJECT SCHEDULING. HOW MAY I COLLABORATE?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Map previous message structures for the Express server's chat endpoint
      const chatHistory = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMsg,
          history: chatHistory
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from digital twin server');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'model', 
          text: "CONNECTION INTERRUPTED. SYSTEM OFFLINE. PRIYANK CAN BE REACHED DIRECTLY AT PRIYANKV489@GMAIL.COM." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Chat Container Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative w-full max-w-lg h-full bg-app-card-bg border-l border-app-border-strong shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-app-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h3 className="font-serif text-lg text-app-text font-medium tracking-tight flex items-center gap-1.5">
                    PRIYANK_TWIN.sh <Sparkles size={14} className="text-emerald-400" />
                  </h3>
                  <span className="font-mono text-[9px] text-app-text-dim uppercase tracking-widest block mt-0.5">
                    Gemini 3.5 AI Proxy Session
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 border border-app-border hover:border-app-border-strong text-app-text flex items-center justify-center rounded-full transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-app-border"
            >
              <div className="space-y-6">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <span className="font-mono text-[8px] text-app-text-dim uppercase tracking-widest mb-1">
                      {msg.role === 'user' ? 'VISITOR' : 'TWIN_CORE_NODE_A'}
                    </span>
                    <div 
                      className={`max-w-[85%] rounded-xl px-4 py-3 border text-xs leading-relaxed font-mono ${
                        msg.role === 'user' 
                          ? 'bg-app-inverse-bg text-app-inverse-text border-app-inverse-bg' 
                          : 'bg-app-card-bg-elevated text-app-text border-app-border'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-[8px] text-app-text-dim uppercase tracking-widest mb-1">
                      TWIN_CORE_NODE_A
                    </span>
                    <div className="bg-app-card-bg-elevated border border-app-border rounded-xl px-4 py-3 flex space-x-1 items-center">
                      <div className="w-1.5 h-1.5 bg-app-text-dim rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-app-text-dim rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-app-text-dim rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Prompts Helper */}
            <div className="px-6 pb-2 pt-4 bg-app-bg/30 border-t border-app-border flex flex-wrap gap-2">
              {[
                "Tell me about your trades",
                "How do you merge code & art?",
                "Are you open to hire?"
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(p)}
                  className="font-mono text-[10px] text-app-text-muted hover:text-app-text border border-app-border hover:border-app-border-strong bg-app-card-hover px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1"
                >
                  {p} <ArrowUpRight size={10} className="opacity-50" />
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-6 border-t border-app-border bg-app-bg/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full bg-app-card-bg border border-app-border focus:border-app-border-strong text-app-text rounded-xl py-3.5 pl-4 pr-12 text-xs focus:outline-none transition-colors font-mono"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="absolute right-2.5 w-9 h-9 bg-app-inverse-bg text-app-inverse-text hover:bg-app-inverse-hover disabled:bg-app-card-bg-elevated disabled:text-app-text-dim rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
