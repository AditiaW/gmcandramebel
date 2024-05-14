import React, { useEffect, useState } from "react";
import useAuth from "../custom-hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      setUserLoaded(true);
    }
  }, [currentUser]);

  if (!userLoaded) {
    // Tampilkan loading spinner atau indikator lainnya jika user belum dimuat
    return null;
  }

  if (currentUser && currentUser.email) {
    const isAdmin = currentUser.email === "admin@gmail.com";
    return isAdmin ? <Outlet /> : <Navigate to="/home" />;
  } else {
    return <Navigate to="/home" />;
  }
};

export default ProtectedRoute;
