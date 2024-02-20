import s from "./LastWaterInfo.module.css";
import moment from "moment";
import sprite from "../../../../images/svg/sprite.svg";

const LastWaterInfo = ({ lastWater, lastWaterTime }) => {
  return (
    <div className={s.lastWaterContainer}>
      <svg className={s.lastWaterSvg}>
        <use href={`${sprite}#icon-Frame-1`} />
      </svg>
      <p className={s.lastWater}>{lastWater}ml</p>
      <p className={s.lastWaterTime}>
        {moment(lastWaterTime).utc().format("HH:mm")}
      </p>
    </div>
  );
};

export default LastWaterInfo;
