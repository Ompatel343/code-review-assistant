const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    "SELECT r.id, r.submission_id, r.summary, r.created_at, s.filename FROM reports r LEFT JOIN submissions s ON r.submission_id = s.id ORDER BY r.created_at DESC",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" });
      const list = rows.map((r) => ({
        id: r.id,
        submission_id: r.submission_id,
        summary: r.summary,
        filename: r.filename,
        created_at: r.created_at,
      }));
      res.json({ reports: list });
    }
  );
});

router.get("/:id", (req, res) => {
  db.get(
    "SELECT r.*, s.filename FROM reports r LEFT JOIN submissions s ON r.submission_id = s.id WHERE r.id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (!row) return res.status(404).json({ error: "Report not found" });
      res.json({
        id: row.id,
        submission_id: row.submission_id,
        filename: row.filename,
        summary: row.summary,
        suggestions: JSON.parse(row.suggestions),
        created_at: row.created_at,
      });
    }
  );
});

module.exports = router;
