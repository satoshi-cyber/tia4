import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

const timeAgoEng = new TimeAgo('en-US');

export const timeAgo = (date: string | Date) =>
  date && timeAgoEng.format(new Date(date));
