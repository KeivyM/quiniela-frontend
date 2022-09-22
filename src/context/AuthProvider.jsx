import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(() =>
    localStorage.getItem("user_Auth")
  ); // debe tener el JWT del usuario autenticado

  return (
    <>
      <AuthContext.Provider value={{ userAuth, setUserAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
