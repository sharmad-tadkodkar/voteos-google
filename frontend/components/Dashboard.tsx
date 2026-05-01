import React from 'react';
import { Flame, Zap, Target, ChevronRight } from 'lucide-react';
import { UserStats, Tab } from '../types.ts';

interface DashboardProps {
    stats: UserStats;
    setTab: (tab: Tab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, setTab }) => {
    const xpForNextLevel = stats.level * 1000;
    const progress = (stats.xp / xpForNextLevel) * 100;

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-brand-primary/20 to-brand-accent/10 rounded-2xl p-6 border border-brand-primary/30 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome to VOTE OS</h1>
                    <p className="text-slate-300 max-w-md">
                        Your civic operating system. Level up your knowledge, ask questions, and get ready to make your voice heard.
                    </p>
                </div>
                {/* Decorative background elements */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute right-20 -bottom-10 w-32 h-32 bg-brand-accent/20 rounded-full blur-2xl"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-brand-800 p-4 rounded-xl border border-brand-700 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                        <Flame className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold">{stats.streak} Days</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Current Streak</div>
                </div>
                
                <div className="bg-brand-800 p-4 rounded-xl border border-brand-700 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center mb-2">
                        <Zap className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div className="text-2xl font-bold">{stats.xp}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Total XP</div>
                </div>

                <div className="bg-brand-800 p-4 rounded-xl border border-brand-700 flex flex-col items-center justify-center text-center col-span-2 md:col-span-1">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                        <Target className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold">Level {stats.level}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Civic Rank</div>
                </div>
            </div>

            {/* Level Progress */}
            <div className="bg-brand-800 p-5 rounded-xl border border-brand-700">
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-300">Progress to Level {stats.level + 1}</span>
                    <span className="text-brand-accent font-bold">{stats.xp} / {xpForNextLevel} XP</span>
                </div>
                <div className="h-3 bg-brand-900 rounded-full overflow-hidden border border-brand-700">
                    <div 
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
                <button 
                    onClick={() => setTab(Tab.CIVIC_BOT)}
                    className="flex items-center justify-between p-5 bg-brand-800 hover:bg-brand-700 border border-brand-700 rounded-xl transition-colors group text-left"
                >
                    <div>
                        <h3 className="font-bold text-lg text-brand-primary mb-1">Ask CivicBot</h3>
                        <p className="text-sm text-slate-400">Got a question about voting? Ask our AI.</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-brand-primary transition-transform group-hover:translate-x-1" />
                </button>

                <button 
                    onClick={() => setTab(Tab.LEARN)}
                    className="flex items-center justify-between p-5 bg-brand-800 hover:bg-brand-700 border border-brand-700 rounded-xl transition-colors group text-left"
                >
                    <div>
                        <h3 className="font-bold text-lg text-brand-accent mb-1">Earn XP</h3>
                        <p className="text-sm text-slate-400">Complete modules to level up.</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-brand-accent transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};
