import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, Trash2, User } from 'lucide-react';

export const AIChatScreen: React.FC = () => {
  const { t, chatMessages, sendChatMessage, clearChatHistory } = useApp();
  const [inputQuery, setInputQuery] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    sendChatMessage(inputQuery.trim());
    setInputQuery('');
  };

  const suggestionChips = [
    t('chat_chip_1'),
    t('chat_chip_2'),
    t('chat_chip_3'),
    t('chat_chip_4')
  ];

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-140px)] flex flex-col glass-panel overflow-hidden border-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 glow-cyan">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-100 flex items-center gap-2 tracking-tight">
              <span>{t('chat_title')}</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">{t('chat_sub')}</p>
          </div>
        </div>

        <button
          onClick={clearChatHistory}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-all cursor-pointer"
          title="Clear History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Suggestion Chips Row */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] text-slate-400 font-black shrink-0 uppercase tracking-wider">{t('chat_quick_questions')}</span>
        {suggestionChips.map((chip) => (
          <button
            key={chip}
            onClick={() => sendChatMessage(chip)}
            className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-400/40 text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {chatMessages.map((msg) => {
          const isBot = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 glow-cyan">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isBot
                    ? 'bg-slate-900/90 border border-slate-800 text-slate-100 rounded-tl-none font-medium'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold rounded-tr-none shadow-md shadow-cyan-500/10'
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                  className="space-y-1"
                />
                <span className={`text-[9px] block mt-1.5 text-right font-mono ${isBot ? 'text-slate-400' : 'text-slate-900/80'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={t('chat_input_placeholder')}
          className="flex-1 bg-slate-900/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all font-medium"
        />
        <button
          type="submit"
          className="w-11 h-11 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black flex items-center justify-center transition-all shadow-lg shadow-cyan-500/20 cursor-pointer glow-cyan shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

