import styled from 'styled-components';

import media from 'styles/media';
import {
  PostPreviewContent,
  PostPreviewImage,
  PostPreviewOption,
  PostPreviewWrapper
} from 'styles/Gallery/postPreview';

export const UserPostsWrapper = styled(PostPreviewWrapper)`
  width: 60%;
  height: 100%;
  overflow-y: scroll;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 1em 0.7em 0em;

  ${media.tablet} {
    width: 100%;
    padding: 0.7em 0 0.2em 0;
  }
`;

export const UserPostImage = styled(PostPreviewImage)``;

export const UserPostContent = styled(PostPreviewContent)``;

export const UserPostOption = styled(PostPreviewOption)``;
