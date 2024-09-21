import { useEffect, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

import { Post } from 'store/types/postType';
import { RootState } from 'store/reducers';
import { loadNewPostsRequest } from 'store/actions/postAction';

type UseScrollParams = {
  type: 'timeline-new';
  ref: RefObject<HTMLDivElement>;
};

type ScrollParams = {
  items: Post[];
  hasMore: boolean;
  loading: boolean;
  action: (lastId: number) => AnyAction;
  thresholds: number[];
};

const breakpoints = {
  web: 1200,
  tablet: 992,
  mobile: 576
};

const useScroll = ({ type, ref }: UseScrollParams) => {
  const dispatch = useDispatch();
  const { timelinePosts, hasMoreTimelinePosts, loadNewPostsLoading } = useSelector((state: RootState) => state.post);

  const getScrollParams = (type: string): ScrollParams => {
    switch (type) {
      case 'timeline-new':
        return {
          items: timelinePosts,
          hasMore: hasMoreTimelinePosts,
          loading: loadNewPostsLoading,
          action: loadNewPostsRequest,
          thresholds: [350, 900, 1700]
        };
      default:
        return {
          items: [],
          hasMore: false,
          loading: false,
          action: () => ({ type: 'UNKNOWN_ACTION' }),
          thresholds: [0, 0, 0]
        };
    }
  };

  const { items, hasMore, loading, action, thresholds } = getScrollParams(type);

  useEffect(() => {
    const handleScroll = () => {
      const lastId = items[items.length - 1]?.id;

      if (window.innerWidth >= breakpoints.web && ref.current) {
        const { scrollTop, clientHeight, scrollHeight } = ref.current;
        if (scrollTop + clientHeight > scrollHeight - thresholds[0]) {
          if (hasMore && !loading) {
            dispatch(action(lastId));
          }
        }
      } else if (window.innerWidth < breakpoints.web) {
        const threshold = window.innerWidth >= breakpoints.tablet ? thresholds[1] : thresholds[2];
        if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight - threshold) {
          if (hasMore && !loading) {
            dispatch(action(lastId));
          }
        }
      }
    };

    const currentRef = ref.current;

    if (window.innerWidth >= breakpoints.web && currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (window.innerWidth >= breakpoints.web && currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading, items, dispatch, action, ref, thresholds]);
};

export default useScroll;
