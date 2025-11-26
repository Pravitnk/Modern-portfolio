import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store.js";

function ThemeApplier({ children }) {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const html = document.documentElement;
    if (mode === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
    }
  }, [mode]);
  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeApplier>
        <App />
      </ThemeApplier>
    </Provider>
  </StrictMode>
);
