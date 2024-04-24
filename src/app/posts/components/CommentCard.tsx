import { FC } from 'react';
import { Comment } from '../models';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="" >
      <h2>{comment.name}</h2>
      <h3>{comment.email}</h3>
      <p>{comment.body}</p>
    </div>
  );
};

export default CommentCard;