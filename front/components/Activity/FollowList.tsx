import React, { useState } from 'react';
import { DownOutlined, FileSearchOutlined, UpOutlined } from '@ant-design/icons';

import { IFollowList, IFollowUser } from 'types/Follow';
import {
  FollowTable,
  FollowTableBody,
  FollowTableHeader,
  FollowTableInfo,
  FollowTableWrapper
} from 'styles/Activity/follow';

const FollowList = ({ type, list }: IFollowList) => {
  const [isTableVisible, setTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setTableVisible(!isTableVisible);
  };

  return (
    <FollowTableWrapper $type={type}>
      <FollowTableInfo>
        <h1>{type === 'follower' ? 'Follower' : 'Following'}</h1>

        <div>
          <FileSearchOutlined />
          {isTableVisible ? (
            <UpOutlined onClick={toggleTableVisibility} />
          ) : (
            <DownOutlined onClick={toggleTableVisibility} />
          )}
        </div>
      </FollowTableInfo>

      <FollowTable>
        <FollowTableHeader $visible={isTableVisible}>
          <tr>
            <td></td>
            <td>USER NAME</td>
            <td>FOLLOWER</td>
            <td>FOLLOWING</td>
            <td></td>
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
    </FollowTableWrapper>
  );
};

export default FollowList;
