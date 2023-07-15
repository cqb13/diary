import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../main";

const getDiaries = async (user: any) => {
  const usersRef = collection(db, "users");
  const userDocRef = doc(usersRef, user.uid);
  const diariesRef = collection(userDocRef, "diaries");
  const diarySnapshot = await getDocs(diariesRef);
  const diaryList: any = [];
  diarySnapshot.forEach((doc) => {
    diaryList.push(doc.data());
  });
  return diaryList;
};

export default getDiaries;
