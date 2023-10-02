type props = {
  title: string;
  description: string;
  diaryKey: string;
  locked: boolean;
  password: string;
  unlock: (diaryKey: string, password: string) => void;
  openDiary: (diaryKey: string) => void;
};

export default function DiaryBlock({
  title,
  description,
  diaryKey,
  locked,
  password,
  unlock,
  openDiary,
}: props) {
  const handleSelectedDiary = () => {
    if (locked) {
      unlock(diaryKey, password);
    } else {
      openDiary(diaryKey);
    }
  };

  return (
    <button
      className="h-52 w-52 rounded-3xl bg-light-background p-5 transition-all hover:outline hover:outline-1 hover:outline-primary max-xs:w-full"
      key={diaryKey}
      onClick={handleSelectedDiary}
    >
      <h2 className="pb-2 text-center font-serif text-xl tracking-wider text-primary">
        {title}
      </h2>
      <p>{description}</p>
    </button>
  );
}
