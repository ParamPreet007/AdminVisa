import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticate: !!localStorage.token,
    token: "",
    user: {},
  },
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticate = true;
    },

    setLogout: (state, action) => {
      state.isAuthenticate = false;
      state.token = "";
      state.user = {};
      localStorage.clear();
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export const authLogin = authSlice.reducer;
