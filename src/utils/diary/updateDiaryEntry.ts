import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../../main";

interface EntriesList {
  title: string;
  description: string;
  date: number;
  lastUpdated: number;
  content: string;
  id: string;
}

const updateDiaryEntry = async (key: string, entriesList: EntriesList[]) => {
  const user = auth.currentUser;
  if (!user) return;
  const diaryRef = doc(db, "users", user.uid, "diaries", key);
  await setDoc(diaryRef, { diaryContent: entriesList }, { merge: true });
};

export default updateDiaryEntry;
