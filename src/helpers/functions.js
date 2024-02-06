export const formatDate = (date) => {
  const inputDate = new Date(date.$d);
  const formattedDate = `${inputDate.getUTCFullYear()}-${padZero(
    inputDate.getUTCMonth() + 1
  )}-${padZero(inputDate.getUTCDate())}T${padZero(
    inputDate.getUTCHours()
  )}:${padZero(inputDate.getUTCMinutes())}:${padZero(
    inputDate.getUTCSeconds()
  )}.${padMilliseconds(inputDate.getUTCMilliseconds())}Z`;

  function padZero(value) {
    return String(value).padStart(2, "0");
  }

  function padMilliseconds(value) {
    return String(value).padStart(3, "0");
  }

  return formattedDate;
};
