import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { HiOutlineUserGroup, HiArrowNarrowUp } from 'react-icons/hi';

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
    <div className={''}>
      <div className={''}>
        <div className={''}>
          <div className={''}>
            <h3 className={''}>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className="flex  gap-2 text-sm">
          <span className="text-green-500 flex items-center">
            <HiArrowNarrowUp />
            {lastMonthUsers}
          </span>
          <div className="text-gray-500">Last month</div>
        </div>
      </div>
    </div>
  );
};
