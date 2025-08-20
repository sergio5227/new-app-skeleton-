import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouterProps {
  path: string;
}

const PrivateRouter: React.FC<PrivateRouterProps> = (
  props: PrivateRouterProps
) => {
  const inSession = useSelector((state: any) => state?.app?.user?.token || false);
  return inSession ? <Outlet /> : <Navigate to={props?.path} />;
};

export default PrivateRouter;