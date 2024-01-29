import { useAuth } from "../../hooks/userAuth.js";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const { isRegistered } = useAuth();

  if (typeof Component !== "function") {
    console.error("Error: Invalid component provided to RestrictedRoute.");
    return null;
  }

  return isRegistered ? <Navigate to={redirectTo} /> : <Component />;
};

RestrictedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};
