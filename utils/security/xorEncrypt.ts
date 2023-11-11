import generateRandomSalt from "./generateRandomSalt";
import expandKey from "./expandKey";

export default function xorEncrypt(text: string, key: string): string {
  const salt = generateRandomSalt();
  const saltedText = salt + text;

  const expandedKey = expandKey(key, saltedText.length);

  let encrypted = "";
  for (let i = 0; i < saltedText.length; i++) {
    const charCode = saltedText.charCodeAt(i) ^ expandedKey.charCodeAt(i);
    encrypted += String.fromCharCode(charCode);
  }
  return encrypted;
}
