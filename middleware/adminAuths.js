import axios from "axios";

const API = "http://localhost:5000/api/admin";

// ================= LOGIN =================
export const adminLogin = async (email, password) => {
  const res = await axios.post(`${API}/login`, {
    email,
    password,
  });

  // SAVE TOKEN
  localStorage.setItem("adminToken", res.data.token);

  // SAVE ADMIN DATA
  localStorage.setItem("admin", JSON.stringify(res.data.admin));

  return res.data;
};

// ================= SIGNUP =================
export const adminSignup = async (name, email, password) => {
  const res = await axios.post(`${API}/signup`, {
    name,
    email,
    password,
  });

  return res.data;
};

// ================= LOGOUT =================
export const adminLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("admin");
};

// ================= GET ADMIN =================
export const getAdmin = () => {
  return JSON.parse(localStorage.getItem("admin"));
};

// ================= GET TOKEN =================
export const getToken = () => {
  return localStorage.getItem("adminToken");
};

// ================= CHECK LOGIN =================
export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("adminToken");
};