import s from "./UserLogo.module.css";
import sprite from "../../images/svg/sprite.svg";
import { useAuth } from "../../hooks/userAuth";
import { useEffect, useState } from "react";
import UserLogoModal from "../Modal/UserLogoModal/UserLogoModal";

const UserLogo = () => {
  const { user } = useAuth();
  const [shownUserLogoModal, setShownUserLogoModal] = useState(false);

  const onModal = () => {
    setShownUserLogoModal(!shownUserLogoModal);
  };

  useEffect(() => {
    if (shownUserLogoModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // return () => {
    //   document.body.style.overflow = 'auto';
    // };
  }, [shownUserLogoModal]);

  return (
    <div className={s.userLogoWraper}>
      <p className={s.userLogoName}>{user.username}</p>
      <img className={s.userLogoImg} src={user.avatarURL} alt="avatarURL" />
      <button className={s.userLogoButton} onClick={onModal}>
        <svg className={s.userLogoSvg}>
          <use href={`${sprite}#icon-chevron-double-up`} />
        </svg>
      </button>
      {shownUserLogoModal && <UserLogoModal onModal={onModal} />}
    </div>
  );
};

export default UserLogo;
