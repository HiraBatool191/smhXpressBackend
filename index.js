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
// const sendOtpRoute = require("./routes/Otp");
// const verifyOtpRoute = require("./routes/verifyOtp");
// const resetPasswordRoute = require("./routes/resetPassword");

// app.use("/api/signup", signupRoute);
// app.use("/api/login", loginRoute);
// app.use("/api/products", productsRoute);
// app.use("/api/send-otp", sendOtpRoute);
// app.use("/api/verify-otp", verifyOtpRoute);
// app.use("/api/reset-password", resetPasswordRoute);

// app.get("/", (req, res) => res.send("Backend is working!"));

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

// Routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const productsRoute = require("./routes/products");
const sendOtpRoute = require("./routes/Otp");
const verifyOtpRoute = require("./routes/verifyOtp");
const resetPasswordRoute = require("./routes/resetPassword");

app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api", productsRoute);           // ✅ FIX: /api/products → route mein /products hai
app.use("/api/send-otp", sendOtpRoute);
app.use("/api/verify-otp", verifyOtpRoute);
app.use("/api/reset-password", resetPasswordRoute);

app.get("/", (req, res) => res.send("Backend is working!"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});