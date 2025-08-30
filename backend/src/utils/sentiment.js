import Sentiment from "sentiment";
const sentiment = new Sentiment();

export function analyzeMood(message) {
  const lower = message.toLowerCase();

  if (lower.includes("sad") || lower.includes("depressed") || lower.includes("upset")) {
    return "sad";
  } else if (lower.includes("happy") || lower.includes("excited") || lower.includes("great")) {
    return "happy";
  } else {
    return "neutral";
  }
};
