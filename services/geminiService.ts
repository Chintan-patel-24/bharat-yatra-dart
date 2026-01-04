
import { GoogleGenAI, Type } from "@google/genai";

// Standard initialization using the environment-injected API key
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Standard Chat using Gemini 3 Pro for deep reasoning.
 * Optimized for complex travel and safety logic.
 */
export const chatWithPro = async (message: string, history: any[] = []) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: 'You are the Bharat Yatra Pro Assistant. You provide deep, complex insights into Indian culture, travel planning, and legal/safety advice. Use your reasoning capabilities to provide highly detailed and accurate responses.',
      thinkingConfig: { thinkingBudget: 32768 } // Max budget for pro model reasoning
    },
  });
  return { text: response.text };
};

/**
 * Search Grounded Chat using Gemini 3 Flash.
 * Essential for real-time safety updates.
 */
export const chatWithSearch = async (message: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ role: 'user', parts: [{ text: message }] }],
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: 'You are the Bharat Yatra Real-Time Safety Assistant. Your priority is user safety. Use Google Search to find critical real-time info (weather, safety, news) and cite sources.',
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    groundingLinks: groundingChunks
  };
};

/**
 * Maps Grounded Chat using Gemini 2.5 Flash.
 */
export const chatWithMaps = async (message: string, lat?: number, lng?: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: message }] }],
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: lat && lng ? { latitude: lat, longitude: lng } : undefined
        }
      },
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    groundingLinks: groundingChunks
  };
};

/**
 * Landmark Analysis using Vision capabilities.
 */
export const analyzeLandmark = async (base64Image: string) => {
  const ai = getAI();
  const prompt = "Identify this monument or landmark in India. Provide name, description, 3 history facts, 2 safety tips. Return JSON.";

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          historicalFacts: { type: Type.ARRAY, items: { type: Type.STRING } },
          safetyTips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["name", "description", "historicalFacts", "safetyTips"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
