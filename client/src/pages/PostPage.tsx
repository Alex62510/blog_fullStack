import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spiner } from '../components/Spiner';
import { PostType } from '../types/types';

export const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className={'flex justify-center items-center text-center min-h-screen'}>
        <Spiner />
      </div>
    );
  return (
    <main className={'p-3 flex flex-col max-w-6xl mx-auto min-h-screen'}>
      <h1
        className={
          'text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl dark:text-teal-100'
        }
      >
        {post && post.title}
      </h1>
    </main>
  );
};
