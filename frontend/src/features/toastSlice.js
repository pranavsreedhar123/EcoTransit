import { createStandaloneToast } from "@chakra-ui/react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const { toast } = createStandaloneToast();
const initialState = {
  title: "",
  description: "",
  status: "info",
  duration: 5000,
  isClosable: true,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState: initialState,
  reducers: {
    showToast: (state, action: PayloadAction) => {
      state = { ...state, ...action.payload };
      toast(state);
    },
  },
});

export const { showToast } = toastSlice.actions;

export default toastSlice.reducer;
