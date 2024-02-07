import { useDispatch } from "react-redux";
import CloseModal from "../../Button/CloseModal/CloseModal";
import s from "./DeleteEntry.module.css";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/modal/modalSlice";
// import DeleteWater from "../../Button/DeleteWater/DeleteWater";
import { deleteWater } from "../../../redux/waterUser/operations";
import { useWaters } from "../../../hooks/userWaters";

const DeleteEntry = () => {
  const dispatch = useDispatch();
  const { idForEditDeleteWater } = useWaters();

  console.log(idForEditDeleteWater);

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent(null));
  };

  const handleDeleteWater = () => {
    dispatch(deleteWater(idForEditDeleteWater));
    handleCloseModal();
  };
  return (
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
  );
};

export default DeleteEntry;
