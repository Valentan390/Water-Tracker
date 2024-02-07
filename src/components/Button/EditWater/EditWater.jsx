import s from "./EditWater.module.css";
import sprite from "../../../images/svg/sprite.svg";

const EditWater = () => {
  return (
    <>
      <button>
        <svg className={s.editWaterSvg}>
          <use href={`${sprite}#icon-pencil-square`} />
        </svg>
      </button>
    </>
  );
};

export default EditWater;
