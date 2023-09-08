export const toHours = (time: number): number => {
  return Math.floor(time / 3600);
};

export const toMinutes = (time: number): number => {
  return Math.floor(time / 60) % 60;
};

export const toSeconds = (time: number): number => {
  return time % 60;
};
