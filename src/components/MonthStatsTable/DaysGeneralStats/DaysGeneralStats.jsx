import s from "./DaysGeneralStats.module.css";
import sprite from "../../../images/svg/sprite.svg";

const DaysGeneralStats = ({
  selectedDay,
  showModal,
  handleClose,
  dailyNorma,
  percentDailyNorm,
  consumptionCount,
  style,
}) => {
  return (
    <>
      {selectedDay && showModal && (
        <div className={s.modalPositionStyle} style={style}>
          <div className={s.modalButtonCantainer}>
            <p className={s.modalDate}> {selectedDay.format("D MMMM")}</p>
            <button onClick={handleClose}>
              <svg className={s.modalDateSvg}>
                <use href={`${sprite}#icon-outline`} />
              </svg>
            </button>
          </div>

          <p className={s.modalText}>
            Daily norma:{" "}
            <span className={s.modalNorma}>{dailyNorma / 1000} L</span>
          </p>
          <p className={s.modalText}>
            Fulfillment of the daily norm:{" "}
            <span className={s.modalNorma}>{percentDailyNorm}%</span>
          </p>
          <p className={s.modalText}>
            How many servings of water:{" "}
            <span className={s.modalNorma}>{consumptionCount}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default DaysGeneralStats;
