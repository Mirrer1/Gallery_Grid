import React, { useCallback, useState } from 'react';
import { CaretLeftOutlined, CaretRightOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { RootState } from 'store/reducers';
import { PopularBtn, PopularOptions, PopularUserContents, PopularUserWrapper } from 'styles/Timeline/popularUser';

const PopularUser = () => {
  const popularUsers = [
    {
      nickname: 'user1',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      desc: 'asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53asdfasdg53',
      likeCount: 24,
      commentCount: 10
    },
    {
      nickname: 'user2',
      profile: 'https://i.pinimg.com/564x/b1/bc/32/b1bc32636df7757cc51cf52a71a2a78f.jpg',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus esse quis ex corporis eligendi ad et adipisciomnis dolores nemo repudiandae beatae expedita nesciunt autem est enim sunt quam praesentium libero, modimaiores consequatur? Repudiandae perspiciatis explicabo laboriosam cum ad.',
      likeCount: 24,
      commentCount: 10
    },
    {
      nickname: 'user3',
      profile: 'https://i.pinimg.com/564x/e7/5b/41/e75b41ec9be4ff5303804a35466544e3.jpg',
      desc: 'Minus esse quis ex corporis eligendi ad et adipisciomnis dolores nemo repudiandae beatae expedita nesciunt autem est enim sunt quam praesentium libero, modimaiores consequatur? Repudiandae perspiciatis explicabo laboriosam cum ad.',
      likeCount: 24,
      commentCount: 10
    }
  ];

  const [curr, setCurr] = useState(0);
  const { isCommentListVisible } = useSelector((state: RootState) => state.post);

  const next = useCallback(() => {
    const newCurr = curr === popularUsers.length - 1 ? 0 : curr + 1;
    setCurr(newCurr);
  }, [curr]);

  const prev = useCallback(() => {
    const newCurr = curr === 0 ? popularUsers.length - 1 : curr - 1;
    setCurr(newCurr);
  }, [curr]);

  return (
    <PopularUserWrapper $commentvisible={isCommentListVisible}>
      <div style={{ transform: `translateX(-${curr * 100}%)` }}>
        {popularUsers.map((user, i) => (
          <div key={i}>
            <img src={user.profile} alt={`${user.nickname}의 프로필 이미지`} />

            <PopularUserContents>
              <div>
                <div>Popular</div>
                <h1>{user.nickname}</h1>
                <p>{user.desc}</p>
              </div>

              <PopularOptions>
                <div>
                  <HeartOutlined />
                  <span>{user.likeCount}</span>
                </div>

                <div>
                  <CommentOutlined />
                  <span>{user.commentCount}</span>
                </div>
              </PopularOptions>
            </PopularUserContents>

            {curr !== 0 && (
              <PopularBtn $alignleft="true" onClick={prev}>
                <CaretLeftOutlined />
              </PopularBtn>
            )}

            {curr !== popularUsers.length - 1 && (
              <PopularBtn $alignleft="false" onClick={next}>
                <CaretRightOutlined />
              </PopularBtn>
            )}
          </div>
        ))}
      </div>
    </PopularUserWrapper>
  );
};

export default PopularUser;
