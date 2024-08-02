import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';

import { Post } from 'store/types/postType';

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

const useListTimes = (list: Post[]) => {
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    const times = list.map((item: Post) => formatDate(item.createdAt));
    setTimes(times);
  }, [list]);

  return times;
};

export default useListTimes;
