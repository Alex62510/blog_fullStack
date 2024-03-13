import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spiner } from '../components/Spiner';
import { PostType } from '../types/types';
import { Button } from 'flowbite-react';
import { CallToAction } from '../components/CallToAction';

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
      <Link to={`/search?category=${post?.category}`} className={'self-center mt-5'}>
        <Button gradientDuoTone={'greenToBlue'} outline size={'xs'}>
          <span>{post && post.category} </span>
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post?.title}
        className={'mt-10 p-3 max-h-[600px] w-full object-cover'}
      />
      <div
        className={
          'flex justify-between dark:text-teal-100 p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'
        }
      >
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      {post && (
        <div
          className={'p-3 max-w-2xl mx-auto w-full post-content dark:text-teal-100'}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      )}
      <div className={'max-w-4xl mx-auto w-full dark:text-teal-100'}>
        <CallToAction />
      </div>
    </main>
  );
};
