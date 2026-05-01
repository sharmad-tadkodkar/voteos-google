import React, { useState } from 'react';
import { 
    BookOpen, CheckCircle2, PlayCircle, Award, Zap, 
    ChevronRight, ChevronLeft, Cpu, Printer, ShieldCheck, 
    TrendingUp, Search, FileText, Camera, MapPin, 
    Smartphone, Image as ImageIcon 
} from 'lucide-react';
import { Module } from '../types.ts';

interface LearnProps {
    modules: Module[];
    onCompleteModule: (moduleId: string, xp: number) => void;
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
        default: return <BookOpen {...props} />;
    }
};

export const Learn: React.FC<LearnProps> = ({ modules, onCompleteModule }) => {
    const [activeModule, setActiveModule] = useState<Module | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);

    const handleStartModule = (module: Module) => {
        if (module.completed) return;
        setActiveModule(module);
        setCurrentSlide(0);
    };

    const handleNextSlide = () => {
        if (activeModule && currentSlide < activeModule.slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const handlePrevSlide = () => {
        if (currentSlide > 0) {
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

    if (activeModule) {
        const slide = activeModule.slides[currentSlide];
        const isLastSlide = currentSlide === activeModule.slides.length - 1;
        const progressPercentage = ((currentSlide + 1) / activeModule.slides.length) * 100;

        return (
            <div className="h-full flex flex-col bg-brand-800 rounded-xl border border-brand-700 p-6 animate-in fade-in zoom-in duration-200 relative overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-900">
                    <div 
                        className="h-full bg-brand-primary transition-all duration-300 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                <button 
                    onClick={() => setActiveModule(null)}
                    className="self-start text-sm text-slate-400 hover:text-white mb-6 mt-2 flex items-center gap-1"
                >
                    <ChevronLeft className="w-4 h-4" /> Exit Module
                </button>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto w-full">
                    
                    {/* Slide Content */}
                    <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[250px]">
                        <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-brand-primary/5">
                            {renderIcon(slide.iconName)}
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-4 text-white">{slide.title}</h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
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
                                className="p-4 bg-brand-900 text-white rounded-xl hover:bg-brand-700 transition-colors border border-brand-700"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}
                        
                        {!isLastSlide ? (
                            <button
                                onClick={handleNextSlide}
                                className="flex-1 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-indigo-400 transition-colors flex items-center justify-center gap-2"
                            >
                                Next <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleComplete}
                                disabled={isSimulating}
                                className="flex-1 py-4 bg-brand-accent text-brand-900 font-bold rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
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
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Award className="text-brand-accent" />
                        Civic XP
                    </h2>
                    <p className="text-slate-400 text-sm">Level up your democratic knowledge.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {modules.map(module => (
                    <div 
                        key={module.id}
                        onClick={() => handleStartModule(module)}
                        className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                            module.completed 
                                ? 'bg-brand-900/50 border-brand-700 opacity-75' 
                                : 'bg-brand-800 border-brand-700 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/10'
                        }`}
                    >
                        {module.completed && (
                            <div className="absolute inset-0 bg-brand-900/40 backdrop-blur-[1px] z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="bg-brand-800 text-white px-3 py-1 rounded-full text-sm font-medium border border-brand-700">
                                    Completed
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                                module.category === 'basics' ? 'bg-blue-500/20 text-blue-400' :
                                module.category === 'fact-check' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-purple-500/20 text-purple-400'
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
                        <h3 className="font-bold text-lg mb-1">{module.title}</h3>
                        <p className="text-sm text-slate-400 mb-4 line-clamp-2">{module.description}</p>
                        
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 flex items-center gap-1">
                                <PlayCircle className="w-4 h-4" /> {module.duration}
                            </span>
                            {!module.completed && (
                                <span className="text-brand-primary font-medium group-hover:underline flex items-center gap-1">
                                    Start <ChevronRight className="w-4 h-4" />
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
