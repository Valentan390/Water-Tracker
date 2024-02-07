import s from "./EditWater.module.css";
import sprite from "../../../images/svg/sprite.svg";
import { useModal } from "../../../hooks/userModal";
import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/modal/modalSlice";
import { setIdForEditDeleteWater } from "../../../redux/waterUser/slice";

const EditWater = ({ id }) => {
  const { modalStatus } = useModal();
  const dispatch = useDispatch();

  const handleEditWater = () => {
    dispatch(setModalStatus(!modalStatus));
    dispatch(setModalContent("EditWaterEntry"));
    dispatch(setIdForEditDeleteWater(id));
  };
  return (
    <>
      <button
        className={s.editWaterButton}
        type="button"
        onClick={handleEditWater}
      >
        <svg className={s.editWaterSvg}>
          <use href={`${sprite}#icon-pencil-square`} />
        </svg>
      </button>
    </>
  );
};

export default EditWater;
