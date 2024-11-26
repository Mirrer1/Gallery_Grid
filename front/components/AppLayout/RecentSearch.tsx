import React, { useCallback, useEffect, useState } from 'react';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import formatDate from 'utils/useListTimes';
import { NoSearchUserContainer } from 'styles/AppLayout/userSearch';
import { RecentSearchHeader, RecentSearchList, RecentSearchWrapper } from 'styles/AppLayout/search';
import { initializeSearchUsers, searchUsersRequest } from 'store/actions/userAction';
import { initializeSearchPosts, searchPostsRequest } from 'store/actions/postAction';

type RecentSearchProps = {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

type SearchHistory = {
  keyword: string;
  date: string;
};

const RecentSearch = ({ setKeyword }: RecentSearchProps) => {
  const dispatch = useDispatch();
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  const onClickKeyword = useCallback(
    (keyword: string) => {
      setKeyword(keyword);

      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const currentDate = new Date().toISOString();

      const updatedSearches = [
        { keyword, date: currentDate },
        ...recentSearches.filter((search: { keyword: string }) => search.keyword !== keyword)
      ].slice(0, 10);

      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

      dispatch(initializeSearchUsers());
      dispatch(searchUsersRequest(keyword));

      dispatch(initializeSearchPosts());
      dispatch(searchPostsRequest(keyword));
    },
    [dispatch]
  );

  const handleDeleteItem = useCallback(
    (keyword: string) => {
      const updatedHistory = searchHistory.filter(item => item.keyword !== keyword);
      setSearchHistory(updatedHistory);
      localStorage.setItem('recentSearches', JSON.stringify(updatedHistory));
    },
    [searchHistory]
  );

  const handleClearAll = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('recentSearches');
  }, []);

  useEffect(() => {
    const storedHistory = localStorage.getItem('recentSearches');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <RecentSearchWrapper>
      <RecentSearchHeader>
        <p>최근 검색어</p>
        <button type="button" onClick={handleClearAll}>
          전체삭제
        </button>
      </RecentSearchHeader>

      <RecentSearchList>
        {searchHistory.length > 0 ? (
          searchHistory.map(({ keyword, date }) => (
            <li key={keyword}>
              <div onClick={() => onClickKeyword(keyword)}>
                <SearchOutlined />
                <p>{keyword}</p>
              </div>

              <div>
                <p>{formatDate(date)}</p>
                <CloseOutlined onClick={() => handleDeleteItem(keyword)} />
              </div>
            </li>
          ))
        ) : (
          <NoSearchUserContainer>
            <p>최근 검색어 내역이 없습니다.</p>
          </NoSearchUserContainer>
        )}
      </RecentSearchList>
    </RecentSearchWrapper>
  );
};

export default RecentSearch;
