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
const sendOtpRoute = require("./routes/otp");
const verifyOtpRoute = require("./routes/verifyOtp");
const resetPasswordRoute = require("./routes/resetPassword");
const dashboardRoute = require("./routes/dashboard");
const cartRoute = require("./routes/cart");


// ========== ROUTE MIDDLEWARE ==========
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/products", productsRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/cart", cartRoute); 
app.use("/api/send-otp", sendOtpRoute);
app.use("/api/verify-otp", verifyOtpRoute);
app.use("/api/reset-password", resetPasswordRoute);


// home route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});