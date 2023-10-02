import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "@lib/firebase";

type EntriesList = {
  title: string;
  description: string;
  date: number;
  lastUpdated: number;
  content: string;
  id: string;
};

export default async function updateDiaryEntry(
  key: string,
  entriesList: EntriesList[],
) {
  const user = auth.currentUser;
  if (!user) return;
  const diaryRef = doc(db, "users", user.uid, "diaries", key);
  await setDoc(diaryRef, { diaryContent: entriesList }, { merge: true });
}
