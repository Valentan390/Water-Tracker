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
