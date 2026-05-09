import React from 'react';
import ScrollList from './ScrollList';
import { useLottery } from '../../store/LotteryContext';
import { Sparkles, Users } from 'lucide-react';

const MainLayout = ({ children }) => {
    const { participants } = useLottery();

    return (
        <div className="flex h-screen bg-[#0F172A] text-white relative overflow-hidden font-sans selection:bg-brand-gold selection:text-black">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-gold/10 rounded-full blur-[120px]" />
            </div>

            {/* Sidebar - Left */}
            <aside className="w-64 flex-shrink-0 border-r border-white/10 z-10 flex flex-col bg-black/20 backdrop-blur-md">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-2 text-brand-gold mb-1">
                        <Users size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider">Total</span>
                    </div>
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        {participants.length}
                    </div>
                    <div className="text-xs text-white/40 mt-1">Participants Ready</div>
                </div>
                <div className="flex-1 overflow-hidden">
                    <ScrollList participants={participants} />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative z-20">
                {/* Header */}
                <header className="h-20 flex items-center justify-between px-8 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rotate-45 border-2 border-brand-gold bg-brand-gold/20 flex items-center justify-center">
                            <span className="block w-2 h-2 bg-brand-gold -rotate-45" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">
                            <span className="text-brand-gold">PayerMax</span>
                            <span className="mx-2 text-white/30">|</span>
                            <span className="font-light">2025 年会盛典</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Right side header content if needed */}
                        <div className="text-sm text-white/40 font-mono">
                            {new Date().getFullYear()}.01.03
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-1 relative">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
