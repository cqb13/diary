import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(getAuth(), provider);
  const user = result.user;
  return user;
}
