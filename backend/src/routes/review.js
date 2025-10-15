const express = require("express");
const fs = require("fs");
const db = require("../db");
const { analyzeCodeLLM } = require("../utils/llmAdapter");

const router = express.Router();

// ✅ Correct route path
router.post("/", (req, res) => {
  const { submission_id } = req.body;
  if (!submission_id)
    return res.status(400).json({ error: "submission_id required" });

  db.get(
    "SELECT * FROM submissions WHERE id = ?",
    [submission_id],
    async (err, row) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (!row) return res.status(404).json({ error: "Submission not found" });

      try {
        const codeText = fs.readFileSync(row.filepath, "utf8");
        console.log(`🧠 Gemini analysis started for: ${row.filename}`);

        const analysis = await analyzeCodeLLM(codeText, row.filename);

        const stmt = db.prepare(
          "INSERT INTO reports (submission_id, summary, suggestions) VALUES (?, ?, ?)"
        );

        stmt.run(
          submission_id,
          analysis.summary,
          JSON.stringify(analysis.suggestions),
          function (e) {
            if (e) return res.status(500).json({ error: "DB insert failed" });
            res.json({
              report_id: this.lastID,
              summary: analysis.summary,
              suggestions: analysis.suggestions,
            });
          }
        );
      } catch (error) {
        console.error("❌ Review error:", error);
        res.status(500).json({ error: "Error analyzing code" });
      }
    }
  );
});

module.exports = router;
