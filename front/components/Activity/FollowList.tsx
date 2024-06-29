import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CloseCircleOutlined, DownOutlined, FileSearchOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';

import useInput from 'utils/useInput';
import { IFollowList, IFollowUser } from 'types/Follow';
import {
  FollowSearch,
  FollowTable,
  FollowTableBody,
  FollowTableHeader,
  FollowTableInfo,
  FollowTableWrapper
} from 'styles/Activity/follow';

const FollowList = ({ type, list }: IFollowList) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [search, onChangeSearch, setSearch] = useInput('');
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isTableVisible, setTableVisible] = useState(false);

  const showTable = useCallback(() => {
    setTableVisible(true);
  }, [isTableVisible]);

  const hideTable = useCallback(() => {
    setTableVisible(false);
    setSearchVisible(false);
  }, [isTableVisible]);

  const showSearch = useCallback(() => {
    setTableVisible(true);
    setSearchVisible(true);
  }, [isSearchVisible]);

  const hideSearch = useCallback(() => {
    setSearchVisible(false);
  }, [isSearchVisible]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log(search);
      } else if (event.key === 'Escape') {
        setSearchVisible(false);
        setSearch('');
      }
    },
    [search]
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (tableRef.current && !tableRef.current.contains(target)) {
        setTableVisible(false);
        setSearchVisible(false);
      }
    };
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return (
    <FollowTableWrapper ref={tableRef} $type={type} $visible={isTableVisible}>
      <FollowTableInfo>
        <h1>{type === 'follower' ? 'Follower' : 'Following'}</h1>

        <div>
          <FileSearchOutlined onClick={showSearch} />
          {isTableVisible ? <UpOutlined onClick={hideTable} /> : <DownOutlined onClick={showTable} />}
        </div>
      </FollowTableInfo>

      <FollowTable>
        <FollowTableHeader $visible={isTableVisible}>
          <tr>
            <td />
            <td>USER NAME</td>
            <td>FOLLOWER</td>
            <td>FOLLOWING</td>
            <td />
          </tr>
        </FollowTableHeader>

        <FollowTableBody $visible={isTableVisible}>
          {list.map((user: IFollowUser) => (
            <tr key={user.id}>
              <td>
                <img src={user.img} alt={`${user.name}의 프로필 이미지`} />
              </td>
              <td>{user.name}</td>
              <td>{user.follower}</td>
              <td>{user.following}</td>
              <td>
                <button type="button">Follow</button>
              </td>
            </tr>
          ))}
        </FollowTableBody>
      </FollowTable>

      {isSearchVisible && (
        <FollowSearch $visible={isSearchVisible}>
          <input
            type="text"
            placeholder="Search for users..."
            value={search}
            onChange={onChangeSearch}
            onKeyDown={handleKeyPress}
          />

          <SearchOutlined />
          <CloseCircleOutlined onClick={hideSearch} />
        </FollowSearch>
      )}
    </FollowTableWrapper>
  );
};

export default FollowList;
