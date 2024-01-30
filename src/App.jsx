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
import Loader from "./components/Loader/Loader.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RestrictedRoute redirectTo="/home" component={WelcomePage} />
            }
          />

          <Route
            path="/signup"
            element={
              <RestrictedRoute redirectTo="/home" component={SignupPage} />
            }
          />

          <Route
            path="/signin"
            element={
              <RestrictedRoute redirectTo="/home" component={SigninPage} />
            }
          />

          <Route
            path="/home"
            element={<PrivateRoute redirectTo="/signin" component={HomePage} />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
