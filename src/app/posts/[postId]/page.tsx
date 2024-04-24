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
    <div className="flex flex-col items-center m-4">
      {
        post &&
        <PostCard post={post} />
      }

      <div className="mx-10 mt-4">
        <h2 className="font-bold text-2xl">Comments</h2>
        <div>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage