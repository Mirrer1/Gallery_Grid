import React from 'react';
import { useSelector } from 'react-redux';
import { CheckSquareOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import AlertItem from './AlertItem';
import { RootState } from 'store/reducers';
import { UserHistoryPost } from 'store/types/postType';
import { slideInFromBottom, slideInList } from 'styles/Common/animation';
import { AlertBtn, AlertDivider, AlertWrapper } from 'styles/Activity/alert';

const AlertList = () => {
  const { myActivityPosts } = useSelector((state: RootState) => state.post);

  const groupByDate = (activities: UserHistoryPost[]) => {
    const groupedActivities: { [date: string]: UserHistoryPost[] } = {};

    activities.forEach(activity => {
      const date = dayjs(activity.createdAt).format('YYYY-MM-DD');
      if (!groupedActivities[date]) {
        groupedActivities[date] = [];
      }
      groupedActivities[date].push(activity);
    });

    return groupedActivities;
  };

  const groupedActivities = groupByDate(myActivityPosts);

  return (
    <>
      <AlertBtn {...slideInFromBottom(0.3)} $selectAll={true}>
        <button>
          <CheckSquareOutlined />
          <p>모두 읽음</p>
        </button>
      </AlertBtn>

      <AlertWrapper {...slideInFromBottom(0.3)}>
        {Object.keys(groupedActivities).map(date => {
          return (
            <div key={date}>
              <AlertDivider {...slideInList}>{date === dayjs().format('YYYY-MM-DD') ? 'Today' : date}</AlertDivider>

              {groupedActivities[date].map((history: UserHistoryPost) => (
                <AlertItem key={history.id} history={history} />
              ))}
            </div>
          );
        })}
      </AlertWrapper>
    </>
  );
};

export default AlertList;
