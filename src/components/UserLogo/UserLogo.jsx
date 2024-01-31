import s from "./UserLogo.module.css";
import sprite from "../../images/svg/sprite.svg";
import { useAuth } from "../../hooks/userAuth";
import { useDispatch } from "react-redux";
import { useModal } from "../../hooks/userModal";
import { setModalContent, setModalStatus } from "../../redux/modal/modalSlice";

const UserLogo = () => {
  const { user } = useAuth();

  const dispatch = useDispatch();
  const { modalStatus } = useModal();

  const handleOpenUserModal = () => {
    dispatch(setModalStatus(!modalStatus));
    dispatch(setModalContent("UserLogoModal"));
  };

  return (
    <div className={s.userLogoWraper}>
      <p className={s.userLogoName}>{user.username}</p>
      <img className={s.userLogoImg} src={user.avatarURL} alt="avatarURL" />
      <button className={s.userLogoButton} onClick={handleOpenUserModal}>
        <svg className={s.userLogoSvg}>
          <use href={`${sprite}#icon-chevron-double-up`} />
        </svg>
      </button>
    </div>
  );
};

export default UserLogo;
