
import { GoogleGenAI, Type } from "@google/genai";

// Use process.env.API_KEY directly as required by SDK guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithAI = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAI();
  
  // Directly use ai.models.generateContent with model and prompt as recommended
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: 'You are the Bharat Yatra Assistant, an expert in Indian tourism, local safety, cultural landmarks, and emergency protocols. Provide helpful, accurate, and safety-conscious advice for tourists traveling in India.',
    },
  });

  // Access the .text property directly (not a method)
  return response.text;
};

export const analyzeLandmark = async (base64Image: string) => {
  const ai = getAI();
  const prompt = "Identify this monument or landmark in India. Provide its name, a short description, 3 historical facts, and 2 safety tips for tourists visiting this location. Format the response as JSON with keys: name, description, historicalFacts (array), safetyTips (array).";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
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

  // Ensure parsing from .text property
  return JSON.parse(response.text || '{}');
};
