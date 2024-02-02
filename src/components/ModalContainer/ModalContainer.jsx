import s from "./ModalContainer.module.css";

import { useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../../hooks/userModal";
import { motion, AnimatePresence } from "framer-motion";

const modalRootElement = document.getElementById("ModalRoot");

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: { delay: 0, duration: 0.5 },
  },
};

const ModalContainer = ({ onClose, children }) => {
  const element = useMemo(() => document.createElement("div"), []);

  const { modalStatus } = useModal();

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape" && modalStatus) {
        onClose();
      }
    },
    [modalStatus, onClose]
  );

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (modalStatus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    modalRootElement.appendChild(element);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      modalRootElement.removeChild(element);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [element, handleKeyDown, modalStatus]);

  return createPortal(
    <AnimatePresence>
      {modalStatus && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className={s.modalContainerBackdrop}
            onClick={handleBackdropClick}
          >
            <div className={s.modalContainerWrapper}>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    element
  );
};

export default ModalContainer;
