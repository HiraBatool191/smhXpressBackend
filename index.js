// const express = require("express");
// const cors = require("cors");
// require("./db");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const signupRoute = require("./routes/signup");
// const signinRoute = require("./routes/signin");

// app.use("/api", signupRoute);
// app.use("/api", signinRoute);

// app.get("/", (req, res) => {
//   res.send("Backend is working!");
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// require("./db");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// const signupRoute = require("./routes/signup");
// const loginRoute = require("./routes/login");
// const productsRoute = require("./routes/products");

// app.use("/api", signupRoute);
// app.use("/api", loginRoute);
// app.use("/api", productsRoute);

// app.get("/", (req, res) => res.send("Backend is working!"));

// // ✅ IMPORTANT CHANGE HERE
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db"); // MongoDB connection

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const productsRoute = require("./routes/products");

// Mount routes with clear prefixes
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/products", productsRoute);

app.get("/", (req, res) => res.send("Backend is working!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
