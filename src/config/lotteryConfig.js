// Config for rounds
export const ROUNDS = [
    {
        id: 'round2',
        title: '二等奖',
        count: 5,
        matchCount: 5, // Winners to draw in this round
        prizeName: 'AirPods Pro 2',
        image: 'https://images.unsplash.com/photo-1603539279542-eab376e33e4f?auto=format&fit=crop&q=80&w=400', // Placeholder
    },
    {
        id: 'round1',
        title: '一等奖',
        count: 3,
        matchCount: 3,
        prizeName: 'iPhone 15 Pro',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400',
    },
    {
        id: 'grand',
        title: '特等奖',
        count: 1,
        matchCount: 1,
        prizeName: 'MacBook Pro M3',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
    }
];

// Mock Data Generator
export const generateParticipants = (count = 200) => {
    const avatars = [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
    ];

    const lastNames = ['Li', 'Wang', 'Zhang', 'Liu', 'Chen', 'Yang', 'Zhao', 'Huang', 'Zhou', 'Wu'];
    const firstNames = ['Wei', 'Fang', 'Min', 'Jie', 'Hui', 'Lei', 'Jun', 'Yang', 'Ying', 'Qiang', 'Tao', 'Yan', 'Xin', 'Yu', 'Peng'];

    return Array.from({ length: count }, (_, i) => {
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
        return {
            id: i + 1,
            name: `${ln} ${fn}`,
            avatar: avatars[Math.floor(Math.random() * avatars.length)] + `&backgroundColor=b6e3f4`,
            department: `Dept ${Math.floor(Math.random() * 5) + 1}`
        };
    });
};
