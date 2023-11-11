"use client";

import Notification from "@/components/general/notification";
import { useDiaryContext } from "@/lib/context/diaryContext";
import { useAuthContext } from "@/lib/context/authContext";
import createDiary from "@/utils/db/diary/createDiary";
import Checkbox from "@/components/general/checkbox";
import Button from "@/components/general/button";
import Input from "@/components/general/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewDiary() {
  const router = useRouter();
  const { user } = useAuthContext() as { user: any };
  const { setCurrentDiaryId } = useDiaryContext() as {
    setCurrentDiaryId: (newDiaryId: string | null) => void;
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleDiaryCreation = async () => {
    let usedName = name.trim();
    if (usedName === "new") {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("You cannot create a diary with the name 'new'.");
      return;
    }

    if (usedName === "") {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Please enter a name for your diary.");
      return;
    }

    if (locked && password === "") {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Please enter a password for your diary.");
      return;
    }

    if (locked && confirmPassword === "") {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Please confirm your password.");
      return;
    }

    if (locked && password !== confirmPassword) {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Passwords do not match.");
      return;
    }

    const details = await createDiary(usedName, description, password, locked);
    if (details?.key && details?.id) {
      setCurrentDiaryId(details.id);
      router.push(`/account/diaries/${details.key}`);
      return;
    } else {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Diary could not be created.");
      return;
    }
  };

  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user]);

  return (
    <>
      <h1 className="mb-5 text-center font-serif text-5xl text-primary">
        Create Diary
      </h1>
      <main className="flex flex-col gap-5">
        <Input
          type="text"
          placeholder="Diary Name"
          value={name}
          updateValue={setName}
        />
        <Input
          type="text"
          placeholder="Diary Description"
          value={description}
          updateValue={setDescription}
        />
        <Checkbox label="Locked" checked={locked} updateChecked={setLocked} />
        {locked && (
          <>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              updateValue={setPassword}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              updateValue={setConfirmPassword}
            />
          </>
        )}
        <div className="flex justify-center gap-2">
          <Button title="Create Diary" onClick={handleDiaryCreation} />
          <Button
            title="Cancel"
            onClick={() => router.push("/account/diaries")}
          />
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
