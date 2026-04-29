// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// require("./db");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ================= ROUTES =================
// const signupRoute = require("./routes/signup");
// const loginRoute = require("./routes/login");
// const productsRoute = require("./routes/products");
// const dashboardRoute = require("./routes/dashboard");
// const usersRoute = require("./routes/users");

// // ================= MOUNT ROUTES =================
// app.use("/api/signup", signupRoute);
// app.use("/api/login", loginRoute);
// app.use("/api/products", productsRoute);
// app.use("/api/dashboard", dashboardRoute);
// app.use("/api/users", usersRoute);

// // ================= ROOT =================
// app.get("/", (req, res) => {
//   res.send("Backend is working!");
// });

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ========== ROUTES ==========
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const productsRoute = require("./routes/products");
const dashboardRoute = require("./routes/dashboard");
const usersRoute = require("./routes/users");

// ========== MOUNT ROUTES ==========
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/products", productsRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/users", usersRoute);

// ========== HOME ==========
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// ========== SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});