# VOTE OS - Color Scheme Documentation

Based on the current configuration in `index.html` and the React components, the application uses a custom Tailwind CSS theme centered around a dark, modern aesthetic with vibrant accents.

## Core Brand Colors (Tailwind Config)
Defined in the `tailwind.config` inside `index.html`:

*   **Brand 900 (`#0f172a` / slate-900):** The deepest background color, used for the main body and app container.
*   **Brand 800 (`#1e293b` / slate-800):** Slightly lighter surface color, used for cards, modals, input fields, and the bottom navigation bar.
*   **Brand 700 (`#334155` / slate-700):** Used for borders, dividers, and subtle hover states.
*   **Brand Accent (`#10b981` / emerald-500):** The primary success and gamification color. Used for XP, streaks, completion states, and the "Earn XP" section.
*   **Brand Primary (`#6366f1` / indigo-500):** The core technology and AI color. Used for CivicBot, primary buttons, and active states.

## Component-Specific Color Schemes

### 1. Alerts & Notifications (`components/Alerts.tsx`)
Alerts use specific gradients and glows based on their category:
*   **Action:** Blue to Indigo gradient (`from-blue-500 to-indigo-600`) with blue glows.
*   **Deadline:** Orange to Red gradient (`from-orange-500 to-red-600`) with orange glows.
*   **Update:** Emerald to Teal gradient (`from-emerald-500 to-teal-600`) with emerald glows.
*   **Default:** Indigo to Emerald gradient (`from-brand-primary to-brand-accent`).

### 2. Learning Modules (`components/Learn.tsx`)
Module category badges use distinct colors for quick visual filtering:
*   **Basics:** Blue (`text-blue-400` with `bg-blue-500/20` background).
*   **Fact-Check:** Orange (`text-orange-400` with `bg-orange-500/20` background).
*   **Candidates/Other:** Purple (`text-purple-400` with `bg-purple-500/20` background).

### 3. User Stats Grid (`components/Learn.tsx` & `components/Dashboard.tsx`)
*   **Streak (Flame):** Orange (`text-orange-500` with `bg-orange-500/20`).
*   **Total XP (Zap):** Emerald/Accent (`text-brand-accent` with `bg-brand-accent/20`).
*   **Civic Rank (Target):** Blue (`text-blue-400` with `bg-blue-500/20`).

### 4. Leaderboard Medals (`components/Leaderboard.tsx`)
*   **1st Place:** Gold (`text-yellow-500`).
*   **2nd Place:** Silver (`text-slate-300`).
*   **3rd Place:** Bronze (`text-amber-600`).

### 5. Flash Page / Success Screen (`components/SignIn.tsx`)
*   Uses a mix of `brand-accent` (Emerald) for the main success text and `brand-primary` (Indigo) for the call-to-action button, accompanied by glowing background blurs of both colors.