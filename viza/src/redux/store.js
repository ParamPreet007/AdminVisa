import { configureStore } from "@reduxjs/toolkit";
import { popupProps } from "./common";
import { authLogin } from "./auth";


export const store = configureStore({
  reducer: {
    popupProps,authLogin
  },
});
