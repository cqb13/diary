import convertTimeStampToNumberDate from "@utils/db/convertTimestampToNumbers";
import { DiaryContent } from "@lib/types/diary"

export default function sortDiaryEntriesByDate(
  diaryEntries: DiaryContent[],
  reverse: boolean,
) {


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
}
