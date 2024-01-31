import s from "./UserLogoModal.module.css";
import sprite from "../../../images/svg/sprite.svg";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const ModalRoot = document.getElementById("ModalRoot");

const UserLogoModal = ({ onModal }) => {
  const handleBackdrop = (event) => {
    if (event.currentTarget === event.target) {
      onModal();
    }
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.code === "Escape") {
        onModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onModal]);
  return createPortal(
    <div className={s.userLogoModalBackdrop} onClick={handleBackdrop}>
      <div className={s.userLogoModalWrapper}>
        <button
          className={s.userLogoModalButton}
          type="button"
          onClick={() => onModal()}
        >
          <svg className={s.userLogoModalSvg}>
            <use href={`${sprite}#icon-cog-6-tooth`} />
          </svg>
          Setting
        </button>
        <button
          className={s.userLogoModalButton}
          type="button"
          onClick={() => onModal()}
        >
          <svg className={s.userLogoModalSvg}>
            <use href={`${sprite}#icon-arrow-right-on-rectangle`} />
          </svg>
          Log out
        </button>
      </div>
    </div>,
    ModalRoot
  );
};

export default UserLogoModal;
