import { format } from 'date-fns';

const formatDatetime = (value: string, formatDate?: string): string | Date => {
  const datetime = value.split(' ');
  const date = datetime[0].split('-');
  let newDate;
  if (datetime[1]) {
    const time = datetime[1].split(':');
    newDate = new Date(
      Number(date[0]),
      Number(date[1]) - 1,
      Number(date[2]),
      Number(time[0]),
      Number(time[1]),
      Number(time[2]),
    );
  } else {
    newDate = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
  }

  return formatDate ? format(newDate, formatDate) : newDate;
};

export default formatDatetime;
