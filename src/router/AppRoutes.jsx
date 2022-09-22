import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const AppRoutes = () => {
  const { userAuth } = useContext(AuthContext);

  return (
    <>
      <Routes>
        {!!userAuth ? (
          <>
            <Route path="/*" element={<Navigate to={`/`} />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Navigate to={"/"} />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </>
        )}
      </Routes>
    </>
  );
};
