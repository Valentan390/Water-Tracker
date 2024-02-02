import s from "./UserLogoutModal.module.css";

import sprite from "../../../images/svg/sprite.svg";
import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/modal/modalSlice";
import { logOutUser } from "../../../redux/authUser/operations";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants } from "../../ModalContainer/ModalContainer.jsx";

const UserLogoutModal = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent(null));
  };

  const handlelogOutUser = () => {
    dispatch(logOutUser());
    handleCloseModal();
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={s.userLogoutModalWrapper}>
            <div className={s.userLogoutModalСlose}>
              <h4 className={s.userLogoutModalTitle}>Log out</h4>
              <button type="button" onClick={handleCloseModal}>
                <svg className={s.userLogoutModalSvg}>
                  <use href={`${sprite}#icon-outline`} />
                </svg>
              </button>
            </div>
            <p className={s.userLogoutModalRealy}>
              Do you really want to leave?
            </p>
            <div className={s.userLogoutModalButton}>
              <button
                className={s.userLogoutModalCancel}
                type="button"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className={s.userLogoutModalLogout}
                type="button"
                onClick={handlelogOutUser}
              >
                Log out
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default UserLogoutModal;
