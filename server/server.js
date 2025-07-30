// server/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // dotenv se .env file load

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// 👇 API Routes
app.get("/api/test", (req, res) => {
  res.json({ message: "API working!" });
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});

const propertyRoutes = require("./routes/propertyRoutes");
app.use("/api/properties", propertyRoutes);
