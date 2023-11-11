import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@lib/firebase";

export default async function getDiary(key: string) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(collection(db, "users"), user.uid);
  const diaryRef = collection(userRef, "diaries");
  const diaryDoc = doc(diaryRef, key);

  const diarySnapshot = await getDoc(diaryDoc);
  const diary = diarySnapshot.data();

  return diary;
}
