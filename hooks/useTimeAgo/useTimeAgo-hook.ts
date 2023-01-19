import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export const useTimeAgo = (date?: string) => {

  if (!date) {
    return null
  }

  return timeAgo.format(new Date(date))

}