import { useEffect } from "react";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="dashboard/*" element={localStorage.getItem("token") ? <Dashboard /> : <SignIn />} />
    </Routes>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
