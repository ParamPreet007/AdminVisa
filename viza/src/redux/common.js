import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "popup",
  initialState: {
    open: false,
    msg: "",
    onOk: () => {},
    onCancel: () => {},
    okText: "Ok",
    cancelText: "Cancel",
    icon: "",
    loading: false,
  },
  reducers: {
    setPopupProps: (_, action) => action.payload,
    closePopup: (state) => {
      state.open = false;
      state.loading = false;
    },
    setPopupLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPopupProps, closePopup, setPopupLoading } = slice.actions;
export const popupProps = slice.reducer;
