import React from 'react';
import { MoreOutlined, PlusCircleOutlined } from '@ant-design/icons';

const PopularFollowingList = () => {
  const followingUsers = [
    {
      nickname: 'user1',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      desc: 'asdfasdg5345sfasfasd asdfasf adipisicing elit. Minus esse quis ex corporis eligendi ad et adipisciomnis dolores nemo repudiandae beatae expedita nesciunt autem est enim sunt quam praesentium libero, modimaiores consequatur? Repudiandae perspiciatis explicabo laboriosam cum ad.'
    },
    {
      nickname: 'user2',
      profile: 'https://i.pinimg.com/564x/b1/bc/32/b1bc32636df7757cc51cf52a71a2a78f.jpg',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus esse quis ex corporis eligendi ad et adipisciomnis dolores nemo repudiandae beatae expedita nesciunt autem est enim sunt quam praesentium libero, modimaiores consequatur? Repudiandae perspiciatis explicabo laboriosam cum ad.'
    },
    {
      nickname: 'user3',
      profile: 'https://i.pinimg.com/564x/e7/5b/41/e75b41ec9be4ff5303804a35466544e3.jpg',
      desc: 'Minus esse quis ex corporis eligendi ad et adipisciomnis dolores nemo repudiandae beatae expedita nesciunt autem est enim sunt quam praesentium libero, modimaiores consequatur? Repudiandae perspiciatis explicabo laboriosam cum ad.'
    }
  ];

  return (
    <>
      <div>
        <h1>Following people</h1>
        <MoreOutlined />
      </div>

      {followingUsers.map((user, i) => (
        <div key={i}>
          <img src={user.profile} alt={`${user.nickname}의 프로필 이미지`} />

          <div>
            <h2>{user.nickname}</h2>
            <p>{user.desc}</p>
          </div>

          <PlusCircleOutlined />
        </div>
      ))}
    </>
  );
};

export default PopularFollowingList;
