import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash"; 

export async function getGeminiResponse(history = []) {
  try {
    const contents = history.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Gemini HTTP error:", response.status, text);
      throw new Error(`Gemini HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Gemini RAW RESPONSE:", JSON.stringify(data, null, 2));

    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "Error fetching response.";
  }
}
