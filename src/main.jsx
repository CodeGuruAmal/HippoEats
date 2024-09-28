import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster toastOptions={{duration:1500, style:{fontSize:"13px", fontFamily: "Gilroy-Semibold"} }}/>
    </Provider>
  </BrowserRouter>
);
