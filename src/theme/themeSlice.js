import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkModeOn(state) {
      state.darkMode = true;
    },
    setDarkModeOff(state) {
      state.darkMode = false;
    },
  },
});

export const { setDarkModeOn, setDarkModeOff } = slice.actions;

export default slice.reducer;
