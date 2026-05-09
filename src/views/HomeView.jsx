import React from 'react';
import { motion } from 'framer-motion';
import DiamondDisplay from '../components/Lottery/DiamondDisplay';
import { useLottery } from '../store/LotteryContext';
import { ArrowRight } from 'lucide-react';

const HomeView = () => {
    const { startEvent } = useLottery();

    return (
        <div className="h-full flex flex-col items-center justify-center relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col items-center gap-12"
            >
                <DiamondDisplay>
                    <div className="flex flex-col items-center justify-center text-brand-gold p-12">
                        <img src="/vite.svg" className="w-20 h-20 mb-4 opacity-80" alt="Logo" />
                        <span className="text-2xl font-bold tracking-[0.5em] ml-2">PAYERMAX</span>
                    </div>
                </DiamondDisplay>

                <div className="text-center space-y-4">
                    <h2 className="text-5xl font-bold text-white tracking-tight">
                        Waiting for Activity
                    </h2>
                    <p className="text-white/50 text-lg">
                        Grand Ceremony 2025
                    </p>
                </div>

                <motion.button
                    onClick={startEvent}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-dark rounded-full font-bold text-lg hover:bg-white transition-colors shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                >
                    Start Lottery
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default HomeView;
