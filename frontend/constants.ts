import { Module, LeaderboardEntry, Badge, AlertItem } from './types.ts';

export const ELECTION_ALERTS: AlertItem[] = [
    {
        id: 'a1',
        title: 'Check Name & Polling Booth',
        description: 'Verify your name on the electoral roll and locate your booth.',
        url: 'https://electoralsearch.eci.gov.in/',
        category: 'action',
        icon: 'search'
    },
    {
        id: 'a2',
        title: 'Register to Vote / Link Aadhaar',
        description: 'Fill Form 6 for new registration or Form 6B for Aadhaar linking.',
        url: 'https://voters.eci.gov.in/',
        category: 'action',
        icon: 'user-plus'
    },
    {
        id: 'a3',
        title: 'Election Schedules & Deadlines',
        description: 'Phase-wise dates, nomination windows, and polling days.',
        url: 'https://eci.gov.in/elections/election/',
        category: 'deadline',
        icon: 'calendar'
    },
    {
        id: 'a4',
        title: 'ECI Press Releases & MCC',
        description: 'Official announcements and Model Code of Conduct updates.',
        url: 'https://eci.gov.in/press-releases/',
        category: 'update',
        icon: 'file-text'
    },
    {
        id: 'a5',
        title: 'Know Your Candidate (KYC)',
        description: 'View official affidavits, criminal records, and assets of candidates.',
        url: 'https://affidavit.eci.gov.in/',
        category: 'action',
        icon: 'shield'
    },
    {
        id: 'a6',
        title: 'Official Election Results',
        description: 'Live counting trends and final result declarations.',
        url: 'https://results.eci.gov.in/',
        category: 'update',
        icon: 'bar-chart'
    }
];

