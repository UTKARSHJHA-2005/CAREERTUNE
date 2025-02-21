// AI Modal
import   { GoogleGenerativeAI,HarmCategory, HarmBlockThreshold} from "@google/generative-ai";
const apiKey = "AIzaSyCisy9jrQ8UFeIv15ldi6JJ0WSA8kT117M";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
});
export const AI_Prompt="{content} and don't start with Okay.I understand and all start with the main point"; // Message sent to the AI.