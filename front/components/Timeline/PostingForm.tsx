import React, { useCallback } from 'react';
import { CompassOutlined, PaperClipOutlined, SmileOutlined, TagOutlined } from '@ant-design/icons';

import useInput from 'utils/useInput';
import { PostingBtn, PostingWrapper } from 'styles/Timeline/postingForm';

const PostingForm = () => {
  const [text, onChangeText] = useInput('');

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log(text);
    },
    [text]
  );

  return (
    <PostingWrapper onSubmit={onSubmitForm}>
      <textarea rows={6} placeholder="당신의 작품에 대한 이야기를 들려주세요." value={text} onChange={onChangeText} />

      <div>
        <div>
          <PaperClipOutlined />
          <TagOutlined />
          <SmileOutlined />
          <CompassOutlined />
        </div>

        <div>
          <PostingBtn type="submit" $active={text.length !== 0}>
            Post
          </PostingBtn>
        </div>
      </div>
    </PostingWrapper>
  );
};

export default PostingForm;
