const convertMonthToNumber = (date: string) => {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const dateArray = date.split(" ");
  const month = dateArray[0].toLowerCase();
  const monthNumber = months.indexOf(month) + 1;
  const day = dateArray[1].slice(0, -1);
  const year = dateArray[2];

  return `${monthNumber} ${day} ${year}`;
};

export default convertMonthToNumber;
