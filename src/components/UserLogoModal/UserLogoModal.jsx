import s from "./UserLogoModal.module.css";
import sprite from "../../images/svg/sprite.svg";
import { useAuth } from "../../hooks/userAuth";

const UserLogoModal = () => {
  const { user } = useAuth();

  return (
    <div className={s.userLogoWraper}>
      <p className={s.userLogoName}>{user.username}</p>
      <img className={s.userLogoImg} src={user.avatarURL} alt="avatarURL" />
      <button className={s.userLogoButton}>
        <svg className={s.userLogoSvg}>
          <use href={`${sprite}#icon-chevron-double-up`} />
        </svg>
      </button>
    </div>
  );
};

export default UserLogoModal;
