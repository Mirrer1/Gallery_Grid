import { useEffect, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

import { RootState } from 'store/reducers';
import { Post, PostComment, UserHistoryPost } from 'store/types/postType';
import {
  loadBestPostsRequest,
  loadFollowingPostsRequest,
  loadMyActivityPostsRequest,
  loadNewPostsRequest,
  loadUserPostsRequest
} from 'store/actions/postAction';
import { loadUserFollowInfoRequest, searchUsersRequest } from 'store/actions/userAction';

type UseScrollParams = {
  type:
    | `timeline-${'best' | 'new' | 'follow'}`
    | 'activity'
    | `user-${'posts' | 'follow'}`
    | `search-${'users' | 'posts'}`;
  ref: RefObject<HTMLDivElement>;
  userId?: number;
  followType?: 'follower' | 'following';
  keyword?: string;
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

const useScroll = ({ type, ref, userId, followType, keyword }: UseScrollParams) => {
  const dispatch = useDispatch();
  const {
    userFollowInfo,
    hasMoreUserFollowInfo,
    loadUserFollowInfoLoading,
    searchUsers,
    hasMoreSearchUsers,
    searchUsersLoading
  } = useSelector((state: RootState) => state.user);
  const {
    timelinePosts,
    hasMoreTimelinePosts,
    loadNewPostsLoading,
    myActivityPosts,
    hasMoreMyActivityPosts,
    loadMyActivityPostsLoading,
    loadBestPostsLoading,
    userPosts,
    hasMoreUserPosts,
    loadUserPostsLoading
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
      case 'timeline-follow':
        return {
          items: timelinePosts,
          hasMore: hasMoreTimelinePosts,
          loading: loadNewPostsLoading,
          dispatcher: () => {
            const lastPost = timelinePosts[timelinePosts.length - 1];
            return loadFollowingPostsRequest(lastPost?.createdAt || null, 10);
          },
          thresholds: [350, 900, 1700]
        };
      case 'user-posts':
        return {
          items: userPosts,
          hasMore: hasMoreUserPosts,
          loading: loadUserPostsLoading,
          dispatcher: () => loadUserPostsRequest(userId ?? 0, userPosts[userPosts.length - 1]?.id || 0),
          thresholds: [300, 480, 510]
        };
      case 'user-follow':
        return {
          items: userFollowInfo,
          hasMore: hasMoreUserFollowInfo,
          loading: loadUserFollowInfoLoading,
          dispatcher: () => {
            const lastItem = userFollowInfo[userFollowInfo.length - 1];
            return loadUserFollowInfoRequest(
              followType as 'follower' | 'following',
              userId ?? 0,
              lastItem?.id,
              lastItem?.followerCount
            );
          },
          thresholds: [300, 480, 510]
        };
      case 'search-users':
        return {
          items: searchUsers,
          hasMore: hasMoreSearchUsers,
          loading: searchUsersLoading,
          dispatcher: () => {
            const lastUser = searchUsers[searchUsers.length - 1];
            const nextFollowerCount = lastUser?.followerCount ?? 0;
            const lastId = lastUser?.id ?? 0;
            return searchUsersRequest(keyword as string, nextFollowerCount, lastId);
          },
          thresholds: [510, 590, 790]
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
