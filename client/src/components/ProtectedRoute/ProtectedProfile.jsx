import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

const ProtectedProfile = () => {
  const { user, setIsLoggedIn, setUserId, setToken, setUsername } = useLogin();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setUserId(user.id);
      setToken(user.token);
      setUsername(user.username);
    }
  }, [user]);

  return user.token ? <Outlet /> : <Navigate to="/user/login" />;
};
export default ProtectedProfile;
