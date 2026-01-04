
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Globe, MapPin, Sparkles, ExternalLink, Trash2, AlertCircle, ChevronRight } from 'lucide-react';
import { chatWithPro, chatWithSearch, chatWithMaps } from '../services/geminiService';
import { Message } from '../types';

type ChatMode = 'pro' | 'search' | 'maps';

interface ChatbotProps {
  location: { lat: number; lng: number } | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ location }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Namaste! I am your enhanced Bharat Yatra AI. How can I help you stay safe and enjoy your travels today?", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('pro');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      let result;
      if (mode === 'search') {
        result = await chatWithSearch(currentInput);
      } else if (mode === 'maps') {
        const lat = location?.lat || 28.6139;
        const lng = location?.lng || 77.2090;
        result = await chatWithMaps(currentInput, lat, lng);
      } else {
        const history = messages.slice(-6).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));
        result = await chatWithPro(currentInput, history);
      }

      const botMsg: Message = { 
        role: 'assistant', 
        content: result.text || "I'm currently processing your request. Could you please provide more details?", 
        timestamp: new Date(),
        groundingLinks: result.groundingLinks
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      // Graceful fallback instead of technical error
      const fallbackMsg: Message = {
        role: 'assistant',
        content: "I'm having a slight connectivity ripple. While I sync back up, is there anything specific about your immediate safety or local landmarks you'd like to check? I'm still here to help!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
      setInput(currentInput); // Restore input so user doesn't lose it
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] lg:h-[calc(100vh-200px)] flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600 p-2.5 rounded-2xl shadow-lg shadow-orange-100">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg tracking-tight">Bharat Yatra Intelligence</h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] text-green-600 font-black uppercase tracking-widest">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </span>
                <span className="text-[10px] text-slate-400 font-bold px-2 py-0.5 bg-slate-100 rounded-full">Secured</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
            title="Clear Chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100/80 rounded-[1.5rem]">
          <button 
            onClick={() => setMode('pro')}
            className={`flex items-center justify-center gap-2 py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'pro' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Pro
          </button>
          <button 
            onClick={() => setMode('search')}
            className={`flex items-center justify-center gap-2 py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'search' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Globe className="w-3.5 h-3.5" />
            Live Search
          </button>
          <button 
            onClick={() => setMode('maps')}
            className={`flex items-center justify-center gap-2 py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'maps' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Nearby
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-[90%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md ${
                msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-orange-600 text-white'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-5 rounded-[2rem] shadow-sm border ${
                msg.role === 'user' 
                ? 'bg-slate-900 text-white border-slate-800 rounded-tr-none' 
                : 'bg-white text-slate-800 border-slate-100 rounded-tl-none'
              }`}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                
                {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sources & Links</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.groundingLinks.map((link, lIdx) => {
                        const uri = link.web?.uri || link.maps?.uri;
                        if (!uri) return null;
                        return (
                          <a 
                            key={lIdx} 
                            href={uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-700 transition-all"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {link.web?.title || link.maps?.title || 'View Source'}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 px-6 py-4 rounded-[1.5rem] flex items-center gap-3 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
              <span className="text-xs text-slate-400 font-black uppercase tracking-widest">Assistant is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 lg:p-8 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Type your question here..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-[15px] font-medium resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="h-[56px] w-[56px] bg-orange-600 rounded-2xl text-white hover:bg-orange-700 disabled:opacity-50 transition-all shadow-xl shadow-orange-100 flex items-center justify-center shrink-0"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
