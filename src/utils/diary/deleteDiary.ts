import { collection, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../main";

const deleteDiary = async (key: string) => {
  const users = collection(db, "users");
  const user = doc(users, auth.currentUser?.uid);
  const diary = doc(user, "diaries", key);
  await deleteDoc(diary);
};

export default deleteDiary;
