import React, { useCallback } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { hideCommentList } from 'store/actions/postAction';
import {
  ModalCommentListHeader,
  ModalCommentListItem,
  ModalCommentListItemWrapper,
  ModalCommentListWrapper
} from 'styles/Modal/modalCommentList';

const ModalCommentList = () => {
  const contentList = [
    {
      id: 1,
      nickname: 'userasd1',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content:
        '안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.안녕하세요. 저는 댓글1입니다.',
      createdAt: '2024-2-14'
    },
    {
      id: 2,
      nickname: 'useasdasdr2',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글2입니다.',
      createdAt: '2024-2-11'
    },
    {
      id: 3,
      nickname: 'usedasdasdr3',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글3입니다.',
      createdAt: '2024-6-24'
    },
    {
      id: 4,
      nickname: 'user4',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글4입니다.',
      createdAt: '2023-1-26'
    },
    {
      id: 5,
      nickname: 'user5',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글5입니다.',
      createdAt: '2023-2-22'
    },
    {
      id: 6,
      nickname: 'user6',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글6입니다.',
      createdAt: '2023-12-12'
    },
    {
      id: 7,
      nickname: 'user7',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글7입니다.',
      createdAt: '2023-11-4'
    },
    {
      id: 8,
      nickname: 'user8',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글8입니다.',
      createdAt: '2023-9-1'
    },
    {
      id: 9,
      nickname: 'user9',
      profile: 'https://i.pinimg.com/564x/2d/77/a9/2d77a9d02f910055bb43740cc69435ee.jpg',
      content: '안녕하세요. 저는 댓글9입니다.',
      createdAt: '2023-6-12'
    }
  ];

  const dispatch = useDispatch();

  const onHideComment = useCallback(() => {
    dispatch(hideCommentList());
  }, []);

  return (
    <ModalCommentListWrapper>
      <ModalCommentListHeader>
        <CaretDownOutlined onClick={onHideComment} />
      </ModalCommentListHeader>

      <ModalCommentListItemWrapper>
        {contentList.map(comment => (
          <>
            <ModalCommentListItem key={comment.id} $reply={false}>
              <div>
                <div>
                  <img src={comment.profile} alt={`${comment.nickname}의 프로필 이미지`} />

                  <div>
                    <h1>{comment.nickname}</h1>
                    <p>{comment.createdAt}</p>
                  </div>
                </div>

                <div>
                  <button type="button">수정</button>
                  <button type="button">삭제</button>
                </div>
              </div>

              <p>{comment.content}</p>
            </ModalCommentListItem>

            {/* <ReplyComment /> */}
          </>
        ))}
      </ModalCommentListItemWrapper>
    </ModalCommentListWrapper>
  );
};

export default ModalCommentList;
