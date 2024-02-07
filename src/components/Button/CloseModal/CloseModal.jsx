import s from "./CloseModal.module.css";
import sprite from "../../../images/svg/sprite.svg";
import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/modal/modalSlice";

const CloseModal = ({ title }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent(null));
  };
  return (
    <div className={s.closeModalWrapper}>
      <h4 className={s.closeModalTitle}>{title}</h4>
      <button type="button" onClick={handleCloseModal}>
        <svg className={s.closeModalSvg}>
          <use href={`${sprite}#icon-outline`} />
        </svg>
      </button>
    </div>
  );
};

export default CloseModal;
