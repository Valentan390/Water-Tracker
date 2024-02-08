import s from "./MonthStatsTable.module.css";

import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { waterMonthUser } from "../../redux/waterUser/operations";
import { useWaters } from "../../hooks/userWaters";
import DaysGeneralStats from "./DaysGeneralStats/DaysGeneralStats";
import MonthStatsPaginator from "./MonthStatsPaginator/MonthStatsPaginator";
import useGenerateDataArray from "../../hooks/useGenerateDataArray";
import useModalHandlers from "../../hooks/useModalHandlers";
import { getCustomPositionStyle } from "../../helpers/functions.js";

const MonthStatsTable = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const dispatch = useDispatch();
  const { monthWater } = useWaters();

  useEffect(() => {
    const currentYear = moment().year();
    const currentMonth = moment().format("MM");
    dispatch(
      waterMonthUser({
        year: currentYear,
        month: currentMonth,
      })
    );
  }, [dispatch]);

  const handlePrevMonth = () => {
    setSelectedMonth(selectedMonth.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setSelectedMonth(selectedMonth.clone().add(1, "month"));
  };

  const { selectedDay, showModal, handleDayClick, handleModalClose } =
    useModalHandlers(selectedMonth);

  const dataArray = useGenerateDataArray(selectedMonth, monthWater);

  return (
    <div className={s.monthStatsPaginatorWrapper}>
      <MonthStatsPaginator
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        selectedMonth={selectedMonth}
      />

      <ul className={s.monthStatsList}>
        {dataArray.map(
          ({ date, dailyNorma, percentDailyNorm, consumptionCount }) => (
            <li className={s.monthStatsItem} key={date}>
              <button
                className={s.monthStatsItemButton}
                type="button"
                onClick={() => handleDayClick(date)}
              >
                {moment(date).date()}
              </button>
              <p className={s.monthStatsItemPercent}>{percentDailyNorm}%</p>

              <DaysGeneralStats
                style={getCustomPositionStyle(date)}
                selectedDay={selectedDay === date ? moment(date) : null}
                showModal={showModal}
                handleClose={handleModalClose}
                dailyNorma={dailyNorma}
                percentDailyNorm={percentDailyNorm}
                consumptionCount={consumptionCount}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
