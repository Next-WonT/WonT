export const getDDay = (day: Date) => {
  let today = new Date().getTime();
  let dday = new Date(day).getTime();
  let gap = dday - today;
  let result = Math.floor(gap / (1000 * 60 * 60 * 24));

  if (result <= 0) {
    result = -result;
    const tripday = `D+${result}`;
    return tripday;
  }

  const tripday = `D-${result}`;
  return tripday;
};
