// utils/geminiML.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🧠 Estimate price from product info
export async function estimatePriceWithGemini({ title, description, condition, category }) {
  try {
    const prompt = `
You are an expert in second-hand product evaluation.
Estimate the fair market price in INR for the following product:

Title: ${title}
Description: ${description}
Condition: ${condition}
Category: ${category}

Return only the number, no currency symbol or explanation.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();
    const number = parseFloat(text.replace(/[^\d.]/g, ""));
    return isNaN(number) ? 0 : number;
  } catch (err) {
    console.error("Gemini Price Estimation Failed:", err.message);
    return 0;
  }
}

// 📸 Verify if the image is real & live
export async function verifyLiveImage(imageUrl, title, category) {
  try {
    const prompt = `
You are verifying if the uploaded photo is a live real photo of the product.
Match it with the following details:

Title: ${title}
Category: ${category}

If it's a real, live-captured image of the correct product, return "true". Else return "false".`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const base64Image = await fetchImageAsBase64(imageUrl);

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
    ]);

    const response = result.response;
    const verdict = await response.text();
    return verdict.toLowerCase().includes("true");
  } catch (err) {
    console.error("Gemini Vision Verification Failed:", err.message);
    return false;
  }
}

// 🔧 Convert image URL to base64
async function fetchImageAsBase64(imageUrl) {
  const res = await fetch(imageUrl);
  const buffer = await res.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}
