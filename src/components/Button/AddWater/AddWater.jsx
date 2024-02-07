import s from "./AddWater.module.css";

const AddWater = ({ onClick }) => {
  return (
    <>
      <button className={s.addWaterButton} onClick={onClick}>
        + Add water
      </button>
    </>
  );
};

export default AddWater;
