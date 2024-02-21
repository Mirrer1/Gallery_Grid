import React, { useCallback } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import useInput from 'utils/useInput';
import { SearchWrapper } from 'styles/AppLayout/search';

const Search = () => {
  const [keyword, onChangeKeyword] = useInput('');

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log(keyword);
      }
    },
    [keyword]
  );

  return (
    <SearchWrapper>
      <label htmlFor="search">
        <SearchOutlined />
      </label>

      <input
        type="text"
        id="search"
        placeholder="Search"
        value={keyword}
        onChange={onChangeKeyword}
        onKeyPress={handleKeyPress}
      />
    </SearchWrapper>
  );
};

export default Search;
