import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RollingNames = ({ participants }) => {
    const [current, setCurrent] = useState(participants[0]);

    // Simple high-speed random switching effect
    useEffect(() => {
        const interval = setInterval(() => {
            const random = participants[Math.floor(Math.random() * participants.length)];
            setCurrent(random);
        }, 50); // Speed of change

        return () => clearInterval(interval);
    }, [participants]);

    if (!current) return null;

    return (
        <div className="flex flex-col items-center gap-4">
            <motion.img
                key={current.id} // Re-animate on change
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 1.1, opacity: 1 }}
                src={current.avatar}
                className="w-32 h-32 rounded-full border-4 border-brand-gold shadow-lg"
                alt="Avatar"
            />
            <div className="text-3xl font-bold text-brand-gold bg-black/50 px-4 py-1 rounded-full backdrop-blur-sm">
                {current.name}
            </div>
            <div className="text-sm text-white/50">{current.department}</div>
        </div>
    );
};

export default RollingNames;
