import { Routes as Switch, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login/Login";
import PageNotFound from "./PageNotFound/PageNotFound";
import AuthContext from "./context/AuthContext";
import { useContext, useEffect } from "react";
import Home from "./Task/Home";
import Graph from "./Graph/Graph";

const ProtectedRoute = ({ children }:any) => {
  const myContext = useContext(AuthContext);
  let UserName:any =  localStorage.getItem('userName'); 

  // For gh page deplyment i have added  (START)
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.hash) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // (END)
  
  if (!UserName) {
    myContext.handleLogout();
    return <Navigate to="/login" replace />;
  }

  return children;
};

function RouteComponent() {

  return (
    <Switch>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="tasks" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="graph" element={<ProtectedRoute><Graph /></ProtectedRoute>} />
      
      <Route path="*" element={<PageNotFound />} />
    </Switch>
  )
}

export default RouteComponent