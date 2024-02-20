import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';

export const TimelineWrapper = styled.section`
  display: flex;
  justify-content: start;
  height: inherit;

  ${media.tablet} {
    ${({ theme }) => theme.flexColumnSet('start')}
  }
`;

export const PostsSection = styled(motion.article)`
  width: 70%;
  padding: 2em 1em 0 2em;

  ${media.tablet} {
    order: 2;
    width: 100%;
    height: 100%;
    padding: 0;
  }
`;

export const CommunitySection = styled(motion.article)`
  width: 30%;
  padding: 2em 2em 2em 1em;

  ${media.tablet} {
    order: 1;
    width: 100%;
    height: 230px;
    padding: 0;
    margin-bottom: 0.7em;
  }

  ${media.mobile} {
    height: 160px;
  }
`;
