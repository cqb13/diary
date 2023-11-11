export default function expandKey(key: string, length: number): string {
  let expandedKey = key;
  while (expandedKey.length < length) {
    expandedKey += key;
  }
  return expandedKey;
}
