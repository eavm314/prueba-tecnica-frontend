import Link from 'next/link';
import { FC } from 'react';
import { toNumberParam } from '../utils';
import { Filters } from './components/Filters';
import PostCard from './components/PostCard';
import { API_URL, SearchParamsKeys } from './constants';
import { ParamProps, Post } from './models';

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
    <div className='my-4'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-bold'>JSON Posts Visualizer</h1>
        <Filters title={title} content={content} />
      </div>

      <div className='flex flex-col divide-y-2 m-6'>
        {posts.length > 0 ?
          posts.map((post) => (
            <Link key={post.id} href={`posts/${post.id}`}>
              <PostCard post={post} inList />
            </Link>
          )) :
          <div>No results</div>
        }
      </div>
      <div className='flex gap-6 justify-center'>
        {
          page > 1 &&
          <Link className='bg-black text-gray-100 p-2 rounded-xl w-32 text-center'
            href={`?${prevSearchParams.toString()}`}>
            ⬅️ Anterior
          </Link>
        }
        {
          posts.length == 10 &&
          <Link className='bg-black text-gray-100 p-2 rounded-xl w-32 text-center'
            href={`?${nextSearchParams.toString()}`}>
            Siguiente ➡️
          </Link>
        }
      </div>
    </div>
  );
};

export default PostsPage;