import { collection, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@lib/firebase";

export default async function deleteDiary(key: string) {
  const users = collection(db, "users");
  const user = doc(users, auth.currentUser?.uid);
  const diary = doc(user, "diaries", key);
  await deleteDoc(diary);
}
