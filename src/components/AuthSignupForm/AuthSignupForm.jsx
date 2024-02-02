import s from "./AuthSignupForm.module.css";
import { Link } from "react-router-dom";
import sprite from "../../images/svg/sprite.svg";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logInUser, registerUser } from "../../redux/authUser/operations";

const emailRegexp = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const schemaSignup = yup
  .object({
    username: yup.string().min(3).required(),
    email: yup.string().matches(emailRegexp, "Invalid email format").required(),
    password: yup.string().min(8).max(64).required(),
  })
  .required();

const AuthSignupForm = () => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    repeatPassword: false,
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schemaSignup),
  });

  const password = watch("password", "");

  const handlePasswordConfirmationChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    // setPasswordMatch(confirmPassword === password);
  };

  const handleConfirmPasswordBlur = () => {
    setPasswordMatch(confirmPassword === password);
  };

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const onSubmit = async ({ username, email, password }, e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ username, email, password })).unwrap();
      await dispatch(logInUser({ email, password }));
      reset();
      toast.success("Registration completed successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={s.signupPageWraper}>
      <h4 className={s.signupPageTitle}>Sign Up</h4>
      <form className={s.signupPageForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.signupPageLabel}>
          Enter your username
          <input
            className={`${s.signupPageInput} ${
              errors.username ? s.signupPageInputError : ""
            }`}
            {...register("username")}
            maxLength="33"
            placeholder="username"
          />
          <p className={s.errorMessage}>{errors.username?.message}</p>
        </label>

        <label className={s.signupPageLabel}>
          Enter your email
          <input
            className={`${s.signupPageInput} ${
              errors.email ? s.signupPageInputError : ""
            }`}
            {...register("email")}
            maxLength="33"
            placeholder="E-mail"
          />
          <p className={s.errorMessage}>{errors.email?.message}</p>
        </label>

        <label className={s.signupPageLabel}>
          Enter your password
          <input
            className={`${s.signupPageInput} ${
              errors.password ? s.signupPageInputError : ""
            } ${!passwordMatch ? s.signupPageInputError : ""}`}
            {...register("password")}
            maxLength="33"
            placeholder="Password"
            type={passwordVisible.password ? "text" : "password"}
          />
          <p className={s.errorMessage}>{errors.password?.message}</p>
          <button
            className={s.signupPageInputButton}
            type="button"
            onClick={() => togglePasswordVisibility("password")}
          >
            <svg className={s.signupPageInputButtonSvg}>
              <use
                href={`${sprite}#icon-${
                  passwordVisible.password ? "eye" : "eye-slash"
                }`}
              />
            </svg>
          </button>
        </label>

        <label className={s.signupPageLabel}>
          Repeat password
          <input
            className={`${s.signupPageInput} ${
              !passwordMatch ? s.signupPageInputError : ""
            }`}
            type={passwordVisible.repeatPassword ? "text" : "password"}
            maxLength="33"
            placeholder="Repeat password"
            onChange={handlePasswordConfirmationChange}
            onBlur={handleConfirmPasswordBlur}
          />
          {!passwordMatch && (
            <p className={s.errorMessage}>Passwords do not match</p>
          )}
          <button
            className={s.signupPageInputButton}
            type="button"
            onClick={() => togglePasswordVisibility("repeatPassword")}
          >
            <svg className={s.signupPageInputButtonSvg}>
              <use
                href={`${sprite}#icon-${
                  passwordVisible.repeatPassword ? "eye" : "eye-slash"
                }`}
              />
            </svg>
          </button>
        </label>

        <button
          className={s.signupPageButton}
          name="Registration"
          type="submit"
          disabled={!isDirty || !passwordMatch}
        >
          Sign Up
        </button>
      </form>

      <Link to={"/signin"} className={s.signupPageLink}>
        Sign in
      </Link>
    </div>
  );
};

export default AuthSignupForm;
