export default function xorDecrypt(encryptedText: string, key: string): string {
  let decrypted = "";
  for (let i = 0; i < encryptedText.length; i++) {
    const charCode =
      encryptedText.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    decrypted += String.fromCharCode(charCode);
  }
  return decrypted;
}
