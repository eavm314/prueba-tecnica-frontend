import { FC } from 'react';
import { Post } from '../models';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  inList?: boolean;
}

const PostCard: FC<PostCardProps> = ({ post, inList }) => {
  return (
    <div className={`${inList && "hover:bg-slate-200"} p-2 w-full`}>
      <h2 className={'text-xl font-semibold '+(!inList && "text-2xl")}>
        {post.title}
      </h2>
      <p className={`${inList && "overflow-ellipsis overflow-hidden whitespace-nowrap"}`}>{post.body}</p>
    </div>
  );
};

export default PostCard;