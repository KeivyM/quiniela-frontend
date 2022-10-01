import { useCallback, useEffect, useState } from "react";
import { AxiosConfig } from "../utils/AxiosConfig";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(null);
  const [userAuth, setUserAuth] = useState(() =>
    JSON.parse(localStorage.getItem("user_Auth"))
  ); // debe tener el JWT del usuario autenticado

  const refreshToken = useCallback(async () => {
    try {
      const { data } = await AxiosConfig.get("auth/check-status", {
        headers: { Authorization: `Bearer ${userAuth}` },
      });
      localStorage.setItem("user_Auth", JSON.stringify(data.token));
      setUserAuth(data.token);
      setUsername(data._doc.username);
      setPoints(data._doc.points);
    } catch (error) {
      console.info(error.code, error.message);
    }
  }, [userAuth]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken, userAuth]);

  return (
    <>
      <AuthContext.Provider
        value={{ userAuth, setUserAuth, setUsername, username, points }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
