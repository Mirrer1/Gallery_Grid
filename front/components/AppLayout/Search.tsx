import React, { useCallback, useState } from 'react';
import { ArrowLeftOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';

import { slideInFromBottom } from 'styles/Common/animation';
import {
  ContentsWrapper,
  SearchBackButton,
  SearchContainer,
  SearchDivider,
  SearchHeader,
  SearchInputWrapper,
  SearchMain
} from 'styles/AppLayout/search';
import RecentSearch from './RecentSearch';

export type SearchProps = {
  setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ setSearchMode }: SearchProps) => {
  const [keyword, setKeyword] = useState('');

  const onChangeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  }, []);

  const cancelSearchMode = useCallback(() => {
    setSearchMode(false);
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
          <input type="text" placeholder="Type artists, artworks.." value={keyword} onChange={onChangeKeyword} />

          <button type="button">
            <CloseOutlined />
          </button>

          <button type="button">
            <SearchOutlined />
            <p>Search</p>
          </button>
        </SearchInputWrapper>

        <SearchDivider />

        <ContentsWrapper {...slideInFromBottom(0.3)}>
          <RecentSearch />

          {/* <div>검색결과 (유저 + 게시글)</div> */}
        </ContentsWrapper>
      </SearchMain>
    </SearchContainer>
  );
};

export default Search;
