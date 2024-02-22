import s from "./PasswordVisibilityButton.module.css";
import sprite from "../../../images/svg/sprite.svg";

const PasswordVisibilityButton = ({
  passwordVisible,
  togglePasswordVisibility,
}) => {
  return (
    <button
      className={s.signupPageInputButton}
      type="button"
      onClick={togglePasswordVisibility}
    >
      <svg className={s.signupPageInputButtonSvg}>
        <use href={`${sprite}#icon-${passwordVisible ? "eye" : "eye-slash"}`} />
      </svg>
    </button>
  );
};

export default PasswordVisibilityButton;
