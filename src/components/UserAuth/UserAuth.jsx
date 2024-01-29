import { Link } from "react-router-dom";
import sprite from "../../images/svg/sprite.svg";
import s from "./UserAuth.module.css";

const UserAuth = () => {
  return (
    <div className={s.userAuthWraper}>
      <Link className={s.userAuthLink} to={"/signin"}>
        Sign in
      </Link>
      <svg width="28" height="28">
        <use href={`${sprite}#icon-user`} />
      </svg>
    </div>
  );
};

export default UserAuth;
