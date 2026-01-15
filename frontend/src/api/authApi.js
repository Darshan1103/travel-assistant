// src/api/authApi.js
import API from "./axiosinstance.js";

// Register a new user
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// Login an existing user
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  if (res.data?.token) {
    localStorage.setItem("user", JSON.stringify(res.data)); // save user + token
  }
  return res.data;
};

// Get user profile (requires JWT)
export const getProfile = async () => {
  const res = await API.get("/auth/profile");
  return res.data;
};
