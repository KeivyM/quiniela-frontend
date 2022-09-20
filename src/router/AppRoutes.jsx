import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const AppRoutes = () => {
  const auth = true;

  return (
    <>
      <Routes>
        {auth ? (
          <>
            <Route path="/*" element={<Navigate to={`/`} />} />
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} /> */}
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
