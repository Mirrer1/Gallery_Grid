import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';

import RecentSearch from './RecentSearch';
import UserSearch from './UserSearch';
import PostSearch from './PostSearch';
import PostModal from 'components/Modal/PostModal';
import useInput from 'utils/useInput';
import useScroll from 'utils/useScroll';
import { RootState } from 'store/reducers';
import { initializeSearchUsers, searchUsersRequest } from 'store/actions/userAction';
import { initializeSearchPosts, searchPostsRequest } from 'store/actions/postAction';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  ContentsWrapper,
  SearchBackButton,
  SearchContainer,
  SearchDivider,
  SearchHeader,
  SearchInputWrapper,
  SearchMain,
  SearchResultsWrapper
} from 'styles/AppLayout/search';

export type SearchProps = {
  setSearchMode?: React.Dispatch<React.SetStateAction<boolean>>;
  keyword?: string;
};

const Search = ({ setSearchMode }: SearchProps) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { isPostModalVisible } = useSelector((state: RootState) => state.post);
  const {} = useSelector((state: RootState) => state.user);
  const [selectedTab, setSelectedTab] = useState<'users' | 'posts'>('users');
  const [keyword, onChangeKeyword, setKeyword] = useInput('');
  useScroll({ type: `search-${selectedTab}`, ref: searchContainerRef, keyword });

  const enhancedOnChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeKeyword(e);
      const value = e.target.value.trim();

      if (value) {
        dispatch(initializeSearchUsers());
        dispatch(searchUsersRequest(value));

        dispatch(initializeSearchPosts());
        dispatch(searchPostsRequest(value));
      }
    },
    [onChangeKeyword]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') setKeyword('');
    },
    [setKeyword]
  );

  const handleClearSearch = useCallback(() => {
    setKeyword('');
    setSelectedTab('users');
    dispatch(initializeSearchUsers());
    dispatch(initializeSearchPosts());
  }, [setKeyword]);

  const cancelSearchMode = useCallback(() => {
    if (setSearchMode) {
      setSearchMode(false);
      setSelectedTab('users');
      dispatch(initializeSearchUsers());
      dispatch(initializeSearchPosts());
    }
  }, []);

  const handleTabClick = useCallback(
    (tab: 'users' | 'posts') => {
      if (tab !== selectedTab) setSelectedTab(tab);
    },
    [selectedTab]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <SearchContainer {...slideInFromBottom()}>
      <SearchBackButton onClick={cancelSearchMode}>
        <ArrowLeftOutlined />
      </SearchBackButton>

      <SearchHeader>
        <p>
          Search<span>.</span>
        </p>
        <p>
          작가와 작품을 탐색하며 <span>당신만의 취향을 발견해보세요.</span>
        </p>
      </SearchHeader>

      <SearchMain>
        <SearchInputWrapper>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type artists, artworks.."
            value={keyword}
            onChange={enhancedOnChangeKeyword}
            onKeyDown={handleKeyDown}
          />

          <button type="button" onClick={handleClearSearch}>
            <CloseOutlined />
          </button>

          <button type="button">
            <SearchOutlined />
            <p>Search</p>
          </button>
        </SearchInputWrapper>

        <SearchDivider />

        <ContentsWrapper key={selectedTab} ref={searchContainerRef} {...slideInFromBottom(0.3)}>
          <SearchResultsWrapper $selectedTab={selectedTab}>
            {keyword.trim() && (
              <div>
                <button type="button" onClick={() => handleTabClick('users')}>
                  Users
                </button>
                <button type="button" onClick={() => handleTabClick('posts')}>
                  Posts
                </button>
              </div>
            )}

            {keyword.trim() ? (
              selectedTab === 'users' ? (
                <UserSearch keyword={keyword} />
              ) : (
                <PostSearch keyword={keyword} />
              )
            ) : (
              <RecentSearch />
            )}
          </SearchResultsWrapper>
        </ContentsWrapper>
      </SearchMain>

      {isPostModalVisible && <PostModal />}
    </SearchContainer>
  );
};

export default Search;
