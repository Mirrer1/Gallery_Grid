import styled from 'styled-components';

import media from 'styles/media';
import {
  PostPreviewContent,
  PostPreviewImage,
  PostPreviewOption,
  PostPreviewWrapper
} from 'styles/Gallery/postPreview';

export const UserPostsWrapper = styled(PostPreviewWrapper)<{ $isGridDisabled?: boolean }>`
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  grid-template-columns: ${props => (props.$isGridDisabled ? 'none' : 'repeat(2, 1fr)')};
  padding: 0 1em 0.7em 0;

  & > article {
    height: fit-content;
  }

  ${media.tablet} {
    width: 100%;
    padding: 0;
    overflow-y: visible;
  }
`;

export const UserPostImage = styled(PostPreviewImage)``;

export const UserPostContent = styled(PostPreviewContent)``;

export const UserPostOption = styled(PostPreviewOption)``;
