import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TimelineWrapper = styled.section`
  display: flex;
  justify-content: start;
  height: inherit;
`;

export const PostsSection = styled(motion.article)`
  width: 60%;
  padding: 1em 0.5em 0 1em;
`;

export const CommunitySection = styled(motion.article)`
  width: 40%;
  padding: 1em 1em 1em 0.5em;
`;
