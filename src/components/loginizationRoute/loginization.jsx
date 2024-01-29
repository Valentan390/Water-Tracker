import { useAuth } from "../../hooks/userAuth.js";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const LoginizationRoute = ({
  component: Component,
  redirectTo = "/",
}) => {
  const { isLoggedIn } = useAuth();

  if (typeof Component !== "function") {
    console.error("Error: Invalid component provided to RestrictedRoute.");
    return null;
  }

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

LoginizationRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};
