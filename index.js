const express = require("express");
const cors = require("cors");
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const productsRoute = require("./routes/products");

app.use("/api", signupRoute);
app.use("/api", loginRoute);
app.use("/api", productsRoute);

app.get("/", (req, res) => res.send("Backend is working!"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
