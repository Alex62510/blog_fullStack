import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  HiOutlineUserGroup,
  HiArrowNarrowUp,
  HiAnnotation,
  HiDocumentText,
} from 'react-icons/hi';

export const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getComments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    if (currentUser && currentUser.isAdmin) {
      fetchPosts();
      fetchComments();
      fetchUsers();
    }
  }, [currentUser]);

  return (
    <div className={'p-3 md:mx-auto'}>
      <div className={'flex-wrap flex gap-4 justify-center'}>
        <div
          className={
            'flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'
          }
        >
          <div className={'flex justify-between'}>
            <div className={''}>
              <h3 className={'text-gray-500 dark:text-slate-100 text-md uppercase'}>
                Total Users
              </h3>
              <p className={'text-2xl'}>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center font-semibold">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="dark:text-slate-100 text-gray-500">Last month</div>
          </div>
        </div>
        <div
          className={
            'flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'
          }
        >
          <div className={'flex justify-between'}>
            <div className={''}>
              <h3 className={'text-gray-500 dark:text-slate-100 text-md uppercase'}>
                Total Comments
              </h3>
              <p className={'text-2xl'}>{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-500  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center font-semibold">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="dark:text-slate-100 text-gray-500">Last month</div>
          </div>
        </div>
        <div
          className={
            'flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'
          }
        >
          <div className={'flex justify-between'}>
            <div className={''}>
              <h3 className={'text-gray-500 dark:text-slate-100 text-md uppercase'}>
                Total Posts
              </h3>
              <p className={'text-2xl'}>{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center font-semibold">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="dark:text-slate-100 text-gray-500">Last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};
