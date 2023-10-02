import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";

export default async function createUserDoc(user: any) {
  const users = collection(db, "users");
  const userRef = doc(users, user.uid);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
    });
  }
}
