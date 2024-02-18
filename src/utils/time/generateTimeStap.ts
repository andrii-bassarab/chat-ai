export const generateTimestamp = () => {
  const localDate = new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const [day, date, ...restDate] = localDate.split(" ");

  return (`${date.replace(",", "")} ${day} ${restDate.join(" ").toLocaleLowerCase()}`)
};
