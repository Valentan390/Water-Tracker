import s from "./MonthStatsPaginator.module.css";
import sprite from "../../../images/svg/sprite.svg";
import moment from "moment";

const MonthStatsPaginator = ({
  handlePrevMonth,
  handleNextMonth,
  selectedMonth,
}) => {
  const isCurrentMonth = selectedMonth.isSame(moment(), "month");
  return (
    <>
      <div className={s.monthStatsPaginatorCantainer}>
        <p className={s.monthStatsPaginatorTitle}>Month</p>
        <div className={s.monthStatsPaginatorCantainerButton}>
          <button className={s.monthStatsPaginatorButton} type="button" onClick={handlePrevMonth}>
            <svg className={s.monthStatsPaginatorButtonSvg}>
              <use href={`${sprite}#icon-solid-1`} />
            </svg>
          </button>
          <span className={s.monthStatsPaginatorSpan}>
            {selectedMonth.format("MMMM YYYY")}
          </span>
          <button className={`${s.monthStatsPaginatorButton} ${isCurrentMonth ? s.buttonCurrentMonth : ''}` }
            type="button"
            onClick={handleNextMonth}
            disabled={isCurrentMonth}
            
          >
            <svg className={isCurrentMonth ? s.hiddenSvg : s.monthStatsPaginatorButtonSvg}>
              <use href={`${sprite}#icon-solid-2`} />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default MonthStatsPaginator;
