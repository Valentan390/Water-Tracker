import { useDispatch } from "react-redux";
import CloseModal from "../../Button/CloseModal/CloseModal";
import s from "./DeleteEntry.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants } from "../../ModalContainer/ModalContainer.jsx";
import { deleteWater } from "../../../redux/waterUser/operations";
import { useWaters } from "../../../hooks/userWaters";
import useCloseModal from "../../../hooks/useCloseModal.js";

const DeleteEntry = () => {
  const dispatch = useDispatch();
  const handleCloseModal = useCloseModal();
  const { idForEditDeleteWater } = useWaters();

  const handleDeleteWater = () => {
    dispatch(deleteWater(idForEditDeleteWater));
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
          <div className={s.deleteEntryWrapper}>
            <CloseModal title="Delete entry" />
            <p className={s.deleteEntry}>
              Are you sure you want to delete the entry?
            </p>
            <div className={s.deleteEntryButtonContainer}>
              <button
                className={s.deleteEntryButtonCancel}
                type="button"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className={s.deleteEntryButtonDelete}
                type="button"
                onClick={handleDeleteWater}
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default DeleteEntry;
