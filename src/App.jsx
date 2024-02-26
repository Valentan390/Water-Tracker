import { useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import { useAuth } from "./hooks/userAuth";
import { refreshUser } from "./redux/authUser/operations";
import { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setModalContent, setModalStatus } from "./redux/modal/modalSlice.js";
import ModalContent from "./components/ModalContent/ModalContent.jsx";
import ModalContainer from "./components/ModalContainer/ModalContainer.jsx";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage.jsx"));
const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/ForgotPasswordPage/ForgotPasswordPage.jsx")
);
const UpdatePasswordPage = lazy(() =>
  import("./pages/UpdatePasswordPage/UpdatePasswordPage.jsx")
);

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent(null));
  };

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
            path="/forgot-password"
            element={
              <RestrictedRoute
                redirectTo="/home"
                component={ForgotPasswordPage}
              />
            }
          />

          <Route
            path="/update-password"
            element={
              <RestrictedRoute
                redirectTo="/home"
                component={UpdatePasswordPage}
              />
            }
          />

          <Route
            path="/home"
            element={<PrivateRoute redirectTo="/signin" component={HomePage} />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ModalContainer onClose={handleCloseModal}>
        {<ModalContent />}
      </ModalContainer>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
