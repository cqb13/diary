export default function dateConverter(date: any) {
  const timestamp = date.toDate();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const pureDate = timestamp.toLocaleDateString(undefined, options);
  return pureDate;
}
