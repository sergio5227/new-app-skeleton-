import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet/* s */ } from "react-router-dom";


const PublicRouter: React.FC<{}> = ( ) => {
  const inSession = useSelector((state: any) => state?.app?.user?.token || false);
  return !inSession ? <Outlet /> : <Navigate to={'/dashboard'} />;
};

export default PublicRouter;