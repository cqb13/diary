export default function generateRandomSalt(): string {
  const saltLength = 16;
  let salt = "";
  for (let i = 0; i < saltLength; i++) {
    salt += String.fromCharCode(Math.floor(Math.random() * 256));
  }
  return salt;
}
