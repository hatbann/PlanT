/** @format */

export const getDate2digit = (date: Date) => {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? `0${String(date.getMonth() + 1)}`
      : `${String(date.getMonth() + 1)}`;
  const day =
    date.getDate() < 10
      ? `0${String(date.getDate())}`
      : `${String(date.getDate())}`;

  return { year, month, day };
};
