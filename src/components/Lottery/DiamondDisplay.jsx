import { motion } from 'framer-motion';

const DiamondDisplay = ({ children, size = 'default', rotating = true }) => {
    const isLarge = size === 'large';

    // Size classes
    const sizeClasses = isLarge
        ? 'w-96 h-96 md:w-[32rem] md:h-[32rem]'
        : 'w-64 h-64';

    return (
        <div className="relative flex items-center justify-center">
            {/* Outer Glow Ring */}
            <motion.div
                className={`absolute border border-brand-gold/30 ${isLarge ? 'w-[40rem] h-[40rem]' : 'w-80 h-80'} rounded-full`}
                animate={rotating ? { rotate: 360 } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* The Diamond Container */}
            <motion.div
                className={`relative ${sizeClasses} flex items-center justify-center z-10`}
                animate={rotating ? { rotate: 360 } : {}}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
                {/* Diamond Shape - CSS construction */}
                <div className="absolute inset-0 border-[3px] border-brand-gold/50 rotate-45 bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(255,215,0,0.1)] transition-all duration-500 box-border" />

                {/* Inner Diamond (Counter-rotated content) */}
                <motion.div
                    className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full"
                    animate={rotating ? { rotate: -360 } : {}} // Counter-rotate to keep content upright
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                    {/* Visual content inside diamond */}
                    {children}
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            {rotating && <div className="absolute inset-0 bg-brand-gold/5 blur-[100px] rounded-full z-0" />}
        </div>
    );
};

export default DiamondDisplay;
