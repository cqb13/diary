import convertMonthToNumber from "@utils/convertMonthsToNumbers";
import timestampToDate from "@utils/db/timestampToDate";

export default function convertTimestampToDate(timestamp: number) {
  let stringDate = timestampToDate(timestamp);
  let numberDate = convertMonthToNumber(stringDate);
  let dateArray = numberDate.split(" ");
  return {
    month: parseInt(dateArray[0]),
    day: parseInt(dateArray[1]),
    year: parseInt(dateArray[2]),
  };
}
