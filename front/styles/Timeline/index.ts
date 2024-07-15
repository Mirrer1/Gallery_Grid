import styled from 'styled-components';
import { motion } from 'framer-motion';

import media from 'styles/media';
import { ShadowStyle } from 'styles/Common/shadow';

export const TimelineWrapper = styled.section`
  display: flex;
  justify-content: start;
  height: inherit;

  ${media.tablet} {
    ${({ theme }) => theme.flexColumnSet('start')}
  }

  ${media.mobile} {
    margin-bottom: 0.5em;
  }
`;

export const PostsSection = styled(motion.article)`
  width: 65%;
  padding: 2em 1em 0 2em;

  ${media.tablet} {
    order: 2;
    width: 100%;
    height: 100%;
    padding: 0;
  }
`;

export const CommunitySection = styled(motion.article)`
  position: relative;
  width: 35%;
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

export const MobileSuggestedBtn = styled.div<{ $listvisible: boolean }>`
  display: none;

  ${media.tablet} {
    display: ${props => (props.$listvisible ? 'none' : 'block')};
    position: fixed;
    bottom: 2%;
    right: 3%;
    transform: translate(-50%, -50%);
    border: 1px solid ${({ theme }) => theme.colors.darkBg};
    background-color: ${({ theme }) => theme.colors.lightBg};
    padding: 0.8em;
    border-radius: 50%;
    z-index: 48;
    transform: scale(1.2);
    ${ShadowStyle};

    & > span {
      font-size: 1.1rem;
      opacity: 60%;
    }
  }

  ${media.mobile} {
    bottom: 8%;
    right: 3%;
    transform: scale(1.1);
  }
`;
