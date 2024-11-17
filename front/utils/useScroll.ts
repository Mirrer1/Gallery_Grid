import { useEffect, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

import { Post, PostComment, UserHistoryPost } from 'store/types/postType';
import { RootState } from 'store/reducers';
import { loadBestPostsRequest, loadMyActivityPostsRequest, loadNewPostsRequest } from 'store/actions/postAction';

type UseScrollParams = {
  type: `timeline-${'best' | 'new' | 'follow'}` | 'activity';
  ref: RefObject<HTMLDivElement>;
};

type ScrollParams = {
  items: Post[] | UserHistoryPost[];
  hasMore: boolean;
  loading: boolean;
  dispatcher: () => AnyAction;
  thresholds: number[];
};

const breakpoints = {
  web: 1200,
  tablet: 992,
  mobile: 576
};

const useScroll = ({ type, ref }: UseScrollParams) => {
  const dispatch = useDispatch();
  const {
    timelinePosts,
    hasMoreTimelinePosts,
    loadNewPostsLoading,
    myActivityPosts,
    hasMoreMyActivityPosts,
    loadMyActivityPostsLoading,
    loadBestPostsLoading
  } = useSelector((state: RootState) => state.post);

  const getScrollParams = (type: string): ScrollParams => {
    switch (type) {
      case 'timeline-best':
        return {
          items: timelinePosts,
          hasMore: hasMoreTimelinePosts,
          loading: loadBestPostsLoading,
          dispatcher: () => {
            const lastPost = timelinePosts[timelinePosts.length - 1];
            return loadBestPostsRequest(
              lastPost?.id,
              lastPost?.Likers.length,
              lastPost?.Comments.reduce(
                (acc: number, comment: PostComment) => acc + 1 + (comment.Replies?.length || 0),
                0
              )
            );
          },
          thresholds: [350, 900, 1700]
        };
      case 'timeline-new':
        return {
          items: timelinePosts,
          hasMore: hasMoreTimelinePosts,
          loading: loadNewPostsLoading,
          dispatcher: () => loadNewPostsRequest(timelinePosts[timelinePosts.length - 1]?.id || 0),
          thresholds: [350, 900, 1700]
        };
      case 'activity':
        return {
          items: myActivityPosts,
          hasMore: hasMoreMyActivityPosts,
          loading: loadMyActivityPostsLoading,
          dispatcher: () => loadMyActivityPostsRequest(myActivityPosts[myActivityPosts.length - 1]?.id || 0),
          thresholds: [720, 1860, 1480]
        };
      default:
        return {
          items: [],
          hasMore: false,
          loading: false,
          dispatcher: () => ({ type: 'UNKNOWN_ACTION' }),
          thresholds: [0, 0, 0]
        };
    }
  };

  const { items, hasMore, loading, dispatcher, thresholds } = getScrollParams(type);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= breakpoints.web && ref.current) {
        const { scrollTop, clientHeight, scrollHeight } = ref.current;
        if (scrollTop + clientHeight > scrollHeight - thresholds[0]) {
          if (hasMore && !loading) {
            dispatch(dispatcher());
          }
        }
      } else if (window.innerWidth < breakpoints.web) {
        const threshold = window.innerWidth >= breakpoints.tablet ? thresholds[1] : thresholds[2];
        if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight - threshold) {
          if (hasMore && !loading) {
            dispatch(dispatcher());
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
  }, [hasMore, loading, items, dispatch, dispatcher, ref, thresholds]);
};

export default useScroll;
