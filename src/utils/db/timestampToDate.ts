const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const options: any = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return formattedDate;
};

export default timestampToDate;
