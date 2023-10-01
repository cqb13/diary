import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../../main";

const createDiaryInDb = async (
  name: string,
  description: string,
  password: string,
  locked: boolean,
) => {
  const user = auth.currentUser;
  if (!user) return;
  const users = collection(db, "users");
  const userRef = doc(users, user.uid);
  const diaryRef = collection(userRef, "diaries");
  const randomId = Math.random().toString(32).substring(2);
  const diaryDoc = doc(diaryRef, name + randomId);
  const diaryDocRef = await getDoc(diaryDoc);
  if (!diaryDocRef.exists()) {
    await setDoc(diaryDoc, {
      name: name,
      description: description,
      password: password,
      locked: locked,
      key: name + randomId,
      createdAt: new Date(),
      updatedAt: new Date(),
      diaryContent: [],
    });
  }
  return name + randomId;
};

export default createDiaryInDb;
