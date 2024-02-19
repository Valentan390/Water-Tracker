import { useState } from "react";
import s from "./PasswordInput.module.css";
import sprite from "../../../../images/svg/sprite.svg";

const PasswordInput = ({ label, name, errors, register }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <label className={s.settingModalUserInfoLabel} htmlFor={name}>
      {label}
      <input
        className={`${s.settingModalUserInfoInput} ${
          errors[name] ? s.settingModalUserInfoInputError : ""
        }`}
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
        name={name}
        {...register(name)}
      />
      <p className={s.errorMessage}>{errors[name]?.message}</p>
      <button
        className={s.signupPageInputButton}
        type="button"
        onClick={togglePasswordVisibility}
      >
        <svg className={s.signupPageInputButtonSvg}>
          <use
            href={`${sprite}#icon-${passwordVisible ? "eye" : "eye-slash"}`}
          />
        </svg>
      </button>
    </label>
  );
};

export default PasswordInput;
