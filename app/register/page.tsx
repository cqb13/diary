"use client";

import createUserDoc from "@/utils/db/account/createUserDoc";
import Notification from "@/components/general/notification";
import { useAuthContext } from "@/lib/context/authContext";
import googleSignIn from "@/utils/firebase/googleSignIn";
import emailSignIn from "@/utils/firebase/emailSignIn";
import Button from "@/components/general/button";
import Input from "@/components/general/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  const signUpWithGoogle = async () => {
    try {
      await googleSignIn();
      await createUserDoc(user);
      router.push("/account/diaries");
    } catch (err: any) {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage(err.message);
    }
  };

  const signUpWithEmail = async () => {
    if (email === "" || password === "" || passwordConfirm === "") {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Please fill in all fields");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Please enter a valid email");
      return;
    }

    if (password !== passwordConfirm) {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Passwords do not match");
      return;
    }

    const result = await emailSignIn(email, password);
    if (result[0] === "success") {
      await createUserDoc(result[1]);
      router.push("/account/diaries");
    } else {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage(result[1]);
    }
  };

  return (
    <>
      <h1 className="mb-5 text-center font-serif text-5xl text-primary">
        Create an Account
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
        <Input
          value={passwordConfirm}
          placeholder="Confirm Password"
          type="password"
          vModel="password"
          updateValue={setPasswordConfirm}
        />
        <div className="flex justify-center gap-2 max-xs:flex-col">
          <Button title="Sign Up" onClick={signUpWithEmail} />
          <Button title="Sign Up With Google" onClick={signUpWithGoogle} />
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
