import moment from 'moment';

export const toDisplayedTime = (secs: number): string => {
  const duration = moment.duration(secs, 'seconds');
  return `${Math.floor(duration.asHours())}:${String(
    duration.minutes()
  ).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`;
};