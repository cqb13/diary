export default function xorEncrypt(text: string, key: string): string {
  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    encrypted += String.fromCharCode(charCode);
  }
  return encrypted;
}
