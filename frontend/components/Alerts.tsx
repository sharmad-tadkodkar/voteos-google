import React from 'react';
import { Bell, ExternalLink, Search, UserPlus, BarChart2, FileText, Calendar, Shield } from 'lucide-react';
import { ELECTION_ALERTS } from '../constants.ts';

const renderIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-white" };
    switch (iconName) {
        case 'search': return <Search {...props} />;
        case 'user-plus': return <UserPlus {...props} />;
        case 'bar-chart': return <BarChart2 {...props} />;
        case 'file-text': return <FileText {...props} />;
        case 'calendar': return <Calendar {...props} />;
        case 'shield': return <Shield {...props} />;
        default: return <Bell {...props} />;
    }
};

const getCategoryStyles = (category: string) => {
    switch (category) {
        case 'action':
            return {
                gradient: 'from-blue-500 to-indigo-600',
                glow: 'bg-blue-500/30',
                badge: 'bg-blue-500/20 text-blue-300'
            };
        case 'deadline':
            return {
                gradient: 'from-orange-500 to-red-600',
                glow: 'bg-orange-500/30',
                badge: 'bg-orange-500/20 text-orange-300'
            };
        case 'update':
            return {
                gradient: 'from-emerald-500 to-teal-600',
                glow: 'bg-emerald-500/30',
                badge: 'bg-emerald-500/20 text-emerald-300'
            };
        default:
            return {
                gradient: 'from-brand-primary to-brand-accent',
                glow: 'bg-brand-primary/30',
                badge: 'bg-brand-primary/20 text-brand-primary'
            };
    }
};

export const Alerts: React.FC = () => {
    return (
        <div className="space-y-6 pb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Bell className="text-brand-accent animate-pulse" />
                        Live Updates
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Official ECI links and critical deadlines.</p>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                {ELECTION_ALERTS.map((alert, index) => {
                    const styles = getCategoryStyles(alert.category);
                    
                    return (
                        <a
                            key={alert.id}
                            href={alert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block animate-float"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 rounded-[2rem] opacity-40 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${styles.glow}`} />
                            
                            {/* Bubble Container */}
                            <div className="relative flex items-center gap-4 p-5 rounded-[2rem] bg-brand-800 border border-white/5 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                                
                                {/* Icon Circle */}
                                <div className={`flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${styles.gradient} flex items-center justify-center shadow-inner`}>
                                    {renderIcon(alert.icon)}
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${styles.badge}`}>
                                            {alert.category}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-white text-base truncate">
                                        {alert.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                        {alert.description}
                                    </p>
                                </div>
                                
                                {/* Action Icon */}
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-900/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
