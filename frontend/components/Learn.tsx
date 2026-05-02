import React, { useState } from 'react';
import { 
    BookOpen, CheckCircle2, PlayCircle, Award, Zap, 
    ChevronRight, ChevronLeft, Cpu, Printer, ShieldCheck, 
    TrendingUp, Search, FileText, Camera, MapPin, 
    Smartphone, Image as ImageIcon, Globe, RotateCw, XCircle,
    Shield, AlertTriangle, Calendar, Map, Users, Star, Video,
    BarChart, Target, UserCheck, Slash, Flame
} from 'lucide-react';
import { Module, UserStats } from '../types.ts';

interface LearnProps {
    modules: Module[];
    onCompleteModule: (moduleId: string, xp: number) => void;
    stats: UserStats;
}

// Helper to render dynamic icons based on string name
const renderIcon = (iconName?: string, className?: string) => {
    const props = { className: className || "w-12 h-12 text-brand-primary" };
    switch (iconName) {
        case 'cpu': return <Cpu {...props} />;
        case 'printer': return <Printer {...props} />;
        case 'shield-check': return <ShieldCheck {...props} />;
        case 'trending-up': return <TrendingUp {...props} />;
        case 'search': return <Search {...props} />;
        case 'file-text': return <FileText {...props} />;
        case 'camera': return <Camera {...props} />;
        case 'map-pin': return <MapPin {...props} />;
        case 'smartphone': return <Smartphone {...props} />;
        case 'image': return <ImageIcon {...props} />;
        case 'check-circle': return <CheckCircle2 {...props} />;
        case 'globe': return <Globe {...props} />;
        case 'rotate-cw': return <RotateCw {...props} />;
        case 'x-circle': return <XCircle {...props} />;
        case 'shield': return <Shield {...props} />;
        case 'alert-triangle': return <AlertTriangle {...props} />;
        case 'calendar': return <Calendar {...props} />;
        case 'map': return <Map {...props} />;
        case 'users': return <Users {...props} />;
        case 'star': return <Star {...props} />;
        case 'video': return <Video {...props} />;
        case 'bar-chart': return <BarChart {...props} />;
        case 'target': return <Target {...props} />;
        case 'user-check': return <UserCheck {...props} />;
        case 'slash': return <Slash {...props} />;
        default: return <BookOpen {...props} />;
    }
};

