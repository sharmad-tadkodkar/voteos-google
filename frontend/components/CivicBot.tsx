import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, ShieldAlert } from 'lucide-react';
import { ChatMessage } from '../types.ts';
import { sendMessageToCivicBot } from '../services/geminiService.ts';

export const CivicBot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'model',
            text: "Hey! I'm CivicBot 🤖. I'm here to answer any questions you have about voting, elections, or how our democracy works. No jargon, no bias. What's on your mind?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        const responseText = await sendMessageToCivicBot(userMsg.text);

        const botMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botMsg]);
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-brand-900 rounded-xl overflow-hidden border border-brand-700 shadow-sm">
            {/* Header */}
            <div className="bg-brand-800 p-4 border-b border-brand-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-primary/20 p-2 rounded-lg">
                        <Bot className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-slate-900">CivicBot AI</h2>
                        <p className="text-xs text-slate-500">Neutral • Fact-based • 24/7</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
                    <ShieldAlert className="w-3 h-3" />
                    <span>Zero Bias</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                msg.role === 'user' ? 'bg-brand-accent text-white' : 'bg-brand-800 border border-brand-700 text-brand-primary'
                            }`}>
                                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>
                            <div className={`p-3 rounded-2xl ${
                                msg.role === 'user' 
                                    ? 'bg-brand-accent text-white rounded-tr-none' 
                                    : 'bg-brand-800 border border-brand-700 text-slate-800 rounded-tl-none'
                            }`}>
                                {/* Simple markdown-like rendering for bold text */}
                                <p className="text-sm leading-relaxed whitespace-pre-wrap" 
                                   dangerouslySetInnerHTML={{ 
                                       __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                                   }} 
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-800 border border-brand-700 text-brand-primary flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div className="p-4 rounded-2xl bg-brand-800 border border-brand-700 rounded-tl-none flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                                <span className="text-sm text-slate-500">CivicBot is typing...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-brand-800 border-t border-brand-700">
                <div className="relative flex items-center">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about EVMs, registration, manifestos..."
                        className="w-full bg-brand-900 border border-brand-700 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none"
                        rows={1}
                        style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-center text-[10px] text-slate-500 mt-2">
                    CivicBot can make mistakes. Verify important election dates with ECI.
                </p>
            </div>
        </div>
    );
};
