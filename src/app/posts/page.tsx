import { FC } from 'react';
import PostCard from './components/PostCard';
import { ParamProps, Post } from './models';
import { API_URL } from './constants';
import Link from 'next/link';
import { toNumberParam } from '../utils';

const PostsPage: FC<ParamProps> = async ({ searchParams }) => {
  const page = toNumberParam(searchParams?.page, 1);
  const limit = toNumberParam(searchParams?.limit, 10);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}?_page=${page}&_limit=${limit}`);
      const data: Post[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };

  const posts = await fetchPosts();

  return (
    <div>
      <div>
        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} inList />
        ))}
      </div>
      {
        page > 1 &&
        <Link href={`?page=${page-1}`}>Prev</Link>
      }
      <Link href={`?page=${page+1}`}>Next</Link>
    </div>
  );
};

export default PostsPage;