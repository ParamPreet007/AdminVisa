import { configureStore } from "@reduxjs/toolkit";
import { popupProps } from "./common";


export const store = configureStore({
  reducer: {
    popupProps,
  },
});
