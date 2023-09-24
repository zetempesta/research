import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ToastContainer />
    <App />
  </Router>
);
