import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ROUNDS, generateParticipants } from '../config/lotteryConfig';
import confetti from 'canvas-confetti';

const LotteryContext = createContext(null);

export const LotteryProvider = ({ children }) => {
    // Phases: HOME -> WAIT -> DRAWING -> RESULT -> (NEXT ROUND WAIT) -> ... -> END
    const [currentPhase, setCurrentPhase] = useState('HOME');
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

    // Data
    const [participants, setParticipants] = useState([]);
    const [winners, setWinners] = useState({}); // { roundId: [participant, ...] }

    // Initialize data
    useEffect(() => {
        setParticipants(generateParticipants(300));
    }, []);

    const currentRound = useMemo(() => ROUNDS[currentRoundIndex], [currentRoundIndex]);
    const isFinished = currentRoundIndex >= ROUNDS.length;

    // Actions
    const startEvent = () => {
        setCurrentPhase('WAIT');
    };

    const startDrawing = () => {
        if (currentPhase !== 'WAIT') return;
        setCurrentPhase('DRAWING');
    };

    const stopDrawing = () => {
        if (currentPhase !== 'DRAWING') return;

        // Select winners randomly from non-winners
        const existingWinnerIds = new Set(Object.values(winners).flat().map(w => w.id));
        const eligible = participants.filter(p => !existingWinnerIds.has(p.id));

        // Shuffle and pick
        const count = currentRound.matchCount;
        // Simple shuffle
        const shuffled = [...eligible].sort(() => 0.5 - Math.random());
        const newWinners = shuffled.slice(0, count);

        setWinners(prev => ({
            ...prev,
            [currentRound.id]: newWinners
        }));

        setCurrentPhase('RESULT');
        fireConfetti();
    };

    const nextRound = () => {
        if (currentRoundIndex < ROUNDS.length - 1) {
            setCurrentRoundIndex(prev => prev + 1);
            setCurrentPhase('WAIT');
        } else {
            setCurrentPhase('HOME'); // Or 'END'
            // Optional: Reset or show final summary
            // For now, loop back to Home or stay at Result? 
            // User says: "5. Return to home after event ends"
            resetLottery();
        }
    };

    const resetLottery = () => {
        setCurrentPhase('HOME');
        setCurrentRoundIndex(0);
        setWinners({});
    };

    const fireConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FFD700', '#FFFFFF']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FFD700', '#FFFFFF']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Space or Enter to proceed
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();

                if (currentPhase === 'HOME') startEvent();
                else if (currentPhase === 'WAIT') startDrawing();
                else if (currentPhase === 'DRAWING') stopDrawing();
                else if (currentPhase === 'RESULT') nextRound();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPhase, currentRoundIndex]); // Re-bind when phase changes

    const value = {
        currentPhase,
        currentRoundIndex,
        currentRound,
        participants,
        winners,
        startEvent,
        startDrawing,
        stopDrawing,
        nextRound,
        resetLottery
    };

    return <LotteryContext.Provider value={value}>{children}</LotteryContext.Provider>;
};

export const useLottery = () => useContext(LotteryContext);
