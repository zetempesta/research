import { TabContainer } from "./Components/TabContainer/TabContainer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import ForgotPassword from "./Components/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/Auth/ResetPassword/ResetPassword";
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("questionare_user"));
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="main-app">
      <div className="app-bg"></div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<TabContainer />} />
      </Routes>
    </div>
  );
}

export default App;
