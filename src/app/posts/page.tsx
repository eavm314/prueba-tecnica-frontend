import { FC } from 'react';
import PostCard from './components/PostCard';
import { ParamProps, Post } from './models';
import { API_URL, SearchParamsKeys } from './constants';
import Link from 'next/link';
import { toNumberParam } from '../utils';
import { Filters } from './components/Filters';

const PostsPage: FC<ParamProps> = async ({ searchParams }) => {
  const page = toNumberParam(searchParams?.[SearchParamsKeys.PAGE], 1);

  const title = searchParams?.[SearchParamsKeys.TITLE];
  const content = searchParams?.[SearchParamsKeys.CONTENT];

  const createSearchParams = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set(SearchParamsKeys.PAGE, String(page + 1));

    const prevSearchParams = new URLSearchParams(searchParams);
    prevSearchParams.set(SearchParamsKeys.PAGE, String(page - 1));

    return { nextSearchParams, prevSearchParams };
  };

  const { nextSearchParams, prevSearchParams } = createSearchParams();

  const fetchPosts = async () => {
    const apiSearchParams = new URLSearchParams();
    apiSearchParams.set("_page", String(page));

    if (title)
      apiSearchParams.set("title_like", title);

    if (content)
      apiSearchParams.set("body_like", content);

    try {
      const response = await fetch(`${API_URL}?${apiSearchParams.toString()}`);
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
        <h2>Filters</h2>
        { (title || content) && <Link href="/posts">Reset</Link>}
        <Filters title={title} content={content} />
      </div>
      <div>
        { posts.length > 0 ?
        posts.map((post: any) => (
          <PostCard key={post.id} post={post} inList />
        )) :
        <div>No results</div>
      }
      </div>
      {
        page > 1 &&
        <Link href={`?${prevSearchParams.toString()}`}>Prev</Link>
      }
      {
        posts.length == 10 &&
        <Link href={`?${nextSearchParams.toString()}`}>Next</Link>
      }
    </div>
  );
};

export default PostsPage;