import React, { useEffect, useState } from "react";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
    setLoading(false);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="dashboard/*" element={<Dashboard />} />
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
