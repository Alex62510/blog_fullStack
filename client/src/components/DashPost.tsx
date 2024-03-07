import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { PostType } from '../types/types';
import { HiOutlineArrowRight } from 'react-icons/hi';

export const DashPost = () => {
  const { currentUser, loading, error } = useSelector((state: RootState) => state.user);
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (currentUser) {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserPosts(data.posts);
            if (data.length < 9) {
              setShowMore(false);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (currentUser && currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      if (currentUser) {
        const res = await fetch(
          `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
        );
        const data = await res.json();
        if (res.ok) {
          setUserPosts(prev => [...prev, ...data.posts]);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <div
      className={
        'table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-teal-100 ' +
        'scrollbar-thumb-teal-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'
      }
    >
      {currentUser && currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className={'shadow-md'}>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span className={''}>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map(post => (
              <Table.Body className={'divide-y'}>
                <Table.Row
                  className={
                    'bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-neutral-200 hover:shadow-lg hover:animate-pulse'
                  }
                >
                  <Table.Cell className={'dark:text-teal-100'}>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className={'w-20 h-10 object-cover bg-gray-500 '}
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className={'font-medium text-green-900 dark:text-teal-100'}
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className={'dark:text-teal-100'}>
                    {post.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className={
                        'font-medium text-red-500 cursor-pointer hover:underline transition hover:text-red-900 hover:font-semibold'
                      }
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className={
                        'text-teal-300 hover:underline transition hover:text-teal-950'
                      }
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <div className={'py-7'}>
              <Button
                gradientDuoTone={'purpleToBlue'}
                onClick={handleShowMore}
                className={
                  ' w-full self-center text-sm text-teal-950 bg-white hover:text-white hover:bg-white'
                }
                outline
              >
                <HiOutlineArrowRight className="h-5 w-5 rotate-90 font-teal-900 hover:text-white" />
                <span className={'pl-4'}>Show more</span>
              </Button>
            </div>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
};
