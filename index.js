const express = require("express");
const cors = require("cors");
require("./db"); // MongoDB connection

const app = express();
app.use(cors());
app.use(express.json());

const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");

app.use("/api", signupRoute);   // /api/signup
app.use("/api", signinRoute);   // /api/signin

app.get("/", (req, res) => res.send("Backend is working!"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
