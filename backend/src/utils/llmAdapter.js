require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function analyzeCodeLLM(codeText, filename = "file") {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      summary: "Missing API key",
      suggestions: [
        {
          severity: "Critical",
          title: "No GEMINI_API_KEY",
          detail: "Add your Gemini API key in backend/.env",
          suggestion: "Generate one at https://aistudio.google.com/app/apikey",
        },
      ],
    };
  }

  const prompt = `
You are a senior software engineer performing a code review.
Analyze the following code for readability, modularity, and potential bugs.

Filename: ${filename}

--- CODE START ---
${codeText}
--- CODE END ---

Return only a JSON object:
{
  "summary": "...",
  "suggestions": [
    { "severity": "Minor|Moderate|Major|Critical", "title": "...", "detail": "...", "suggestion": "..." }
  ]
}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
    }

    const data = await res.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // 🧩 Auto-extract JSON inside ```json ... ``` blocks
    const match = text.match(/```json\s*([\s\S]*?)```/);
    if (match) text = match[1].trim();

    try {
      return JSON.parse(text);
    } catch {
      return {
        summary: "Gemini Review Output",
        suggestions: [
          {
            severity: "Info",
            title: "Raw Output",
            detail: text,
            suggestion: "Gemini returned non-JSON output.",
          },
        ],
      };
    }
  } catch (err) {
    console.error("Gemini fetch error:", err.message);
    return {
      summary: "Error: Gemini request failed",
      suggestions: [
        {
          severity: "Critical",
          title: "API Error",
          detail: err.message,
          suggestion: "Verify key or try again later.",
        },
      ],
    };
  }
}

module.exports = { analyzeCodeLLM };
