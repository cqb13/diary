"use client";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import createUserDoc from "@/utils/db/account/createUserDoc";
import Notification from "@/components/general/notification";
import { useAuthContext } from "@/lib/context/authContext";
import googleSignIn from "@/utils/firebase/googleSignIn";
import Button from "@/components/general/button";
import Input from "@/components/general/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginAttempts, setLoginAttempts] = useState(0);

  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 5000;

  useEffect(() => {
    if (user) {
      router.push("/account/diaries");
    }
  }, [user]);

  const signInWithGoogle = async () => {
    const user = await googleSignIn();

    if (user) {
      await createUserDoc(user);
      router.push("/account/diaries");
    } else {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Sign In failed");
    }
  };

  const signInWithEmail = async () => {
    if (loginAttempts > MAX_LOGIN_ATTEMPTS) {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage(`Too many failed login attempts.`);
      return;
    }

    signInWithEmailAndPassword(getAuth(), email, password)
      .then((data) => {
        router.push("/account/diaries");
      })
      .catch((error) => {
        let errMsg = "";
        switch (error.code) {
          case "auth/invalid-email":
            errMsg = "Invalid email";
            break;
          case "auth/user-not-found":
            errMsg = "No account with that email was found";
            break;
          case "auth/wrong-password":
            errMsg = "Incorrect password";
            break;
          default:
            errMsg = "Email or password was incorrect";
            break;
        }

        setLoginAttempts(loginAttempts + 1);
        setNotification(true);
        setNotificationTitle("Error");
        setNotificationType("error");
        setNotificationMessage(errMsg);
      });

    setTimeout(() => {
      setLoginAttempts(0);
    }, LOCKOUT_DURATION);
  };

  return (
    <>
      <h1 className="mb-5 text-center font-serif text-5xl text-primary">
        Sign In
      </h1>
      <main className="flex flex-col gap-5">
        <Input
          value={email}
          placeholder="Email"
          type="email"
          vModel="email"
          updateValue={setEmail}
        />
        <Input
          value={password}
          placeholder="Password"
          type="password"
          vModel="password"
          updateValue={setPassword}
        />
        <div className="flex justify-center gap-2">
          <Button title="Sign In" onClick={signInWithEmail} />
          <Button title="Sign In With Google" onClick={signInWithGoogle} />
        </div>
      </main>
      {notification ? (
        <Notification
          title={notificationTitle}
          type={notificationType}
          message={notificationMessage}
          timeout={5000}
          updateNotification={(value) => setNotification(value)}
        />
      ) : null}
    </>
  );
}
