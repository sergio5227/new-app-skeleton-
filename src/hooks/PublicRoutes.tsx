import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet/* s */ } from "react-router-dom";


const PublicRouter: React.FC<{}> = ( ) => {
  //const location = useLocation();
  const inSession = useSelector((state: any) => state?.app?.user?.token || false);
 /*  if(location?.pathname.includes('dashboard-apm') || location?.pathname === '/acerca' || location?.pathname.includes('info-dirac') || location?.pathname.includes('ver-estimacion-public')  ){
    return  <Outlet /> ;
  } */

  return !inSession ? <Outlet /> : <Navigate to={'/dashboard'} />;
};

export default PublicRouter;