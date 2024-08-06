import React, { useCallback, useEffect, useState } from 'react';
import { CloseOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import { logoutRequest } from 'store/actions/userAction';
import { MobileHeaderContent, MobileHeaderInput, MobileHeaderWrapper } from 'styles/AppLayout/mobileHeader';

type ISearch = {
  showInput: boolean;
  showSearch: () => void;
  hideSearch: () => void;
};

const MobileHeader = ({ showInput, showSearch, hideSearch }: ISearch) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  const onChangeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        console.log(keyword);
      } else if (e.key === 'Escape' || e.keyCode === 27) {
        hideSearch();
      }
    },
    [keyword, hideSearch]
  );

  const onClickProfile = useCallback(() => {
    Router.push('/user');
  }, []);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  useEffect(() => {
    if (!showInput) setKeyword('');
  }, [showInput]);

  return (
    <MobileHeaderWrapper>
      {showInput ? (
        <MobileHeaderInput>
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={onChangeKeyword}
            onKeyDown={handleKeyPress}
            autoFocus
          />

          {keyword.length > 0 ? <SearchOutlined /> : <CloseOutlined onClick={hideSearch} />}
        </MobileHeaderInput>
      ) : (
        <div>
          <h1>Gallery Grid</h1>

          <MobileHeaderContent>
            <div onClick={showSearch}>
              <SearchOutlined />
            </div>

            <div onClick={onClickProfile}>
              <img
                src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                alt="유저 프로필 이미지"
              />
            </div>

            <div>
              <LogoutOutlined onClick={onClickLogout} />
            </div>
          </MobileHeaderContent>
        </div>
      )}
    </MobileHeaderWrapper>
  );
};

export default MobileHeader;
