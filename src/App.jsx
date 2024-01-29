import { useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import { useAuth } from "./hooks/userAuth";
import { refreshUser } from "./redux/authUser/operations";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import SigninPage from "./pages/SigninPage/SigninPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { LoginizationRoute } from "./components/loginizationRoute/loginization.jsx";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />

        <Route
          path="/signup"
          element={
            <RestrictedRoute redirectTo="/home" component={SignupPage} />
          }
        />

        <Route
          path="/signin"
          element={
            <LoginizationRoute redirectTo="/home" component={SigninPage} />
          }
        />

        <Route
          path="/home"
          element={<PrivateRoute redirectTo="/signin" component={HomePage} />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
