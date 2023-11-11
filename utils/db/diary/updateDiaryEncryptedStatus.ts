import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "@lib/firebase";

export default async function updateDiaryEncryptionStatus(
  key: string,
  value: boolean,
) {
  const user = auth.currentUser;
  if (!user) return;
  const userRef = doc(collection(db, "users"), user.uid);
  const diaryRef = collection(userRef, "diaries");
  const diary = await getDoc(doc(diaryRef, key));
  if (diary) {
    await updateDoc(doc(diaryRef, key), {
      encrypted: value,
      updatedAt: new Date(),
    });
  }
}
