import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const DashPost = () => {
  const { currentUser, loading, error } = useSelector((state: RootState) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (currentUser) {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserPosts(data.posts);
          }
        }
      } catch (e) {}
    };
    fetchPosts();
  }, [currentUser, currentUser._id]);
  console.log(userPosts);
  return <div>DashPost</div>;
};
