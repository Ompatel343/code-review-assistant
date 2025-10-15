const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const router = express.Router();

// ✅ Define and ensure upload directory exists
const uploadDir =
  process.env.UPLOAD_DIR || path.join(__dirname, "../../data/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ✅ Configure Multer storage
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) =>
    cb(null, `${Date.now()}-${uuidv4()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per file
});

// ✅ Upload route (Promise-based to prevent finalize race condition)
router.post("/", upload.array("files"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  try {
    // Insert uploaded files into DB
    const insertions = req.files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const stmt = db.prepare(
            "INSERT INTO submissions (filename, filepath) VALUES (?, ?)"
          );
          stmt.run(file.originalname, file.path, function (err) {
            if (err) {
              console.error("❌ DB insert error:", err.message);
              reject(err);
            } else {
              resolve({
                submission_id: this.lastID,
                filename: file.originalname,
              });
            }
          });
          stmt.finalize();
        })
    );

    const results = await Promise.all(insertions);

    console.log(
      "✅ Uploaded files:",
      results.map((r) => r.filename).join(", ")
    );
    res.json({ message: "Uploaded", submissions: results });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

module.exports = router;
