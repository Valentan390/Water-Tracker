import sprite from "../../images/svg/sprite.svg";
import s from "./UserAuth.module.css";

const UserAuth = () => {
  return (
    <div className={s.userAuthWraper}>
      <button className={s.userAuthButton}>Sign in</button>
      <svg width="28" height="28">
        <use href={`${sprite}#icon-user`} />
      </svg>
    </div>
  );
};

export default UserAuth;
