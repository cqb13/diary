import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "@lib/firebase";

export default async function saveMainDiaryChanges(
  key: string,
  name: string,
  description: string,
) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(collection(db, "users"), user.uid);
  const diaryRef = collection(userRef, "diaries");

  const diaryDoc = doc(diaryRef, key);
  const diary = await getDoc(diaryDoc);

  if (diary.exists()) {
    await updateDoc(diaryDoc, {
      name,
      description,
      updatedAt: new Date(),
    });
  }
}
