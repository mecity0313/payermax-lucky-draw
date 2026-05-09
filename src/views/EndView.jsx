import { motion } from 'framer-motion';

const EndView = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="h-full flex flex-col items-center justify-center gap-8 relative"
        >
            {/* 背景光晕 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-brand-gold/5 blur-[100px]" />
            </div>

            {/* THANK YOU 大字 */}
            <h1 className="relative z-10 text-7xl font-black tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-brand-gold to-yellow-700">
                THANK YOU
            </h1>

            {/* 副标题 */}
            <p className="relative z-10 text-xs text-white/35 tracking-[0.6em] uppercase">
                Grand Ceremony 2025
            </p>

            {/* 分隔线 */}
            <div className="relative z-10 w-12 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

            {/* 领奖提示框 */}
            <div className="relative z-10 border border-brand-gold/25 rounded-md px-10 py-5 text-center bg-brand-gold/[0.03] backdrop-blur-sm">
                <p className="text-sm text-white/50 mb-2">🎉 抽奖圆满结束</p>
                <p className="text-base text-white/85 leading-loose">
                    请中奖的同学前往{' '}
                    <span className="text-brand-gold font-bold">领奖区</span>{' '}
                    登记领取奖品
                </p>
            </div>

            {/* 装饰点 */}
            <div className="relative z-10 flex gap-2">
                <span className="w-1 h-1 rounded-full bg-brand-gold opacity-60" />
                <span className="w-1 h-1 rounded-full bg-brand-gold opacity-30" />
                <span className="w-1 h-1 rounded-full bg-brand-gold opacity-60" />
            </div>
        </motion.div>
    );
};

export default EndView;
