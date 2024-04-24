import { FC } from 'react';
import { Post } from '../models';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  inList?: boolean;
}

const PostCard: FC<PostCardProps> = ({ post, inList }) => {
  return (
    <div className="" >
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {
        inList && <Link href={`posts/${post.id}`}>View Post</Link>
      }
    </div>
  );
};

export default PostCard;