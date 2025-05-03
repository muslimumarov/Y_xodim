import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer transition={Slide} />
    <App />
  </BrowserRouter>
);
