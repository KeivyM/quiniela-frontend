import { useCallback, useEffect } from "react";
import { useState } from "react";
import { AxiosConfig } from "../utils/AxiosConfig";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userAuth, setUserAuth] = useState(() =>
    JSON.parse(localStorage.getItem("user_Auth"))
  ); // debe tener el JWT del usuario autenticado

  const refreshToken = useCallback(async () => {
    const { data } = await AxiosConfig.get("auth/check-status", {
      headers: { Authorization: `Bearer ${userAuth}` },
    });
    // console.log("DATA:", data);
    localStorage.setItem("user_Auth", JSON.stringify(data.token));
    setUserAuth(data.token);
    setUsername(data._doc.username);
  }, [userAuth]);

  useEffect(() => {
    // console.log(userAuth);
    refreshToken();
  }, [refreshToken, userAuth]);

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
