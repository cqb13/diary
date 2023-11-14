"use client";

import ConfirmationModal from "@/components/general/confirmationModal";
import { useAuthContext } from "@/lib/context/authContext";
import { useDiaryContext } from "@/lib/context/diaryContext";
import DiaryBlock from "@/components/diary/diaryBlock";
import getDiaries from "@/utils/db/diary/getDiaries";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Diaries() {
  const router = useRouter();
  const { user } = useAuthContext() as { user: any };
  const { setCurrentDiaryId } = useDiaryContext() as {
    setCurrentDiaryId: (newDiaryId: string | null) => void;
  };

  const [diaries, setDiaries] = useState([] as any[]);

  const [diaryKey, setDiaryKey] = useState("");
  const [password, setPassword] = useState("");

  const [modal, setModal] = useState(false);

  const unlock = (diaryKey: string, diaryId: string, password: string) => {
    setDiaryKey(diaryKey);
    setCurrentDiaryId(diaryId);
    setPassword(password);
    setModal(true);
  };

  const openDiary = (diaryKey: string, diaryId: string) => {
    setCurrentDiaryId(diaryId);
    router.push(`/account/diaries/${diaryKey}`);
  };

  useEffect(() => {
    if (user) {
      getDiaries(user).then((data) => {
        setDiaries(data);
      });
    }
  }, []);

  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user]);

  return (
    <>
      <h1 className="mb-5 text-center font-serif text-5xl text-primary">
        Diaries
      </h1>
      <main className="flex flex-wrap justify-center gap-5">
        {diaries.map((diary) => (
          <DiaryBlock
            title={diary.name}
            description={diary.description}
            diaryKey={diary.key}
            diaryId={diary.id}
            locked={diary.locked}
            password={diary.password}
            unlock={unlock}
            openDiary={openDiary}
            key={diary.key}
          />
        ))}
        <button
          className="flex h-52 w-52 flex-col items-center justify-center rounded-3xl bg-light-background p-5 transition-all hover:outline hover:outline-1 hover:outline-primary max-xs:w-full"
          onClick={() => router.push("/account/diaries/new")}
        >
          <h2 className="pb-2 text-center font-serif text-xl tracking-wider text-primary">
            New Diary
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-primary transition-all"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </main>
      {modal ? (
        <ConfirmationModal
          title="Unlock Diary"
          message="Enter the password to unlock this diary"
          inputVisible={true}
          inputIsPassword={true}
          expectedInput={password}
          confirmText="Unlock"
          cancelText="Cancel"
          confirmAction={() => router.push(`/account/diaries/${diaryKey}`)}
          cancelAction={() => setModal(false)}
        />
      ) : null}
    </>
  );
}
