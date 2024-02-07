import { useDispatch } from "react-redux";
import { useModal } from "../../../hooks/userModal";
import sprite from "../../../images/svg/sprite.svg";
import s from "./DeleteWater.module.css";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/modal/modalSlice";
import { setIdForEditDeleteWater } from "../../../redux/waterUser/slice";

const DeleteWater = ({ id }) => {
  const { modalStatus } = useModal();
  const dispatch = useDispatch();

  const handleDeleteWater = () => {
    dispatch(setModalStatus(!modalStatus));
    dispatch(setModalContent("DeleteEntry"));
    dispatch(setIdForEditDeleteWater(id));
    console.log(id);
  };
  return (
    <>
      <button type="button" onClick={handleDeleteWater}>
        <svg className={s.deleteWaterSvg}>
          <use href={`${sprite}#icon-trash`} />
        </svg>
      </button>
    </>
  );
};

export default DeleteWater;
