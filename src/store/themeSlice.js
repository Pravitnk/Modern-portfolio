import { createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY = "theme-preference";

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch (error) {
    console.log(error);
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light"; // default
};

const initialState = {
  mode: getInitialTheme(), //'light' or 'dark'
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDark(state) {
      state.mode = "dark";
      localStorage.setItem(LOCAL_KEY, "dark");
    },
    setLight(state) {
      state.mode = "light";
      localStorage.setItem(LOCAL_KEY, "light");
    },
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem(LOCAL_KEY, state.mode);
    },
  },
});

export const { setDark, setLight, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
