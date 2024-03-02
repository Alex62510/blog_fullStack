import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';

export const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout/', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOut());
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <Sidebar className={'w-full md:w-56'}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={'/dashboard?tab=profile'}>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={'user'}
              labelColor={'dark'}
              as={'div'}
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className={'cursor-pointer'}
            onClick={handleSignout}
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
