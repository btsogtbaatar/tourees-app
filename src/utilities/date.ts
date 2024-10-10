import moment from "moment";

export const getToday = () => {
  return new Date(Date.now());
};
export const getTomorrow = () => {
  const date = new Date(Date.now());
  date.setDate(date.getDate() + 1);
  return date;
};
export const isEqualDate = (a: Date, b: Date) => {
  if (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  ) {
    return true;
  }
  return false;
};
export const isTodayActive = (givenDate: Date) => {
  const today = getToday();
  return isEqualDate(today, givenDate);
};
export const isTomorrowActive = (givenDate: Date) => {
  const tomorrow = getTomorrow();
  return isEqualDate(tomorrow, givenDate);
};
export const isSelectedDate = (currentDate: Date) => {
  if (isTodayActive(currentDate) || isTomorrowActive(currentDate)) {
    return false;
  }
  return true;
};


export const formatDate = (value: Date) => {
  return moment(value).format('ddd D MMM');
};

export const formatTime = (value: Date) => {
  return moment(value).format('HH:mm');
};