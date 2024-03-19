import styled from 'styled-components';

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
  padding: 0.7em 1em 0.7em 0em;
`;

export const UserPostImage = styled(PostPreviewImage)``;

export const UserPostContent = styled(PostPreviewContent)``;

export const UserPostOption = styled(PostPreviewOption)``;
