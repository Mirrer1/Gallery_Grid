import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeftOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import RecentSearch from './RecentSearch';
import UserSearch from './UserSearch';
import PostSearch from './PostSearch';
import useInput from 'utils/useInput';
import useScroll from 'utils/useScroll';
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
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [keyword, onChangeKeyword, setKeyword] = useInput('');
  const [selectedTab, setSelectedTab] = useState<'users' | 'posts'>('users');
  useScroll({ type: `search-${selectedTab}`, ref: searchContainerRef, keyword });

  const saveSearchKeyword = useCallback((value: string) => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const currentDate = new Date().toISOString();

    const updatedSearches = [
      { keyword: value, date: currentDate },
      ...recentSearches.filter((search: { keyword: string }) => search.keyword !== value)
    ].slice(0, 10);

    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  }, []);

  const enhancedOnChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeKeyword(e);
      const value = e.target.value.trim();

      if (value) {
        dispatch(initializeSearchUsers());
        dispatch(searchUsersRequest(value));

        dispatch(initializeSearchPosts());
        dispatch(searchPostsRequest(value));

        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
          saveSearchKeyword(value);
        }, 1000);
      }
    },
    [onChangeKeyword, saveSearchKeyword]
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
    if (window.innerWidth > 992) {
      inputRef.current?.focus();
    }
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
                <UserSearch keyword={keyword} setSearchMode={setSearchMode} />
              ) : (
                <PostSearch keyword={keyword} />
              )
            ) : (
              <RecentSearch setKeyword={setKeyword} />
            )}
          </SearchResultsWrapper>
        </ContentsWrapper>
      </SearchMain>
    </SearchContainer>
  );
};

export default Search;
