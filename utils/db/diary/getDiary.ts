import { collection, doc, getDocs } from "firebase/firestore";
import { db, auth } from "@lib/firebase";

export default async function getDiary(key: string) {
  const user = auth.currentUser;
  if (!user) return;
  const users = collection(db, "users");
  const userRef = doc(users, user.uid);
  const diaryRef = collection(userRef, "diaries");
  const diaryDocs = await getDocs(diaryRef);
  const diaryDocsData = diaryDocs.docs.map((doc) => doc.data());
  const diary = diaryDocsData.find((diary) => diary.key === key);
  return diary;
}
