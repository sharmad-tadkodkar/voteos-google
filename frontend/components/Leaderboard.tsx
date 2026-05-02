import React from 'react';
import { Trophy, Medal, Users } from 'lucide-react';
import { LeaderboardEntry } from '../types.ts';

interface LeaderboardProps {
    entries: LeaderboardEntry[];
    currentUserId: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentUserId }) => {
    // Sort entries by XP descending
    const sortedEntries = [...entries].sort((a, b) => b.xp - a.xp);

    return (
        <div className="bg-brand-800 rounded-xl border border-brand-700 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-brand-700 bg-brand-900/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">National Leaderboard</h2>
                </div>
                <p className="text-slate-500 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" /> Competing with peers across India
                </p>
            </div>

            <div className="p-0">
                {sortedEntries.map((entry, index) => {
                    const isCurrentUser = entry.id === currentUserId;
                    return (
                        <div 
                            key={entry.id}
                            className={`flex items-center p-4 border-b border-brand-700/50 last:border-0 transition-colors ${
                                isCurrentUser ? 'bg-brand-primary/10' : 'hover:bg-brand-900/50'
                            }`}
                        >
                            <div className="w-8 font-bold text-slate-500 flex justify-center">
                                {index === 0 ? <Medal className="w-6 h-6 text-yellow-500" /> :
                                 index === 1 ? <Medal className="w-6 h-6 text-slate-400" /> :
                                 index === 2 ? <Medal className="w-6 h-6 text-amber-600" /> :
                                 `#${index + 1}`}
                            </div>
                            
                            <img 
                                src={entry.avatar} 
                                alt={entry.name} 
                                className="w-10 h-10 rounded-full border-2 border-brand-700 mx-4"
                            />
                            
                            <div className="flex-1">
                                <h3 className={`font-bold ${isCurrentUser ? 'text-brand-primary' : 'text-slate-900'}`}>
                                    {entry.name}
                                </h3>
                                <p className="text-xs text-slate-500">{entry.college}</p>
                            </div>
                            
                            <div className="text-right">
                                <div className="font-bold text-brand-accent">{entry.xp.toLocaleString()}</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider">XP</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
