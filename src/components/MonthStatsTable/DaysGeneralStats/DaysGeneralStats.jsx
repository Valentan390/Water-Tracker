import s from "./DaysGeneralStats.module.css";
import sprite from "../../../images/svg/sprite.svg";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

const DaysGeneralStats = ({
  selectedDay,
  showModal,
  handleClose,
  dailyNorma,
  percentDailyNorm,
  consumptionCount,
  style,
}) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        handleClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, handleClose]);

  return (
    <>
      {selectedDay && showModal && (
        <div
          ref={modalRef}
          className={s.modalPositionStyle}
          style={isLargeScreen ? style : {}}
        >
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
