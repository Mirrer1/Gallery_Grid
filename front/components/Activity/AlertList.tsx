import React, { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckSquareOutlined, CloseSquareTwoTone } from '@ant-design/icons';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import AlertItem from './AlertItem';
import useScroll from 'utils/useScroll';
import { RootState } from 'store/reducers';
import { UserHistoryPost } from 'store/types/postType';
import { readActivityRequest } from 'store/actions/postAction';
import { slideInFromBottom, slideInList } from 'styles/Common/animation';
import { AlertBtn, AlertDivider, AlertWrapper, NoAlertsContainer } from 'styles/Activity/alert';

const AlertList = () => {
  const dispatch = useDispatch();
  const activityPostsRef = useRef<HTMLDivElement>(null);
  const { myActivityPosts } = useSelector((state: RootState) => state.post);
  useScroll({ type: 'activity', ref: activityPostsRef });

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

  const onReadAllActivities = useCallback(() => {
    if (myActivityPosts.length > 0) dispatch(readActivityRequest('all'));
    else toast.warning('활동 내역이 존재하지 않습니다.');
  }, []);

  return (
    <>
      <AlertBtn {...slideInFromBottom(0.3)} $selectAll={true}>
        <button type="button" onClick={onReadAllActivities}>
          <CheckSquareOutlined />
          <p>모두 읽음</p>
        </button>
      </AlertBtn>

      <AlertWrapper ref={activityPostsRef} {...slideInFromBottom(0.3)}>
        {myActivityPosts.length === 0 ? (
          <NoAlertsContainer>
            <CloseSquareTwoTone twoToneColor="#6BA2E6" />
            <h1>No Activities yet.</h1>
            <p>활동 내역이 없습니다.</p>
          </NoAlertsContainer>
        ) : (
          Object.keys(groupedActivities).map(date => (
            <div key={date}>
              <AlertDivider {...slideInList}>{date === dayjs().format('YYYY-MM-DD') ? 'Today' : date}</AlertDivider>
              {groupedActivities[date].map((history: UserHistoryPost) => (
                <AlertItem key={history.id} history={history} />
              ))}
            </div>
          ))
        )}
      </AlertWrapper>
    </>
  );
};

export default AlertList;
