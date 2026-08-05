import React, { useState } from 'react';
import { Festival } from '../types';
import { X, Sparkles, Send, Bot, User, Loader2, Compass } from 'lucide-react';
import Markdown from 'react-markdown';

interface AiPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  festivals: Festival[];
}

export const AiPlannerModal: React.FC<AiPlannerModalProps> = ({
  isOpen,
  onClose,
  festivals
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: '안녕하세요! 🌊 **부산 축제 AI 일정 가이드**입니다.\n\n"10월 해운대 데이트 축제 코스 추천해줘", "아이와 가기 좋은 상설 축제 알려줘", "광안리 불꽃축제 관람 팁" 등 궁금하신 내용을 편하게 물어보세요!'
    }
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    '🎆 광안리 & 해운대 해변 축제 추천해줘',
    '👨‍👩‍👧‍👦 아이와 함께 즐기기 좋은 체험 축제',
    '🐟 자갈치 & 기장 먹거리 수산물 축제',
    '🍂 가을에 열리는 대표 부산 축제 코스'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim() || loading) return;

    const userMsg = query.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    if (!textToSend) setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          currentFestivals: festivals
        })
      });

      const data = await res.json();
      if (data.text) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.text }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { sender: 'ai', text: '⚠️ ' + data.error }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: '죄송합니다. AI 추천 답변을 생성하지 못했습니다. 다시 시도해 주세요.' }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { sender: 'ai', text: '서버와 통신하는 중 오류가 발생했습니다.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Card */}
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                부산 축제 AI 일정 가이드
              </h2>
              <p className="text-xs text-slate-400">Gemini AI 맞춤형 부산 여행 코스 및 축제 추천</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Chat List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-purple-300" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-tl-none shadow-md'
              }`}>
                {msg.sender === 'ai' ? (
                  <div className="markdown-body text-slate-200">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-purple-300 animate-spin" />
              </div>
              <div className="bg-slate-800 border border-slate-700/80 p-4 rounded-2xl text-xs text-slate-400 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                <span>최신 부산 축제 데이터를 분석하여 맞춤 일정을 구성하는 중입니다...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] text-slate-500 font-semibold shrink-0">추천 질문:</span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              disabled={loading}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-full border border-slate-700 shrink-0 transition-all disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-800/90 border-t border-slate-700">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: 해운대 10월 축제 일정 알려줘..."
              disabled={loading}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl shadow-lg transition-all disabled:opacity-50 active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
