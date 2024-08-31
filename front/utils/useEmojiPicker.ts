import { useState, useCallback } from 'react';
import { EmojiClickData } from 'emoji-picker-react';

const useEmojiPicker = (setContent: React.Dispatch<React.SetStateAction<string>>) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const showEmojiPicker = useCallback(() => {
    setShowEmoji(true);
  }, []);

  const closeEmojiPicker = useCallback(() => {
    setShowEmoji(false);
  }, []);

  const onEmojiClick = useCallback(
    (emojiObject: EmojiClickData) => {
      setContent((prevText: string) => prevText + emojiObject.emoji);
    },
    [setContent]
  );

  return {
    showEmoji,
    showEmojiPicker,
    closeEmojiPicker,
    onEmojiClick
  };
};

export default useEmojiPicker;
