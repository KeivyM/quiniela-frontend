import { useCallback, useEffect } from "react";
import { useState } from "react";
import { AxiosConfig } from "../utils/AxiosConfig";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userAuth, setUserAuth] = useState(() =>
    localStorage.getItem("user_Auth")
  ); // debe tener el JWT del usuario autenticado

  const refreshToken = useCallback(async () => {
    // const TOKEN = userAuth;

    const { data } = await AxiosConfig.get("auth/check-status");
    console.log("DATA:", data.token);
    // const newToken = JSON.parse(data.token);
    localStorage.setItem("user-Auth", data.token);
    setUserAuth(data.token);
    setUsername(data._doc.username);
  }, []);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  return (
    <>
      <AuthContext.Provider
        value={{ userAuth, setUserAuth, setUsername, username }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
