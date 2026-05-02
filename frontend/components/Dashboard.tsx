import React from 'react';
import { Bot, Zap, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import { Tab } from '../types.ts';

interface DashboardProps {
    setTab: (tab: Tab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setTab }) => {
    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 rounded-3xl p-8 border border-brand-primary/20 relative overflow-hidden shadow-lg">
                <div className="relative z-10">
                    <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-slate-900">Welcome to VOTE OS</h1>
                    <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                        Your civic operating system. Level up your knowledge, ask questions, and get ready to make your voice heard.
                    </p>
                </div>
                {/* Decorative background elements */}
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute right-20 -bottom-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-2xl"></div>
            </div>

            {/* Giant Action Buttons */}
            <div className="flex flex-col gap-6">
                
                {/* Ask CivicBot Button */}
                <button 
                    onClick={() => setTab(Tab.CIVIC_BOT)}
                    className="relative overflow-hidden group bg-gradient-to-br from-brand-800 to-brand-900 border-2 border-brand-primary/30 hover:border-brand-primary rounded-[2rem] p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-primary/20 text-left"
                >
                    {/* Animated background elements */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-colors duration-500"></div>
                    
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 text-brand-primary animate-pulse" />
                                <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">AI Assistant</span>
                            </div>
                            <h3 className="font-extrabold text-3xl text-slate-900 mb-2">
                                Ask CivicBot
                            </h3>
                            <p className="text-slate-500 text-base mb-4">Got a question about voting or elections? Ask our neutral AI.</p>
                            <div className="flex items-center gap-2 text-brand-primary font-semibold group-hover:translate-x-2 transition-transform">
                                Start Chat <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                        
                        {/* Fun animated figure */}
                        <div className="relative w-28 h-28 flex-shrink-0">
                            <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping opacity-75"></div>
                            <div className="absolute inset-0 bg-brand-primary/30 rounded-full animate-pulse"></div>
                            <div className="relative w-full h-full flex items-center justify-center animate-float bg-brand-800 rounded-full border-4 border-brand-primary/50 shadow-xl shadow-brand-primary/20">
                                <Bot className="w-14 h-14 text-brand-primary" />
                            </div>
                        </div>
                    </div>
                </button>

                {/* Earn XP Button */}
                <button 
                    onClick={() => setTab(Tab.LEARN)}
                    className="relative overflow-hidden group bg-gradient-to-br from-brand-800 to-brand-900 border-2 border-brand-accent/30 hover:border-brand-accent rounded-[2rem] p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-accent/20 text-left"
                >
                    {/* Animated background elements */}
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-colors duration-500"></div>
                    
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-5 h-5 text-brand-accent animate-pulse" />
                                <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">Gamified Learning</span>
                            </div>
                            <h3 className="font-extrabold text-3xl text-slate-900 mb-2">
                                Earn XP
                            </h3>
                            <p className="text-slate-500 text-base mb-4">Swipe through educational decks, learn facts, and level up.</p>
                            <div className="flex items-center gap-2 text-brand-accent font-semibold group-hover:translate-x-2 transition-transform">
                                View Decks <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                        
                        {/* Fun animated figure */}
                        <div className="relative w-28 h-28 flex-shrink-0">
                            <div className="absolute inset-0 bg-brand-accent/20 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
                            <div className="absolute inset-2 bg-brand-accent/20 rounded-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
                            <div className="relative w-full h-full flex items-center justify-center animate-bounce bg-brand-800 rounded-full border-4 border-brand-accent/50 shadow-xl shadow-brand-accent/20">
                                <Zap className="w-14 h-14 text-brand-accent" />
                            </div>
                        </div>
                    </div>
                </button>

            </div>
        </div>
    );
};
