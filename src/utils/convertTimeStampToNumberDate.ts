import convertMonthToNumber from "./convertMonthsToNumber";
import timestampToDate from "./db/timestampToDate";

const convertTimeStampToNumberDate = (timestamp: number) => {
  let stringDate = timestampToDate(timestamp);
  let numberDate = convertMonthToNumber(stringDate);
  let dateArray = numberDate.split(" ");
  return {
    month: parseInt(dateArray[0]),
    day: parseInt(dateArray[1]),
    year: parseInt(dateArray[2]),
  };
};

export default convertTimeStampToNumberDate;
