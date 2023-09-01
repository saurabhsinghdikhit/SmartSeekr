import { Navigate,useLocation  } from "react-router-dom";

export const RouteValidate = ({ children }) => {
    const location = useLocation();
    let currentRoute = location.pathname;
    const items = JSON.parse(localStorage.getItem('userData'));
    if (items===null) {
    // user is not authenticated
        return <Navigate to="/" />;
    }
    if(items.userTypeValue!="Employer" && currentRoute=="/add-job")
        return <Navigate to="/" />;
    if(items.userTypeValue!="Employer" && currentRoute=="/job/:jobId")
        return <Navigate to="/" />;
    if(items.userTypeValue!="Employer" && currentRoute=="/employer-profile")
        return <Navigate to="/" />;
    if(items.userTypeValue!="Employer" && currentRoute=="/applied-candidate/:jobId")
        return <Navigate to="/" />;
    if(items.userTypeValue!="Applicant" && currentRoute=="/user-profile")
        return <Navigate to="/" />;
  return children;
};