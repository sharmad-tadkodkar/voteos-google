import { Module, LeaderboardEntry, Badge } from './types.ts';

export const INITIAL_MODULES: Module[] = [
    {
        id: 'm1',
        title: 'How EVMs Actually Work',
        description: 'Demystifying the Electronic Voting Machine. No myths, just facts.',
        xpReward: 150,
        duration: '5 mins',
        completed: false,
        category: 'basics',
        slides: [
            {
                title: 'The Glorified Calculator',
                content: 'EVMs (Electronic Voting Machines) are standalone devices. They are NOT connected to the internet, WiFi, or Bluetooth. Hacking them remotely is literally impossible because there is no network to hack into.',
                iconName: 'cpu'
            },
            {
                title: 'The VVPAT Safety Net',
                content: 'VVPAT stands for Voter Verifiable Paper Audit Trail. When you press the button, a slip prints behind a glass window showing who you voted for. It stays visible for 7 seconds before dropping into a sealed box. It is your physical receipt!',
                iconName: 'printer'
            },
            {
                title: 'Mock Polls & Seals',
                content: 'Before actual voting starts, agents from all political parties do a "mock poll" to verify the machine counts correctly. After that, the machine is sealed with unique, signed tags. If a seal is broken, the machine is replaced.',
                iconName: 'shield-check'
            }
        ]
    },
    {
        id: 'm2',
        title: 'Decoding Manifestos',
        description: 'Learn how to read between the lines of political promises.',
        xpReward: 200,
        duration: '8 mins',
        completed: false,
        category: 'basics',
        slides: [
            {
                title: 'What is a Manifesto?',
                content: 'A manifesto is a published declaration of the intentions, motives, or views of a political party. Think of it as their "pitch deck" to you, the voter. It outlines what they promise to do if elected.',
                iconName: 'book-open'
            },
            {
                title: 'Freebies vs. Growth',
                content: 'Watch out for "Revdi" culture (short-term freebies like free TVs or cash handouts) versus long-term infrastructure and policy growth (schools, hospitals, job creation). Both have impacts, but long-term growth builds the nation.',
                iconName: 'trending-up'
            },
            {
                title: 'The Accountability Check',
                content: 'Always ask: "How will they fund this?" If a party promises massive tax cuts AND massive spending, the math usually does not add up. Look for realistic, actionable plans rather than just emotional appeals.',
                iconName: 'search'
            }
        ]
    },
    {
        id: 'm3',
        title: 'Voter Registration 101',
        description: 'Moved cities? Just turned 18? Here is how to get on the list.',
        xpReward: 100,
        duration: '3 mins',
        completed: false,
        category: 'basics',
        slides: [
            {
                title: 'Meet Form 6',
                content: 'Form 6 is your golden ticket. If you are 18 or older, you need to fill out Form 6 to get your name on the electoral roll. You can do this entirely online via the Voter Helpline App or the NVSP portal.',
                iconName: 'file-text'
            },
            {
                title: 'What You Need',
                content: 'Keep these ready: A passport-sized photo, an age proof (Birth certificate, 10th mark sheet, PAN, or Aadhaar), and an address proof (Aadhaar, bank passbook, or a recent utility bill).',
                iconName: 'camera'
            },
            {
                title: 'Moved Cities?',
                content: 'If you shifted to a new constituency (like moving for college or a job), you need to fill out Form 8 to shift your residence. You can only be registered to vote in ONE place at a time!',
                iconName: 'map-pin'
            }
        ]
    },
    {
        id: 'm4',
        title: 'Spotting Fake News',
        description: 'Is that WhatsApp forward real? Learn to verify claims.',
        xpReward: 250,
        duration: '10 mins',
        completed: false,
        category: 'fact-check',
        slides: [
            {
                title: 'The WhatsApp University',
                content: 'During elections, misinformation spreads like wildfire. Deepfakes, out-of-context videos, and fake quotes are designed to trigger your emotions. If a forward makes you extremely angry or scared, pause before sharing.',
                iconName: 'smartphone'
            },
            {
                title: 'Reverse Image Search',
                content: 'See a shocking photo? Use Google Reverse Image Search. Often, a photo claiming to be a "recent riot" or "massive rally" is actually from a different country or happened 5 years ago.',
                iconName: 'image'
            },
            {
                title: 'Trust Official Sources',
                content: 'For election dates, rules, or results, ONLY trust the Election Commission of India (ECI) website or verified news outlets. Do not rely on random social media accounts for critical civic information.',
                iconName: 'check-circle'
            }
        ]
    }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { id: 'u1', name: 'Aarav P.', college: 'IIT Delhi', xp: 4500, avatar: 'https://picsum.photos/100/100?random=1' },
    { id: 'u2', name: 'Priya S.', college: 'St. Stephen\'s', xp: 4250, avatar: 'https://picsum.photos/100/100?random=2' },
    { id: 'u3', name: 'Rohan K.', college: 'BITS Pilani', xp: 3900, avatar: 'https://picsum.photos/100/100?random=3' },
    { id: 'u4', name: 'You', college: 'Your College', xp: 1250, avatar: 'https://picsum.photos/100/100?random=4' },
    { id: 'u5', name: 'Ananya M.', college: 'Christ University', xp: 3100, avatar: 'https://picsum.photos/100/100?random=5' },
];

export const AVAILABLE_BADGES: Badge[] = [
    { id: 'b1', name: 'First Vote', icon: '🗳️', description: 'Registered to vote' },
    { id: 'b2', name: 'Fact Checker', icon: '🔍', description: 'Completed 5 fact-check modules' },
    { id: 'b3', name: 'Streak Master', icon: '🔥', description: 'Maintained a 7-day streak' },
];
