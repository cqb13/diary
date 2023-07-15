import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const signInWithEmail = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    return ["success", user];
  } catch (error: any) {
    return ["error", error.message];
  }
};

export default signInWithEmail;
