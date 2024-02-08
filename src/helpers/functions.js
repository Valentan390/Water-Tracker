import moment from "moment";

export const formatDate = (date) => {
  const inputDate = new Date(date.$d);
  const formattedDate = `${inputDate.getFullYear()}-${padZero(
    inputDate.getMonth() + 1
  )}-${padZero(inputDate.getDate())}T${padZero(inputDate.getHours())}:${padZero(
    inputDate.getMinutes()
  )}:${padZero(inputDate.getSeconds())}.${padMilliseconds(
    inputDate.getMilliseconds()
  )}Z`;

  function padZero(value) {
    return String(value).padStart(2, "0");
  }

  function padMilliseconds(value) {
    return String(value).padStart(3, "0");
  }

  return formattedDate;
};

export const getCustomPositionStyle = (date) => {
  const dayOfMonth = moment(date).date();
  const theLeftDays = [
    1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31,
  ];
  const onRightDays = [6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30];

  if (theLeftDays.includes(dayOfMonth)) {
    return {
      top: "-196px",
      right: "-270px",
    };
  } else if (onRightDays.includes(dayOfMonth)) {
    return {
      top: "-196px",
      right: "18px",
    };
  }

  return {};
};
