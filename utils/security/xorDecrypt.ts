import generateRandomSalt from "./generateRandomSalt";
import expandKey from "./expandKey";

export default function xorDecrypt(encryptedText: string, key: string): string {
  const expandedKey = expandKey(key, encryptedText.length);

  let decrypted = "";
  for (let i = 0; i < encryptedText.length; i++) {
    const charCode = encryptedText.charCodeAt(i) ^ expandedKey.charCodeAt(i);
    decrypted += String.fromCharCode(charCode);
  }

  const saltLength = generateRandomSalt().length;
  return decrypted.slice(saltLength);
}
