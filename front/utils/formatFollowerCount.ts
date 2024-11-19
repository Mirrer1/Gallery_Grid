export const formatFollowerCount = (followerCount: number): string => {
  if (followerCount >= 1000000) {
    return `${(followerCount / 1000000).toFixed(1)}M`;
  } else if (followerCount >= 1000) {
    return `${(followerCount / 1000).toFixed(1)}K`;
  }
  return followerCount?.toString();
};
