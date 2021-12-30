import { useRouter } from 'next/router';
import useSWR from 'swr';

import { PostCard } from '../components/PostCard';
import { init } from '../libs/constants';
import { Post } from '../models/Post';

const Home = () => {
  const router = useRouter();
  const makeUrl = (id: number) => router.push(`/posts/${id}`);
  const fetcher = (url) => fetch(url, init).then((r) => r.json());

  const { data } = useSWR('http://localhost:1337/api/posts', fetcher);

  if (!data) return <div>Loading...</div>;
  const posts = data.data.map((post: Post) => (
    <PostCard
      key={post.id}
      title={post.attributes.title}
      publishedAt={post.attributes.published_at}
      onClick={() => makeUrl(post.id)}
    />
  ));

  return (
    <div>
      <h1 className='text-red-100'>My Blog</h1>
      <div>{posts}</div>
    </div>
  );
};

export default Home;
