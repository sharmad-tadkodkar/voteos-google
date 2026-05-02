import React, { useState, useEffect } from 'react';
import { LayoutDashboard, MessageSquare, BookOpen, Trophy, LogOut, Bell } from 'lucide-react';
import { Tab, UserStats, Module, User, LeaderboardEntry } from './types.ts';
import { INITIAL_MODULES } from './constants.ts';
import { Dashboard } from './components/Dashboard.tsx';
import { CivicBot } from './components/CivicBot.tsx';
import { Learn } from './components/Learn.tsx';
import { Leaderboard } from './components/Leaderboard.tsx';
import { Alerts } from './components/Alerts.tsx';
import { SignIn } from './components/SignIn.tsx';
import { initDB, getCurrentUser, getUserStats, updateUserXp, getLeaderboard, logoutUser } from './services/dbService.ts';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
    const [stats, setStats] = useState<UserStats>({
        xp: 0,
        level: 1,
        streak: 1,
        badges: []
    });
    const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

    // Initialize DB and check for existing session on mount
    useEffect(() => {
        initDB();
        const loggedInUser = getCurrentUser();
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    // Load user stats and leaderboard when user changes
    useEffect(() => {
        if (user) {
            const userStats = getUserStats(user.id);
            setStats(userStats);
            setModules(INITIAL_MODULES); // Reset modules state for demo purposes
            setActiveTab(Tab.DASHBOARD);
            refreshLeaderboard();
        }
    }, [user]);

    const refreshLeaderboard = () => {
        setLeaderboardData(getLeaderboard());
    };

    const handleCompleteModule = (moduleId: string, xpReward: number) => {
        if (!user) return;

        // Update local module state
        setModules(prev => prev.map(m => 
            m.id === moduleId ? { ...m, completed: true } : m
        ));
        
        // Update DB and local stats state
        const updatedStats = updateUserXp(user.id, xpReward);
        setStats(updatedStats);
        
        // Refresh leaderboard to reflect new XP
        refreshLeaderboard();
    };

    const handleSignOut = () => {
        logoutUser();
        setUser(null);
    };

    // If no user is logged in, show the SignIn screen
    if (!user) {
        return <SignIn onSignIn={setUser} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case Tab.DASHBOARD:
                return <Dashboard stats={stats} setTab={setActiveTab} />;
            case Tab.CIVIC_BOT:
                return <CivicBot />;
            case Tab.LEARN:
                return <Learn modules={modules} onCompleteModule={handleCompleteModule} />;
            case Tab.ALERTS:
                return <Alerts />;
            case Tab.LEADERBOARD:
                return <Leaderboard entries={leaderboardData} currentUserId={user.id} />;
            default:
                return <Dashboard stats={stats} setTab={setActiveTab} />;
        }
    };

    return (
        <div className="min-h-screen bg-brand-900 text-slate-100 flex justify-center">
            {/* Mobile-first container */}
            <div className="w-full max-w-md bg-brand-900 flex flex-col h-screen relative shadow-2xl shadow-black/50 border-x border-brand-800">
                
                {/* Top Bar */}
                <header className="bg-brand-900/80 backdrop-blur-md border-b border-brand-800 p-4 sticky top-0 z-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-accent rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
                            V
                        </div>
                        <span className="font-extrabold tracking-tight text-lg">VOTE OS</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm font-medium text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-full">
                            <span className="text-lg">⚡</span> {stats.xp}
                        </div>
                        <button 
                            onClick={handleSignOut}
                            className="p-2 text-slate-400 hover:text-white hover:bg-brand-800 rounded-full transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 pb-24">
                    {renderContent()}
                </main>

                {/* Bottom Navigation */}
                <nav className="absolute bottom-0 w-full bg-brand-800/90 backdrop-blur-lg border-t border-brand-700 pb-safe pt-2 px-2 z-20">
                    <div className="flex justify-between items-center max-w-sm mx-auto pb-4">
                        <NavItem 
                            icon={<LayoutDashboard />} 
                            label="Home" 
                            isActive={activeTab === Tab.DASHBOARD} 
                            onClick={() => setActiveTab(Tab.DASHBOARD)} 
                        />
                        <NavItem 
                            icon={<MessageSquare />} 
                            label="CivicBot" 
                            isActive={activeTab === Tab.CIVIC_BOT} 
                            onClick={() => setActiveTab(Tab.CIVIC_BOT)} 
                        />
                        <NavItem 
                            icon={<BookOpen />} 
                            label="Learn" 
                            isActive={activeTab === Tab.LEARN} 
                            onClick={() => setActiveTab(Tab.LEARN)} 
                        />
                        <NavItem 
                            icon={<Bell />} 
                            label="Alerts" 
                            isActive={activeTab === Tab.ALERTS} 
                            onClick={() => setActiveTab(Tab.ALERTS)} 
                        />
                        <NavItem 
                            icon={<Trophy />} 
                            label="Rank" 
                            isActive={activeTab === Tab.LEADERBOARD} 
                            onClick={() => setActiveTab(Tab.LEADERBOARD)} 
                        />
                    </div>
                </nav>
            </div>
        </div>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-200 ${
                isActive 
                    ? 'text-brand-accent bg-brand-accent/10' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-brand-700/50'
            }`}
        >
            <div className={`mb-1 ${isActive ? 'scale-110' : 'scale-100'} transition-transform`}>
                {React.cloneElement(icon as React.ReactElement, { size: 20 })}
            </div>
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    );
};

export default App;
