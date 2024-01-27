import s from "./UserLogoModal.module.css";
import sprite from "../../images/svg/sprite.svg";

const UserLogoModal = () => {
  const userName = "Valentyn";
  const avatarUrl = "https://ava-24.com/_ph/98/2/453411342.jpg?1706346797";
  return (
    <div className={s.userLogoWraper}>
      <p className={s.userLogoName}>{userName}</p>
      <img className={s.userLogoImg} src={avatarUrl} alt="avatarUrl" />
      <button className={s.userLogoButton}>
        <svg className={s.userLogoSvg}>
          <use href={`${sprite}#icon-chevron-double-up`} />
        </svg>
      </button>
    </div>
  );
};

export default UserLogoModal;
