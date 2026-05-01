import { GoogleGenAI, Chat } from '@google/genai';

// Initialize the SDK. It relies on process.env.API_KEY being set in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

const SYSTEM_INSTRUCTION = `
You are CivicBot, the core AI of VOTE OS, a civic operating system designed for Gen Z in India.
Your goal is to educate young voters and encourage participation in Indian national and state elections.

Guidelines:
1. Tone: Plain language, zero jargon, engaging, slightly informal but respectful (Gen Z friendly).
2. Stance: STRICTLY NEUTRAL, NON-PARTISAN, ZERO POLITICAL AGENDA. Never endorse or criticize any specific political party, candidate, or ideology.
3. Focus: Explain processes (how EVMs work, how to register, what a manifesto is), fact-check general claims, and provide civic education.
4. Format: Keep answers concise. Use bullet points or short paragraphs.
5. Context: Always assume the context is the Indian electoral system (ECI, Lok Sabha, Vidhan Sabha, etc.) unless specified otherwise.

If asked a highly controversial or biased question, politely pivot back to explaining the democratic process or how the user can research the topic objectively.
`;

let chatSession: Chat | null = null;

export const initChatSession = () => {
    if (!chatSession) {
        chatSession = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.3, // Keep it relatively deterministic for factual answers
            }
        });
    }
    return chatSession;
};

export const sendMessageToCivicBot = async (message: string): Promise<string> => {
    try {
        const chat = initChatSession();
        const response = await chat.sendMessage({ message });
        return response.text || "I'm sorry, I couldn't process that right now.";
    } catch (error) {
        console.error("Error communicating with CivicBot:", error);
        return "Oops! Looks like the servers are taking a quick chai break. Please try again in a moment.";
    }
};
