import moment from 'moment';

export const calculateStartAndEndDate = (
  last: string
): { startDate: string; endDate: string } => {
  const daysMatch = last.match(/^(\d+)days$/);

  if (!daysMatch) {
    throw new Error(
      'Invalid last days parameter. Please provide a positive number (e.g., last=7days).'
    );
  }

  const days = parseInt(daysMatch[1], 10);
  if (days <= 0) {
    throw new Error(
      'Invalid last days parameter. Please provide a positive number.'
    );
  }

  const endDate = moment().endOf('day').toISOString();
  const startDate = moment()
    .subtract(days, 'days')
    .startOf('day')
    .toISOString();

  return { startDate, endDate };
};
