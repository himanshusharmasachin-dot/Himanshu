
import { GoogleGenAI, GenerateContentResponse, Chat, Modality, Type, GroundingChunk } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

let chat: Chat | null = null;

const getChat = () => {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are a helpful and encouraging mentor for aspiring game artists. Provide concise, practical advice. If you are asked about recent news or places, use your tools.',
            },
        });
    }
    return chat;
};

export const getIndustryTip = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Provide a single, short, actionable tip for an aspiring game artist about new technology, a recent industry trend, or a networking strategy. The tip should be no more than 2 sentences.'
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching industry tip:", error);
        return "Couldn't fetch a new tip right now. Keep practicing your fundamentals!";
    }
};

export const analyzeArt = async (base64Image: string, mimeType: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            },
        };
        const textPart = {
            text: "You are a senior art director at a major AAA game studio. Provide a constructive critique of this artwork. Be encouraging but also specific. Focus on fundamentals like composition, color theory, lighting, and form. Keep it concise, around 3-4 paragraphs.",
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing art:", error);
        return "There was an error analyzing the image. Please try again.";
    }
};

export const sendMessageToBot = async (message: string): Promise<{ text: string, sources?: { uri: string, title: string }[] }> => {
    try {
        const chatSession = getChat();
        
        // Simple check to see if we should use grounding
        const useGrounding = /news|events|latest|GDC|studios near|best schools in/i.test(message);

        if (useGrounding) {
            const isMapQuery = /studios near|schools in/i.test(message);
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: message,
                config: {
                    tools: [isMapQuery ? { googleMaps: {} } : { googleSearch: {} }]
                }
            });
            
            const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
            const sources = groundingChunks.map((chunk: GroundingChunk) => ({
                uri: chunk.web?.uri || chunk.maps?.uri || '',
                title: chunk.web?.title || chunk.maps?.title || 'Source'
            })).filter(source => source.uri);

            return { text: response.text, sources: sources.length > 0 ? sources : undefined };

        } else {
            const response = await chatSession.sendMessage({ message });
            return { text: response.text };
        }
    } catch (error) {
        console.error("Error in chat:", error);
        return { text: "Sorry, I'm having trouble connecting right now." };
    }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Say with an encouraging tone: ${text}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return base64Audio || null;
    } catch (error) {
        console.error("Error generating speech:", error);
        return null;
    }
};
