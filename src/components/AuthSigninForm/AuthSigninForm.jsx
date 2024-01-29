import s from "./AuthSigninForm.module.css";

import { Link } from "react-router-dom";
import sprite from "../../images/svg/sprite.svg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logInUser } from "../../redux/authUser/operations";

const emailRegexp = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const schemaSignin = yup
  .object({
    email: yup.string().matches(emailRegexp, "Invalid email format").required(),
    password: yup.string().min(8).max(64).required(),
  })
  .required();

const AuthSigninForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignin),
  });

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = (data) => {
    if (data) {
      dispatch(logInUser(data));
    }
  };
  return (
    <div className={s.signinPageWraper}>
      <h4 className={s.signinPageTitle}>Sign In</h4>
      <form className={s.signinPageForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.signinPageLabel}>
          Enter your email
          <input
            className={`${s.signinPageInput} ${
              errors.email ? s.signinPageInputError : ""
            }`}
            {...register("email")}
            maxLength="33"
            placeholder="E-mail"
          />
          <p className={s.errorMessage}>{errors.email?.message}</p>
        </label>

        <label className={s.signinPageLabel}>
          Enter your password
          <input
            className={`${s.signinPageInput} ${
              errors.password ? s.signinPageInputError : ""
            }`}
            {...register("password")}
            maxLength="33"
            placeholder="Password"
            type={passwordVisible ? "text" : "password"}
          />
          <p className={s.errorMessage}>{errors.password?.message}</p>
          <button
            className={s.signinPageInputButton}
            type="button"
            onClick={togglePasswordVisibility}
          >
            <svg className={s.signinPageInputButtonSvg}>
              <use
                href={`${sprite}#icon-${passwordVisible ? "eye" : "eye-slash"}`}
              />
            </svg>
          </button>
        </label>
        <button className={s.signinPageButton} name="Signin" type="submit">
          Sign In
        </button>
      </form>
      <Link className={s.signinPageLink} to={"/signup"}>
        Sign up
      </Link>
    </div>
  );
};

export default AuthSigninForm;
