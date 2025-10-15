const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const uploadRoute = require("./routes/upload");
const reviewRoute = require("./routes/review");
const reportsRoute = require("./routes/reports");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({  origin: ["http://localhost:5173", "https://your-frontend-domain.netlify.app"] }));
app.use(bodyParser.json());
app.get("/health", (req, res) => res.json({ status: "OK" }));

app.use("/upload", uploadRoute);
app.use("/review", require("./routes/review"));
app.use("/reports", reportsRoute);

app.listen(PORT, () =>
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
);

