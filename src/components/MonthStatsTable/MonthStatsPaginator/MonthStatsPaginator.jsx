import s from "./MonthStatsPaginator.module.css";
import sprite from "../../../images/svg/sprite.svg";
import moment from "moment";

const MonthStatsPaginator = ({
  handlePrevMonth,
  handleNextMonth,
  selectedMonth,
}) => {
  return (
    <div>
      <div className={s.monthStatsPaginatorCantainer}>
        <p className={s.monthStatsPaginatorTitle}>Month</p>
        <div className={s.monthStatsPaginatorCantainerButton}>
          <button type="button" onClick={handlePrevMonth}>
            <svg className={s.monthStatsPaginatorButtonSvg}>
              <use href={`${sprite}#icon-solid-1`} />
            </svg>
          </button>
          <span className={s.monthStatsPaginatorSpan}>
            {selectedMonth.format("MMMM YYYY")}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            disabled={selectedMonth.isSame(moment(), "month")}
          >
            <svg className={s.monthStatsPaginatorButtonSvg}>
              <use href={`${sprite}#icon-solid-2`} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthStatsPaginator;
