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
  useRefForAllScreens: boolean;
};

const breakpoints = {
  web: 1200,
  tablet: 992,
  mobile: 576
};

const useScroll = ({ type, ref }: UseScrollParams) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadNewPostsLoading } = useSelector((state: RootState) => state.post);

  const getScrollParams = (type: string): ScrollParams => {
    switch (type) {
      case 'timeline-new':
        return {
          items: mainPosts,
          hasMore: hasMorePosts,
          loading: loadNewPostsLoading,
          action: loadNewPostsRequest,
          thresholds: [350, 900, 1700],
          useRefForAllScreens: false
        };
      default:
        return {
          items: [],
          hasMore: false,
          loading: false,
          action: () => ({ type: 'UNKNOWN_ACTION' }),
          thresholds: [0, 0, 0],
          useRefForAllScreens: false
        };
    }
  };

  const { items, hasMore, loading, action, thresholds, useRefForAllScreens } = getScrollParams(type);

  useEffect(() => {
    const handleScroll = () => {
      const lastId = items[items.length - 1]?.id;

      if (useRefForAllScreens || window.innerWidth >= breakpoints.web) {
        if (ref.current) {
          const { scrollTop, clientHeight, scrollHeight } = ref.current;
          if (scrollTop + clientHeight > scrollHeight - thresholds[0]) {
            if (hasMore && !loading) {
              dispatch(action(lastId));
            }
          }
        }
      } else if (window.innerWidth >= breakpoints.tablet) {
        if (useRefForAllScreens && ref.current) {
          const { scrollTop, clientHeight, scrollHeight } = ref.current;
          if (scrollTop + clientHeight > scrollHeight - thresholds[1]) {
            if (hasMore && !loading) {
              dispatch(action(lastId));
            }
          }
        } else if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - thresholds[1]
        ) {
          if (hasMore && !loading) {
            dispatch(action(lastId));
          }
        }
      } else if (window.innerWidth < breakpoints.tablet) {
        if (useRefForAllScreens && ref.current) {
          const { scrollTop, clientHeight, scrollHeight } = ref.current;
          if (scrollTop + clientHeight > scrollHeight - thresholds[2]) {
            if (hasMore && !loading) {
              dispatch(action(lastId));
            }
          }
        } else if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - thresholds[2]
        ) {
          if (hasMore && !loading) {
            dispatch(action(lastId));
          }
        }
      }
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading, items, dispatch, action, ref, thresholds, useRefForAllScreens]);
};

export default useScroll;