export const INITIAL_MODULES: Module[] = [
    {
        id: 'DECK-01',
        title: 'How Voting Works',
        description: 'EVMs, VVPATs, and what actually happens inside the polling booth.',
        xpReward: 150,
        duration: '5 mins',
        completed: false,
        category: 'basics',
        slides: [
            {
                title: 'The EVM (Electronic Voting Machine)',
                content: 'EVMs are standalone devices, essentially glorified calculators. They are NOT connected to the internet, WiFi, or Bluetooth, making remote hacking impossible.',
                iconName: 'cpu'
            },
            {
                title: 'The VVPAT Safety Net',
                content: 'VVPAT (Voter Verifiable Paper Audit Trail) prints a slip showing your vote. It stays visible behind glass for 7 seconds before dropping into a sealed box. It is your physical receipt!',
                iconName: 'printer'
            },
            {
                title: 'Your Voter ID (EPIC)',
                content: 'To vote, you need your name on the electoral roll and an ID. The standard is the EPIC (Voter ID card), but you can also use Aadhaar, PAN, or a Passport if you are on the list.',
                iconName: 'file-text'
            },
            {
                title: 'Inside the Booth',
                content: 'First, your identity is checked. Then, your finger is marked with indelible ink. Finally, you proceed to the voting compartment to press the button in absolute secrecy.',
                iconName: 'map-pin'
            }
        ]
    },
    {
        id: 'DECK-02',
        title: 'Election Formats',
        description: 'General, State, By-elections, and the power of NOTA.',
        xpReward: 150,
        duration: '6 mins',
        completed: false,
        category: 'basics',
        slides: [
            {
                title: 'General Elections (Lok Sabha)',
                content: 'Held every 5 years to elect Members of Parliament (MPs). The party or coalition with a majority (272+ seats) forms the Central Government and chooses the Prime Minister.',
                iconName: 'globe'
            },
            {
                title: 'State Elections (Vidhan Sabha)',
                content: 'Held to elect Members of Legislative Assembly (MLAs) for your state. The majority forms the State Government and chooses the Chief Minister.',
                iconName: 'map'
            },
            {
                title: 'By-Elections',
                content: 'If an elected seat becomes vacant due to death, resignation, or disqualification, a "by-election" is held just for that specific constituency to fill the gap.',
                iconName: 'rotate-cw'
            },
            {
                title: 'NOTA (None of the Above)',
                content: 'Do not like any candidate? Press NOTA. While it does not disqualify candidates even if it gets the most votes, it registers your active dissatisfaction in the official records.',
                iconName: 'x-circle'
            }
        ]
    },
    {
        id: 'DECK-03',
        title: 'The Election Commission',
        description: 'The referees of the world\'s largest democracy.',
        xpReward: 200,
        duration: '7 mins',
        completed: false,
        category: 'basics',
        slides: [
            {
                title: 'What is the ECI?',
                content: 'The Election Commission of India is an autonomous constitutional authority. They are the independent referees responsible for administering all election processes in India.',
                iconName: 'shield'
            },
            {
                title: 'Model Code of Conduct (MCC)',
                content: 'A set of guidelines that kicks in the moment election dates are announced. It stops the ruling party from announcing new schemes or using government machinery for campaigning.',
                iconName: 'alert-triangle'
            },
            {
                title: 'The Election Schedule',
                content: 'Indian elections are massive and usually happen in multiple phases over several weeks to allow security forces to move across the country and ensure peaceful voting.',
                iconName: 'calendar'
            }
        ]
    },
    {
        id: 'DECK-04',
        title: 'Political Parties & Alliances',
        description: 'Decoding the alphabet soup of Indian politics.',
        xpReward: 200,
        duration: '8 mins',
        completed: false,
        category: 'candidates',
        slides: [
            {
                title: 'National vs. Regional',
                content: 'National parties have a presence across multiple states (e.g., BJP, INC). Regional parties focus on specific states and often hold the key to forming coalition governments.',
                iconName: 'map'
            },
            {
                title: 'The Power of Alliances',
                content: 'Because India is so diverse, parties often form pre-poll or post-poll alliances (like NDA or INDIA) to pool their votes and cross the majority mark together.',
                iconName: 'users'
            },
            {
                title: 'Election Symbols',
                content: 'Symbols (Lotus, Hand, Broom, etc.) are crucial in India to help voters easily identify their party on the EVM. The ECI officially allocates and freezes these symbols.',
                iconName: 'star'
            }
        ]
    },
    {
        id: 'DECK-05',
        title: 'Manifesto Decoder',
        description: 'Learn how to read between the lines of political promises.',
        xpReward: 250,
        duration: '8 mins',
        completed: false,
        category: 'candidates',
        slides: [
            {
                title: 'What is a Manifesto?',
                content: 'A manifesto is a published declaration of the intentions, motives, or views of a political party. Think of it as their "pitch deck" to you, the voter.',
                iconName: 'book-open'
            },
            {
                title: 'Freebies vs. Growth',
                content: 'Watch out for short-term freebies (cash handouts) versus long-term infrastructure and policy growth (schools, hospitals). Both have impacts, but long-term growth builds the nation.',
                iconName: 'trending-up'
            },
            {
                title: 'The Accountability Check',
                content: 'Always ask: "How will they fund this?" If a party promises massive tax cuts AND massive spending, the math usually does not add up. Look for realistic plans.',
                iconName: 'search'
            }
        ]
    },
    {
        id: 'DECK-06',
        title: 'Fake News & Misinformation',
        description: 'Fact-checking, deepfakes, and viral forwards.',
        xpReward: 300,
        duration: '10 mins',
        completed: false,
        category: 'fact-check',
        slides: [
            {
                title: 'The WhatsApp University',
                content: 'Misinformation spreads like wildfire. Fake quotes and out-of-context videos are designed to trigger your emotions. If a forward makes you extremely angry, pause before sharing.',
                iconName: 'smartphone'
            },
            {
                title: 'Beware of Deepfakes',
                content: 'AI can now create realistic videos of politicians saying things they never said. Look for unnatural blinking, weird lip-syncing, or robotic voices.',
                iconName: 'video'
            },
            {
                title: 'Reverse Image Search',
                content: 'See a shocking photo? Use Google Reverse Image Search. Often, a photo claiming to be a "recent riot" is actually from a different country years ago.',
                iconName: 'image'
            },
            {
                title: 'Trust Official Sources',
                content: 'For election dates, rules, or results, ONLY trust the Election Commission of India (ECI) website or verified news outlets.',
                iconName: 'check-circle'
            }
        ]
    },
    {
        id: 'DECK-07',
        title: 'Your Vote, Your Power',
        description: 'Why your single vote actually matters.',
        xpReward: 150,
        duration: '5 mins',
        completed: false,
        category: 'basics',
        slides: [
            {
                title: 'The Margin of Victory',
                content: 'Many elections in India are won by incredibly thin margins—sometimes just a few hundred votes. Your vote literally decides who sits in the assembly.',
                iconName: 'target'
            },
            {
                title: 'The Youth Block',
                content: 'Gen Z and Millennials make up a massive chunk of the Indian electorate. If young people vote as a bloc, politicians are forced to prioritize youth issues like jobs and education.',
                iconName: 'zap'
            },
            {
                title: 'Voter Turnout Matters',
                content: 'High voter turnout strengthens democracy. When turnout is low, a small, highly motivated group can elect a candidate that the majority does not actually support.',
                iconName: 'bar-chart'
            }
        ]
    },
    {
        id: 'DECK-08',
        title: 'Candidate Eligibility',
        description: 'Who can contest, disqualifications, and affidavits.',
        xpReward: 200,
        duration: '7 mins',
        completed: false,
        category: 'candidates',
        slides: [
            {
                title: 'Who Can Contest?',
                content: 'To be an MP (Lok Sabha) or MLA, you must be an Indian citizen and at least 25 years old. For the Rajya Sabha or Legislative Council, the minimum age is 30.',
                iconName: 'user-check'
            },
            {
                title: 'The Affidavit (Form 26)',
                content: 'Every candidate must file an affidavit declaring their criminal records, assets, liabilities, and educational qualifications. This is public information you can check!',
                iconName: 'file-text'
            },
            {
                title: 'Disqualifications',
                content: 'A person can be disqualified from contesting if they are convicted of certain crimes and sentenced to 2 or more years in prison, or if they hold an "office of profit" under the government.',
                iconName: 'slash'
            }
        ]
    }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { id: 'u1', name: 'Aarav P.', college: 'IIT Delhi', xp: 4500, avatar: 'https://picsum.photos/100/100?random=1' },
    { id: 'u2', name: 'Priya S.', college: 'St. Stephen\'s', xp: 4250, avatar: 'https://picsum.photos/100/100?random=2' },
    { id: 'u3', name: 'Rohan K.', college: 'BITS Pilani', xp: 3900, avatar: 'https://picsum.photos/100/100?random=3' },
    { id: 'u5', name: 'Ananya M.', college: 'Christ University', xp: 3100, avatar: 'https://picsum.photos/100/100?random=5' },
];

export const AVAILABLE_BADGES: Badge[] = [
    { id: 'b1', name: 'First Vote', icon: '🗳️', description: 'Registered to vote' },
    { id: 'b2', name: 'Fact Checker', icon: '🔍', description: 'Completed 5 fact-check modules' },
    { id: 'b3', name: 'Streak Master', icon: '🔥', description: 'Maintained a 7-day streak' },
];
