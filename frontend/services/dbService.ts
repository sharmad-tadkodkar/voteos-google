import { User, UserStats, LeaderboardEntry } from '../types.ts';
import { MOCK_LEADERBOARD } from '../constants.ts';

const DB_KEY = 'vote_os_db';
const CURRENT_USER_KEY = 'vote_os_current_user';

interface DBState {
    users: Record<string, User>;
    stats: Record<string, UserStats>;
}

// Helper to get the current database state
const getDB = (): DBState => {
    const data = localStorage.getItem(DB_KEY);
    if (data) return JSON.parse(data);
    return { users: {}, stats: {} };
};

// Helper to save the database state
const saveDB = (db: DBState) => {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// Initialize database with mock data if empty
export const initDB = () => {
    const db = getDB();
    if (Object.keys(db.users).length === 0) {
        MOCK_LEADERBOARD.forEach((entry) => {
            db.users[entry.id] = {
                id: entry.id,
                name: entry.name,
                college: entry.college,
                avatar: entry.avatar
            };
            db.stats[entry.id] = {
                xp: entry.xp,
                level: Math.floor(entry.xp / 1000) + 1,
                streak: Math.floor(Math.random() * 10) + 1,
                badges: []
            };
        });
        saveDB(db);
    }
};

// Login or Create User
export const loginUser = (name: string, college: string): User => {
    const db = getDB();
    
    // Simulate SQL: SELECT * FROM users WHERE name = ? AND college = ?
    const existingUser = Object.values(db.users).find(
        u => u.name.toLowerCase() === name.toLowerCase() && u.college.toLowerCase() === college.toLowerCase()
    );

    if (existingUser) {
        localStorage.setItem(CURRENT_USER_KEY, existingUser.id);
        return existingUser;
    }

    // Simulate SQL: INSERT INTO users ...
    const id = `u_${Date.now()}`;
    const newUser: User = {
        id,
        name,
        college,
        avatar: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`
    };
    
    db.users[id] = newUser;
    db.stats[id] = {
        xp: 0,
        level: 1,
        streak: 1,
        badges: []
    };
    
    saveDB(db);
    localStorage.setItem(CURRENT_USER_KEY, id);
    return newUser;
};

// Get current logged in user
export const getCurrentUser = (): User | null => {
    const userId = localStorage.getItem(CURRENT_USER_KEY);
    if (!userId) return null;
    const db = getDB();
    return db.users[userId] || null;
};

// Logout
export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

// Get User Stats
export const getUserStats = (userId: string): UserStats => {
    const db = getDB();
    return db.stats[userId] || { xp: 0, level: 1, streak: 1, badges: [] };
};

// Update User XP
export const updateUserXp = (userId: string, xpToAdd: number): UserStats => {
    const db = getDB();
    if (db.stats[userId]) {
        db.stats[userId].xp += xpToAdd;
        db.stats[userId].level = Math.floor(db.stats[userId].xp / 1000) + 1;
        saveDB(db);
    }
    return db.stats[userId];
};

// Get Leaderboard (Simulates JOIN between users and stats)
export const getLeaderboard = (): LeaderboardEntry[] => {
    const db = getDB();
    return Object.values(db.users).map(user => ({
        id: user.id,
        name: user.name,
        college: user.college,
        avatar: user.avatar,
        xp: db.stats[user.id]?.xp || 0
    })).sort((a, b) => b.xp - a.xp);
};
