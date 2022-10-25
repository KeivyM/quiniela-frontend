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
  ); // debe tener el JWT del usuario autenticado

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
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.info(error.code, error.message);
      localStorage.removeItem("user_Auth");
      navigate("/");
    }
  }, [navigate, userAuth]);

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
          setUserAuth,
          setUsername,
          setPoints,
          username,
          points,
          loading,
          setLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
