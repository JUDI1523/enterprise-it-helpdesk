import { create } from "zustand";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../api/authApi";

const useAuthStore = create((set) => ({
  currentUser: null,
  token: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("authToken", data.token);

      set({
        currentUser: data.user,
        token: data.token,
        loading: false,
      });

      return true;
    } catch (error) {
      console.error("Login failed:", error);

      set({ loading: false });

      return false;
    }
  },


register: async (
  name,
  email,
  password,
  passwordConfirmation
) => {
  set({ loading: true });

  try {
    const data = await registerUser(
      name,
      email,
      password,
      passwordConfirmation
    );

    localStorage.setItem(
      "authToken",
      data.token
    );

    set({
      currentUser: data.user,
      token: data.token,
      loading: false,
    });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "Registration failed:",
      error
    );

    set({ loading: false });

    return {
      success: false,
      error:
        error.message ||
        "Registration failed. Please try again.",
    };
  }
},


  loadCurrentUser: async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    try {
      const user = await getCurrentUser();

      set({
        currentUser: user,
        token,
      });
    } catch (error) {
      console.error(
        "Failed to load current user:",
        error
      );

      localStorage.removeItem("authToken");

      set({
        currentUser: null,
        token: null,
      });
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed:", error);
    }

    localStorage.removeItem("authToken");

    set({
      currentUser: null,
      token: null,
    });
  },
}));

export default useAuthStore;
