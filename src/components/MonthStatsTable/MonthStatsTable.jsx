import s from "./MonthStatsTable.module.css";

import { useEffect, useState } from "react";
import moment from "moment";
import sprite from "../../images/svg/sprite.svg";
import { useDispatch } from "react-redux";
import { waterMonthUser } from "../../redux/waterUser/operations";
import { useWaters } from "../../hooks/userWaters";

const MonthStatsTable = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const dispatch = useDispatch();
  const { monthWater } = useWaters();
  console.log(monthWater);

  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //   const monthWaterUser = [
  //     {
  //       date: "2024-02-06T00:00:00.000Z",
  //       dailyNorm: "4500",
  //       percentDailyNorm: 51,
  //       consumptionCount: 8,
  //     },
  //     {
  //       date: "2024-02-07T00:00:00.000Z",
  //       dailyNorm: "4500",
  //       percentDailyNorm: 79,
  //       consumptionCount: 11,
  //     },
  //   ];

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

  const handleDayClick = (day) => {
    if (selectedDay === day) {
      setShowModal(!showModal);
    } else {
      setSelectedDay(day);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedDay(null);
  };

  const modalPositionStyle = {
    position: "absolute",
    width: "maxContent",

    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
  };

  const generateDataArray = (selectedMonth) => {
    const daysInMonth = selectedMonth.daysInMonth();
    const dataArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = selectedMonth.clone().date(i).toISOString();
      const dataObject = {
        date: date,
        dailyNorma: 0,
        percentDailyNorm: 0,
        consumptionCount: 0,
      };

      const matchedObject = monthWater?.find((item) => {
        return moment(item.date).isSame(date, "day");
      });

      if (matchedObject) {
        dataObject.dailyNorma = matchedObject.dailyNorm;
        dataObject.percentDailyNorm = matchedObject.percentDailyNorm;
        dataObject.consumptionCount = matchedObject.consumptionCount;
      }

      dataArray.push(dataObject);
    }

    console.log(dataArray);

    return dataArray;
  };

  return (
    <div className={s.monthStatsPaginatorWrapper}>
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

      <ul className={s.monthStatsList}>
        {generateDataArray(selectedMonth).map(
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

              <div>
                {selectedDay === date && showModal && (
                  <div style={modalPositionStyle}>
                    <p>Selected Date: {moment(date).format("Do MMMM")}</p>
                    <p>Daily Norm: {dailyNorma} L</p>
                    <p>Completion of daily norm: {percentDailyNorm}%</p>
                    <p>Number of water portions: {consumptionCount}</p>
                    <button onClick={handleModalClose}>Close</button>
                  </div>
                )}
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
