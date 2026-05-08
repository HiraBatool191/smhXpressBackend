require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= HTTP SERVER =================
const server = http.createServer(app);

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ================= SOCKET CONNECTION =================
io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  // RECEIVE MESSAGE
  socket.on("send_message", (data) => {

    console.log("Message:", data);

    // SEND TO EVERYONE
    io.emit("receive_message", data);

  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

});

// ========== ROUTES ==========
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const productsRoute = require("./routes/products");
const sendOtpRoute = require("./routes/otp");
const verifyOtpRoute = require("./routes/verifyOtp");
const resetPasswordRoute = require("./routes/resetPassword");
const dashboardRoute = require("./routes/dashboard");
const cartRoute = require("./routes/cart");
const trackRoute = require("./routes/track");
const messageRoute = require("./routes/messages");
const paymentRoute = require("./routes/payment");
const adminSignupRoute = require("./routes/adminSignup");
const adminLoginRoute = require("./routes/adminLogin");
const contactRoute = require("./routes/contact");

// ========== ROUTE MIDDLEWARE ==========
app.use("/api/signup", signupRoute);
app.use("/api/signup", contactRoute);
app.use("/api/login", loginRoute);
app.use("/api/products", productsRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/cart", cartRoute);
app.use("/api/send-otp", sendOtpRoute);
app.use("/api/verify-otp", verifyOtpRoute);
app.use("/api/reset-password", resetPasswordRoute);
app.use("/api/track", trackRoute);
app.use("/api/messages", messageRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/admin/signup", adminSignupRoute);
app.use("/api/admin/login", adminLoginRoute);
app.use("/api/admin/login", adminLoginRoute);

// ================= HOME =================

app.get("/", (req, res) => {
  console.log("Backend hit");
  res.send("Backend is working!");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});