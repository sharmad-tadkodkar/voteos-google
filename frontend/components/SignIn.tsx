import React, { useState } from 'react';
import { User } from '../types.ts';
import { LogIn, User as UserIcon, GraduationCap, Calendar, Globe2 } from 'lucide-react';
import { loginUser } from '../services/dbService.ts';

interface SignInProps {
    onSignIn: (user: User) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
    const [name, setName] = useState('');
    const [college, setCollege] = useState('');
    const [age, setAge] = useState('');
    const [citizenship, setCitizenship] = useState('');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFlashPage, setShowFlashPage] = useState(false);
    const [pendingUser, setPendingUser] = useState<User | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !college.trim() || !age || !citizenship.trim()) return;

        setIsSubmitting(true);

        // Simulate network request to our local DB
        setTimeout(() => {
            const parsedAge = parseInt(age, 10);
            const user = loginUser(name.trim(), college.trim(), parsedAge, citizenship.trim());
            
            setIsSubmitting(false);

            const isIndian = citizenship.trim().toLowerCase() === 'indian';
            const isVoteReady = parsedAge >= 18;

            if (isIndian && isVoteReady) {
                setPendingUser(user);
                setShowFlashPage(true);
            } else {
                onSignIn(user);
            }
        }, 800);
    };

    if (showFlashPage && pendingUser) {
        return (
            <div className="min-h-screen bg-brand-900 flex items-center justify-center p-4 text-slate-100">
                <div className="max-w-md w-full bg-brand-800 rounded-3xl border border-brand-700 p-8 shadow-2xl text-center animate-in zoom-in duration-500 relative overflow-hidden">
                    {/* Confetti/Glow effects */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="text-7xl mb-6 animate-bounce">🇮🇳</div>
                        <h1 className="text-3xl font-extrabold text-brand-accent mb-6 leading-tight">
                            Level unlocked: you’re officially vote-ready in India!
                        </h1>
                        
                        <div className="bg-brand-900/50 p-6 rounded-2xl border border-brand-700 mb-8">
                            <p className="text-xl text-slate-200 mb-4">
                                🗳️ Press the button. Make it count.
                            </p>
                            <p className="text-lg font-bold text-brand-primary tracking-wide">
                                #PowerInYourHands
                            </p>
                        </div>

                        <button
                            onClick={() => onSignIn(pendingUser)}
                            className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-indigo-400 transition-all shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:-translate-y-1"
                        >
                            Click to know more
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-900 flex items-center justify-center p-4 text-slate-100">
            <div className="max-w-md w-full bg-brand-800 rounded-2xl border border-brand-700 p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center font-bold text-white text-3xl shadow-lg shadow-brand-primary/20">
                            V
                        </div>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-center mb-2">Booting VOTE OS...</h1>
                    <p className="text-slate-400 text-center mb-8 text-sm">
                        Initialize your civic profile to track XP, earn badges, and climb the leaderboard.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-brand-700 rounded-xl bg-brand-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                    placeholder="e.g. Priya Sharma"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="college" className="block text-sm font-medium text-slate-300 mb-1">
                                College / University
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <GraduationCap className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    id="college"
                                    value={college}
                                    onChange={(e) => setCollege(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-brand-700 rounded-xl bg-brand-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                    placeholder="e.g. Delhi University"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-1">
                                    Age
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="number"
                                        id="age"
                                        min="1"
                                        max="120"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-brand-700 rounded-xl bg-brand-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                        placeholder="18"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="citizenship" className="block text-sm font-medium text-slate-300 mb-1">
                                    Citizenship
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Globe2 className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="citizenship"
                                        value={citizenship}
                                        onChange={(e) => setCitizenship(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-brand-700 rounded-xl bg-brand-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                        placeholder="Indian"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !name.trim() || !college.trim() || !age || !citizenship.trim()}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-brand-900 bg-brand-accent hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent focus:ring-offset-brand-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-brand-900 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Initialize Profile
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
