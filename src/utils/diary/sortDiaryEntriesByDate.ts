import convertTimeStampToNumberDate from "../convertTimeStampToNumberDate";

type DiaryEntry = {
  content: string;
  date: number;
  description: string;
  id: string;
  lastUpdatedAt: any;
  title: string;
};

const sortDiaryEntriesByDate = (
  diaryEntries: DiaryEntry[],
  reverse: boolean,
) => {
  const sortedDiaryEntries = diaryEntries.sort((a, b) => {
    const aDate = convertTimeStampToNumberDate(a.date);
    const bDate = convertTimeStampToNumberDate(b.date);

    if (aDate.year < bDate.year) {
      return -1;
    } else if (aDate.year > bDate.year) {
      return 1;
    } else {
      if (aDate.month < bDate.month) {
        return -1;
      } else if (aDate.month > bDate.month) {
        return 1;
      } else {
        if (aDate.day < bDate.day) {
          return -1;
        } else if (aDate.day > bDate.day) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  });

  if (reverse) {
    return sortedDiaryEntries.reverse();
  } else {
    return sortedDiaryEntries;
  }
};

export default sortDiaryEntriesByDate;
