import s from "./WaterAmountPicker.module.css";
import sprite from "../../../../images/svg/sprite.svg";

const WaterAmountPicker = ({
  title,
  amountWater,
  handleMinusWater,
  handlePlusWater,
}) => {
  return (
    <div>
      <p className={s.amountWaterTitle}>{title}</p>
      <p className={s.amountWater}>Amount of water:</p>
      <div className={s.amountWaterCantainer}>
        <button
          className={s.amountWaterButton}
          type="button"
          onClick={handleMinusWater}
        >
          <svg className={s.amountWaterSvg}>
            <use href={`${sprite}#icon-minus-small`} />
          </svg>
        </button>
        <p className={s.water}>{amountWater}ml</p>
        <button
          className={s.amountWaterButton}
          type="button"
          onClick={handlePlusWater}
        >
          <svg className={s.amountWaterSvgPlus}>
            <use href={`${sprite}#icon-plus-small`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterAmountPicker;
