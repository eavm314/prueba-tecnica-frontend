import { FC } from 'react';
import { Comment } from '../models';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="p-2" >
      <h2 className='text-lg font-semibold'>{comment.name}</h2>
      <h3 className='text-sm'>{comment.email}</h3>
      <p>{comment.body}</p>
    </div>
  );
};

export default CommentCard;