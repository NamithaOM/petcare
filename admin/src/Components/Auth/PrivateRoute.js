// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext"; // Import useAuth to get current user

// function PrivateRoute({ element, allowedTypes }) {
//   const { user } = useAuth();  // Get user data from AuthContext

//   console.log(user, "userData");  // Debug: Log the user object

//   if (!user || !user.userType || !allowedTypes.includes(user.userType.toLowerCase())) {
//     return <Navigate to="/" />;  // Redirect to login if user is not allowed
//   }

//   return element;
// }


// export default PrivateRoute;


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
