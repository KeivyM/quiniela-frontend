import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [updateData, setUpdateData] = useState(false);
  const [userAuth, setUserAuth] = useState(() => {
    const data = localStorage.getItem("user_Auth");
    const token = JSON.parse(data);
    return token;
  }); // debe tener el JWT del usuario autenticado

  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("user_Auth");
    return !!data;
  }); // debe tener un valor boolean dependiendo si esta autenticado

  useEffect(() => {
    const data = localStorage.getItem("user_Auth");
    if (!data) return;

    const user = JSON.parse(data);
    setUserAuth(user);
  }, [updateData]);

  return (
    <>
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
          updateData,
          setUpdateData,
          userAuth,
          setUserAuth,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
