import React from 'react';
import { motion } from 'framer-motion';

const ScrollList = ({ participants }) => {
    // Triple the list to ensure smooth infinite scroll
    const displayList = [...participants, ...participants, ...participants];

    return (
        <div className="h-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-transparent to-[#0F172A] z-10 pointer-events-none" />

            <motion.div
                className="flex flex-col gap-3 py-4"
                animate={{ y: [0, -participants.length * 60] }} // Adjust based on item height
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: Math.max(20, participants.length * 0.5), // Adjust speed
                }}
            >
                {displayList.map((p, i) => (
                    <div key={`${p.id}-${i}`} className="flex items-center gap-3 px-4 opacity-70 hover:opacity-100 transition-opacity">
                        <img
                            src={p.avatar}
                            alt={p.name}
                            className="w-10 h-10 rounded-full border border-white/20 bg-white/10"
                        />
                        <span className="text-sm font-medium text-white/80 whitespace-nowrap">{p.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ScrollList;
