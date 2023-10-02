import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, auth } from "@lib/firebase";

export default async function updateDiaryOrder(key: string, value: boolean) {
  const user = auth.currentUser;
  if (!user) return;
  const users = collection(db, "users");
  const userRef = doc(users, user.uid);
  const diaryRef = collection(userRef, "diaries");
  const diaryDocs = await getDocs(diaryRef);
  const diaryDocsData = diaryDocs.docs.map((doc) => doc.data());
  const diary = diaryDocsData.find((diary) => diary.key === key);
  const diaryDoc = doc(diaryRef, diary?.key);
  await updateDoc(diaryDoc, {
    entryOrderReversed: value,
    updatedAt: new Date(),
  });
}
