export default function converUnixTimestampToDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
