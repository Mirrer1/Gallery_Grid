import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (date: string): string => {
  const now = dayjs();
  const postDate = dayjs(date);
  const diffHours = now.diff(postDate, 'hour');
  const diffMinutes = now.diff(postDate, 'minute');

  if (diffHours < 24) {
    return diffMinutes < 60 ? postDate.fromNow() : postDate.fromNow(true);
  } else {
    return postDate.format('YYYY-MM-DD');
  }
};
