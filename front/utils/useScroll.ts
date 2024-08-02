import { useEffect, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

import { Post } from 'store/types/postType';
import { RootState } from 'store/reducers';
import { loadPostsRequest } from 'store/actions/postAction';

type UseScrollParams = {
  type: 'timeline';
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
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state: RootState) => state.post);

  const getScrollParams = (type: string): ScrollParams => {
    switch (type) {
      case 'timeline':
        return {
          items: mainPosts,
          hasMore: hasMorePosts,
          loading: loadPostsLoading,
          action: loadPostsRequest,
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

      if (window.innerWidth >= breakpoints.web) {
        if (ref.current) {
          if (ref.current.scrollTop + ref.current.clientHeight > ref.current.scrollHeight - thresholds[0]) {
            if (hasMore && !loading) {
              dispatch(action(lastId));
            }
          }
        }
      } else if (window.innerWidth >= breakpoints.tablet) {
        if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - thresholds[1]
        ) {
          if (hasMore && !loading) {
            dispatch(action(lastId));
          }
        }
      } else if (window.innerWidth < breakpoints.tablet) {
        if (
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
  }, [hasMore, loading, items, dispatch, action, ref, thresholds]);
};

export default useScroll;