export const Learn: React.FC<LearnProps> = ({ modules, onCompleteModule, stats }) => {
    const [activeModule, setActiveModule] = useState<Module | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);
    
    // Swipe gesture state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

    const minSwipeDistance = 50;
    const xpForNextLevel = stats.level * 1000;
    const progress = (stats.xp / xpForNextLevel) * 100;

    const handleStartModule = (module: Module) => {
        if (module.completed) return;
        setActiveModule(module);
        setCurrentSlide(0);
        setSlideDirection(null);
    };

    const handleNextSlide = () => {
        if (activeModule && currentSlide < activeModule.slides.length - 1) {
            setSlideDirection('left');
            setCurrentSlide(prev => prev + 1);
        }
    };

    const handlePrevSlide = () => {
        if (currentSlide > 0) {
            setSlideDirection('right');
            setCurrentSlide(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        if (activeModule) {
            setIsSimulating(true);
            setTimeout(() => {
                onCompleteModule(activeModule.id, activeModule.xpReward);
                setIsSimulating(false);
                setActiveModule(null);
                setCurrentSlide(0);
            }, 1000);
        }
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNextSlide();
        }
        if (isRightSwipe) {
            handlePrevSlide();
        }
    };

    if (activeModule) {
        const slide = activeModule.slides[currentSlide];
        const isLastSlide = currentSlide === activeModule.slides.length - 1;
        const progressPercentage = ((currentSlide + 1) / activeModule.slides.length) * 100;

        // Determine animation class based on slide direction
        const animationClass = slideDirection === 'left' 
            ? 'animate-in slide-in-from-right-8 fade-in duration-300' 
            : slideDirection === 'right' 
                ? 'animate-in slide-in-from-left-8 fade-in duration-300' 
                : 'animate-in fade-in zoom-in-95 duration-300';

        return (
            <div className="h-full flex flex-col bg-brand-800 rounded-xl border border-brand-700 p-6 relative overflow-hidden shadow-xl">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-900">
                    <div 
                        className="h-full bg-brand-primary transition-all duration-300 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                <div className="flex justify-between items-center mb-6 mt-2">
                    <button 
                        onClick={() => setActiveModule(null)}
                        className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1"
                    >
                        <ChevronLeft className="w-4 h-4" /> Exit Deck
                    </button>
                    <span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-md">
                        {currentSlide + 1} / {activeModule.slides.length}
                    </span>
                </div>
                
                <div 
                    className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto w-full touch-pan-y"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Swipeable Slide Content */}
                    <div key={currentSlide} className={`w-full flex-1 flex flex-col items-center justify-center min-h-[280px] ${animationClass}`}>
                        <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-brand-primary/5">
                            {renderIcon(slide.iconName)}
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-4 text-slate-900">{slide.title}</h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            {slide.content}
                        </p>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex gap-2 my-8">
                        {activeModule.slides.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    idx === currentSlide ? 'w-8 bg-brand-primary' : 'w-2 bg-brand-700'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Navigation / Completion */}
                    <div className="w-full flex gap-3">
                        {currentSlide > 0 && (
                            <button
                                onClick={handlePrevSlide}
                                className="p-4 bg-brand-900 text-slate-900 rounded-xl hover:bg-brand-700 transition-colors border border-brand-700"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}
                        
                        {!isLastSlide ? (
                            <button
                                onClick={handleNextSlide}
                                className="flex-1 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
                            >
                                Next <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleComplete}
                                disabled={isSimulating}
                                className="flex-1 py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-brand-accent/20"
                            >
                                {isSimulating ? (
                                    <>
                                        <Zap className="w-5 h-5 animate-pulse" />
                                        Earning XP...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Complete (+{activeModule.xpReward} XP)
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-brand-800 p-4 rounded-xl border border-brand-700 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                        <Flame className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stats.streak} Days</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Current Streak</div>
                </div>
                
                <div className="bg-brand-800 p-4 rounded-xl border border-brand-700 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center mb-2">
                        <Zap className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stats.xp}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Total XP</div>
                </div>

                <div className="bg-brand-800 p-4 rounded-xl border border-brand-700 flex flex-col items-center justify-center text-center col-span-2 md:col-span-1 shadow-sm">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                        <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">Level {stats.level}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Civic Rank</div>
                </div>
            </div>

            {/* Level Progress */}
            <div className="bg-brand-800 p-5 rounded-xl border border-brand-700 shadow-sm">
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-600">Progress to Level {stats.level + 1}</span>
                    <span className="text-brand-accent font-bold">{stats.xp} / {xpForNextLevel} XP</span>
                </div>
                <div className="h-3 bg-brand-900 rounded-full overflow-hidden border border-brand-700">
                    <div 
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mt-8">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
                        <Award className="text-brand-accent" />
                        Civic XP Decks
                    </h2>
                    <p className="text-slate-500 text-sm">Swipe through cards to level up your knowledge.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {modules.map(module => (
                    <div 
                        key={module.id}
                        onClick={() => handleStartModule(module)}
                        className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden shadow-sm ${
                            module.completed 
                                ? 'bg-brand-900/50 border-brand-700 opacity-75' 
                                : 'bg-brand-800 border-brand-700 hover:border-brand-primary hover:shadow-md hover:shadow-brand-primary/10'
                        }`}
                    >
                        {module.completed && (
                            <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-[1px] z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="bg-brand-800 text-slate-900 px-3 py-1 rounded-full text-sm font-medium border border-brand-700">
                                    Completed
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                                module.category === 'basics' ? 'bg-blue-500/20 text-blue-600' :
                                module.category === 'fact-check' ? 'bg-red-500/20 text-red-600' :
                                'bg-orange-500/20 text-orange-600'
                            }`}>
                                {module.category}
                            </span>
                            {module.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                            ) : (
                                <span className="text-xs font-bold text-brand-accent flex items-center gap-1">
                                    <Zap className="w-3 h-3" /> {module.xpReward} XP
                                </span>
                            )}
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-slate-900">{module.title}</h3>
                        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{module.description}</p>
                        
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 flex items-center gap-1">
                                <BookOpen className="w-4 h-4" /> {module.slides.length} Cards
                            </span>
                            {!module.completed && (
                                <span className="text-brand-primary font-medium group-hover:underline flex items-center gap-1">
                                    Start Deck <ChevronRight className="w-4 h-4" />
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
