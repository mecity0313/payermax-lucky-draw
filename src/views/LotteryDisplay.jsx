import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLottery } from '../store/LotteryContext';
import DiamondDisplay from '../components/Lottery/DiamondDisplay';
import RollingNames from '../components/Lottery/RollingNames';
import { Gift, Play, RotateCw, Trophy, ChevronRight } from 'lucide-react';
import { playSound } from '../utils/soundManager';

const LotteryDisplay = () => {
    const {
        currentPhase,
        currentRound,
        startDrawing,
        stopDrawing,
        nextRound,
        participants,
        winners
    } = useLottery();

    const roundWinners = winners[currentRound.id] || [];

    // ----------------------------------------------------
    // Render: WAIT STATE
    // ----------------------------------------------------
    if (currentPhase === 'WAIT') {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-8 relative">
                <div className="absolute top-20 text-center space-y-2">
                    <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-gold to-yellow-600 uppercase tracking-widest drop-shadow-sm">
                        {currentRound.title}
                    </h2>
                    <div className="text-xl text-white/60 tracking-[0.5em] uppercase">Prize Reveal</div>
                </div>

                {/* Prize Showcase */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-12 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col items-center gap-6 max-w-lg w-full shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-brand-gold/20 blur-xl rounded-full group-hover:bg-brand-gold/30 transition-all duration-500" />
                        <img
                            src={currentRound.image}
                            alt={currentRound.prizeName}
                            className="w-64 h-64 object-cover rounded-2xl relative z-10 shadow-2xl border border-white/10"
                        />
                    </div>
                    <div className="text-center space-y-1">
                        <h3 className="text-3xl font-bold text-white">{currentRound.prizeName}</h3>
                        <p className="text-brand-gold text-lg font-medium">{currentRound.count} Winners</p>
                    </div>
                </motion.div>

                {/* Action Button */}
                <div className="absolute bottom-12 w-full flex justify-center">
                    <button
                        onClick={() => {
                            playSound('click');
                            startDrawing();
                        }}
                        className="flex items-center gap-3 px-10 py-5 bg-brand-gold text-black text-xl font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,215,0,0.4)]"
                    >
                        <Play fill="black" /> START DRAW
                    </button>
                </div>
            </div>
        );
    }

    // ----------------------------------------------------
    // Render: DRAWING STATE
    // ----------------------------------------------------
    if (currentPhase === 'DRAWING') {
        return (
            <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background fast movement effect could go here */}

                <div className="relative z-10 scale-125">
                    <DiamondDisplay size="large" rotating={true}>
                        <RollingNames participants={participants} />
                    </DiamondDisplay>
                </div>

                <div className="absolute bottom-12 flex flex-col items-center gap-4 z-20">
                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                        <img src={currentRound.image} className="w-10 h-10 rounded-md object-cover" alt="" />
                        <div className="text-left">
                            <div className="text-brand-gold font-bold">{currentRound.title}</div>
                            <div className="text-xs text-white/60">{currentRound.prizeName}</div>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            playSound('win');
                            stopDrawing();
                        }}
                        className="px-12 py-4 bg-red-600 text-white font-bold text-2xl rounded-full shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:bg-red-500 transition-colors animate-pulse"
                    >
                        STOP
                    </button>
                </div>
            </div>
        );
    }

    // ----------------------------------------------------
    // Render: RESULT STATE
    // ----------------------------------------------------
    if (currentPhase === 'RESULT') {
        return (
            <div className="h-full flex flex-col items-center justify-center relative z-10 px-10">
                <div className="absolute top-12 flex flex-col items-center">
                    <Trophy className="text-brand-gold w-12 h-12 mb-2" />
                    <h2 className="text-4xl font-bold text-white">{currentRound.title} Winners</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-12 max-h-[60vh] overflow-y-auto p-4 scrollbar-hide">
                    <AnimatePresence>
                        {roundWinners.map((winner, idx) => (
                            <motion.div
                                key={winner.id}
                                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, type: 'spring' }}
                                className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-colors"
                            >
                                <img src={winner.avatar} alt="" className="w-16 h-16 rounded-full border-2 border-brand-gold shadow-lg" />
                                <div>
                                    <div className="text-xl font-bold text-white">{winner.name}</div>
                                    <div className="text-white/50 text-sm">{winner.department}</div>
                                    <div className="text-brand-gold text-xs font-mono mt-1">ID: {winner.id}</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="absolute bottom-12">
                    <button
                        onClick={nextRound}
                        className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 rounded-full transition-all"
                    >
                        Next Round <ChevronRight />
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default LotteryDisplay;
