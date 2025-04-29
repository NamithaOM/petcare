
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PrivateRoute({ element, allowedTypes }) {
  const { user, loading } = useAuth();

  if (loading) {
      return <div>Loading...</div>; // or some other loading indicator
  }

  if (!user?.userType || !allowedTypes.includes(user.userType.toLowerCase())) {
      return <Navigate to="/" />;
  }

  return element;
}

export default PrivateRoute;
