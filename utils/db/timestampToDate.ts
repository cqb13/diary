export default function timestampToDate(timestamp: number) {
  const date = new Date(timestamp);

  const timeZoneOffset = date.getTimezoneOffset();

  date.setTime(timestamp + timeZoneOffset * 60 * 1000);

  const options: any = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return formattedDate;
}
