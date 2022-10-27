import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosConfig } from "../utils/AxiosConfig";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAuth, setUserAuth] = useState(() =>
    localStorage.getItem("user_Auth")
  );

  let navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    setLoading(true);
    try {
      AxiosConfig.defaults.headers.common["Authorization"] =
        `Bearer ${userAuth}` || "";

      const { data } = await AxiosConfig.get("auth/check-status");
      localStorage.setItem("user_Auth", data.token);
      setUserAuth(data.token);
      setUsername(data.username);
      setPoints(data.points);
    } catch (error) {
      localStorage.removeItem("user_Auth");
      navigate("/");
    }
  }, [navigate, userAuth]);

  const Logout = () => {
    setLoading(true);
    setPoints("");
    setUsername("");
    setUserAuth(false);
    localStorage.removeItem("user_Auth");
    navigate("/home");
  };

  useEffect(() => {
    if (!!userAuth) {
      refreshToken();
    } else return;
  }, [refreshToken, userAuth]);

  return (
    <>
      <AuthContext.Provider
        value={{
          userAuth,
          username,
          points,
          loading,
          setUserAuth,
          setLoading,
          Logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
