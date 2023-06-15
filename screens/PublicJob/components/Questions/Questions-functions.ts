export const formatTime = (seconds: number) => {
  const minutes = `${Math.floor(seconds / 60)}`.padStart(2, '0');

  const remainigSeconds = `${seconds % 60}`.padStart(2, '0');

  return `${minutes}:${remainigSeconds}`;
};
