import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;