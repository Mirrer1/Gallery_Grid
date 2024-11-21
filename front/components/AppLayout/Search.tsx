import React, { useCallback, useState } from 'react';
import { ArrowLeftOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import RecentSearch from './RecentSearch';
import UserSearch from './UserSearch';
import useInput from 'utils/useInput';
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
  setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ setSearchMode }: SearchProps) => {
  const [keyword, onChangeKeyword, setKeyword] = useInput('');
  const [selectedTab, setSelectedTab] = useState<'users' | 'posts'>('users');

  const handleSearch = useCallback(() => {
    if (keyword.trim()) console.log(`검색어: ${keyword}`);
    else toast.warning('검색어를 입력해주세요.');
  }, [keyword]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') handleSearch();
      else if (event.key === 'Escape') handleClearSearch();
    },
    [keyword]
  );

  const handleClearSearch = useCallback(() => {
    setKeyword('');
  }, [setKeyword]);

  const cancelSearchMode = useCallback(() => {
    setSearchMode(false);
  }, []);

  const handleTabClick = useCallback(
    (tab: 'users' | 'posts') => {
      if (tab !== selectedTab) setSelectedTab(tab);
    },
    [selectedTab]
  );

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
            type="text"
            placeholder="Type artists, artworks.."
            value={keyword}
            onChange={onChangeKeyword}
            onKeyDown={handleKeyDown}
          />

          <button type="button" onClick={handleClearSearch}>
            <CloseOutlined />
          </button>

          <button type="button" onClick={handleSearch}>
            <SearchOutlined />
            <p>Search</p>
          </button>
        </SearchInputWrapper>

        <SearchDivider />

        <ContentsWrapper {...slideInFromBottom(0.3)}>
          {/* <RecentSearch /> */}

          <SearchResultsWrapper $selectedTab={selectedTab}>
            <div>
              <button type="button" onClick={() => handleTabClick('users')}>
                Users
              </button>
              <button type="button" onClick={() => handleTabClick('posts')}>
                Posts
              </button>
            </div>

            <UserSearch />
          </SearchResultsWrapper>
        </ContentsWrapper>
      </SearchMain>
    </SearchContainer>
  );
};

export default Search;
