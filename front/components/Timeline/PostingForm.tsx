import React, { useCallback, useState } from 'react';
import { CloseOutlined, CompassOutlined, PaperClipOutlined, SmileOutlined } from '@ant-design/icons';
import EmojiPicker, { IEmojiData } from 'emoji-picker-react';

import useInput from 'utils/useInput';
import { useLocation } from 'utils/useLocation';
import { PostingBtn, PostingEmojiPicker, PostingWrapper } from 'styles/Timeline/postingForm';

const PostingForm = () => {
  const [text, onChangeText, setText] = useInput<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { location, getLocation, setLocation } = useLocation();

  const setInitialLocation = useCallback(() => {
    setLocation(null);
  }, []);

  const onEmojiClick = useCallback(
    (event: MouseEvent, emojiObject: IEmojiData) => {
      setText(prevText => prevText + emojiObject.emoji);
    },
    [setText]
  );

  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker(prev => !prev);
  }, []);

  const closeEmojiPicker = useCallback(() => {
    setShowEmojiPicker(false);
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log(text);
    },
    [text]
  );

  return (
    <PostingWrapper onSubmit={onSubmitForm}>
      <textarea
        rows={6}
        maxLength={2000}
        placeholder="당신의 작품에 대한 이야기를 들려주세요."
        value={text}
        onChange={onChangeText}
      />

      <div>
        <div>
          <PaperClipOutlined />
          <SmileOutlined onClick={toggleEmojiPicker} />
          {location ? (
            <div onClick={setInitialLocation}>
              <p>{location?.address}</p>
              <CloseOutlined />
            </div>
          ) : (
            <CompassOutlined onClick={getLocation} />
          )}
        </div>

        {showEmojiPicker && (
          <PostingEmojiPicker>
            <div onClick={closeEmojiPicker} />

            <div>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          </PostingEmojiPicker>
        )}

        <div>
          <p>{text.length} / 2000</p>

          <PostingBtn type="submit" $active={text.length !== 0}>
            Post
          </PostingBtn>
        </div>
      </div>
    </PostingWrapper>
  );
};

export default PostingForm;
