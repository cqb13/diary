import { DiaryContent } from "@/lib/types/diary";
import xorDecrypt from "@utils/xorDecrypt";

export default function decryptObject(
  encryptedEntry: DiaryContent,
  key: string,
): DiaryContent {
  const { content, description, title } = encryptedEntry;

  const decryptedContent = xorDecrypt(content, key);
  const decryptedDescription = xorDecrypt(description, key);
  const decryptedTitle = xorDecrypt(title, key);

  return {
    ...encryptedEntry,
    content: decryptedContent,
    description: decryptedDescription,
    title: decryptedTitle,
  };
}
