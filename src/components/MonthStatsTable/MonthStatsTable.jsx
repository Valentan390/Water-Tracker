// import s from './MonthStatsTable.module.css'

import { useState } from "react";
import moment from "moment";

const MonthStatsTable = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment());

  const monthWaterUser = [
    {
      date: "2024-02-06T00:00:00.000Z",
      dailyNorm: "4500",
      percentDailyNorm: 51,
      consumptionCount: 8,
    },
    {
      date: "2024-02-07T00:00:00.000Z",
      dailyNorm: "4500",
      percentDailyNorm: 79,
      consumptionCount: 11,
    },
  ];

  const handlePrevMonth = () => {
    setSelectedMonth(selectedMonth.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setSelectedMonth(selectedMonth.clone().add(1, "month"));
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

      const matchedObject = monthWaterUser.find((item) => {
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
    <div>
      <div>
        <button onClick={handlePrevMonth}>Previous Month</button>
        <span>{selectedMonth.format("MMMM YYYY")}</span>
        <button
          onClick={handleNextMonth}
          disabled={selectedMonth.isSame(moment(), "month")}
        >
          Next Month
        </button>
      </div>
      <div>
        {generateDataArray(selectedMonth).map(({ date }) => (
          <div key={date}>{date}</div>
        ))}
      </div>
    </div>
  );
};

export default MonthStatsTable;
