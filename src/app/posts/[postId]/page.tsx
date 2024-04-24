import { FC } from "react"
import PostCard from "../components/PostCard"
import { Comment, ParamProps, Post } from "../models"
import { toNumberParam } from "@/app/utils"
import { API_URL } from "../constants"
import CommentCard from "../components/CommentCard"

const SinglePostPage: FC<ParamProps> = async ({ params }) => {
  const postId = toNumberParam(params?.postId, 1)
  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_URL}/${postId}`)
      const data: Post = await response.json()
      return data;
    } catch (error) {
      console.error('Error fetching post:', error)
      return undefined;
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/${postId}/comments`)
      const data: Comment[] = await response.json()
      return data;
    } catch (error) {
      console.error('Error fetching post:', error)
      return [];
    }
  }

  const comments = await fetchComments();

  const post = await fetchPost();
  return (
    <div>
      {
        post &&
        <PostCard post={post} />
      }

      <h2>Comments</h2>
      <div>
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default SinglePostPage