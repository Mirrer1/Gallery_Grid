export interface IFollowUser {
  id: number;
  img: string;
  name: string;
  follower: number;
  following: number;
}

export interface IFollowList {
  type: 'follower' | 'following';
  list: IFollowUser[];
}
