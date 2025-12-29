import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

interface EmailGenerationResult {
  subject: string;
  body: string;
}

export const generateEmailContent = async (
  topic: string,
  audience: string,
  tone: string
): Promise<EmailGenerationResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert email marketing copywriter. Write a compelling email for a marketing campaign.
      
      Topic: ${topic}
      Target Audience: ${audience}
      Tone: ${tone}
      
      Return the response in JSON format with two fields: 'subject' and 'body'. The body should be formatted as HTML (using basic tags like <p>, <br>, <strong>).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            body: { type: Type.STRING },
          },
          required: ["subject", "body"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as EmailGenerationResult;

  } catch (error) {
    console.error("Error generating email:", error);
    throw error;
  }
};
