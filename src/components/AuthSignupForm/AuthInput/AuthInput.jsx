import { useState } from "react";
import s from "./AuthInput.module.css";
import PasswordVisibilityButton from "../../Button/PasswordVisibilityButton/PasswordVisibilityButton";

const AuthInput = ({ label, name, register, errors, placeholder }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <label className={s.signupPageLabel}>
      {label}
      <input
        className={`${s.signupPageInput} ${
          errors[name] ? s.signupPageInputError : ""
        }`}
        {...register(name)}
        maxLength="33"
        placeholder={placeholder}
        type={
          name === "password" || name === "repeatPassword"
            ? passwordVisible
              ? "text"
              : "password"
            : "text"
        }
      />
      <p className={s.errorMessage}>{errors[name]?.message}</p>
      {(name === "password" || name === "repeatPassword") && (
        <PasswordVisibilityButton
          passwordVisible={passwordVisible}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      )}
    </label>
  );
};

export default AuthInput;
