type Diary = {
  createdAt: any;
  description: string;
  diaryContent: string;
  key: string;
  locked: boolean;
  name: string;
  password: string;
  updatedAt: any;
};

type DiaryContent = {
  content: string;
  date: number;
  description: string;
  id: string;
  lastUpdated: any;
  title: string;
};

export type { Diary, DiaryContent };
