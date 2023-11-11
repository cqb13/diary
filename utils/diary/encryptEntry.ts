import { DiaryContent } from "@/lib/types/diary";
import xorEncrypt from "@/utils/security/xorEncrypt";

export default function encryptObject(
  entry: DiaryContent,
  key: string,
) {
  const { content, description, title } = entry;

  const encryptedContent = xorEncrypt(content, key);
  const encryptedDescription = xorEncrypt(description, key);
  const encryptedTitle = xorEncrypt(title, key);

  return {
    ...entry,
    content: encryptedContent,
    description: encryptedDescription,
    title: encryptedTitle,
  };
}
