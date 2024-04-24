import { FC } from 'react';
import PostCard from './PostCard';
import { ParamProps, Post } from './models';

const PostsPage: FC<ParamProps> = async ({ searchParams }) => {

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data: Post[] = await response.json();
      console.log('Posts:', data);
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };

  const posts = await fetchPosts();

  return (
    <div>
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsPage;