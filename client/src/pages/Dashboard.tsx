import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { l } from 'vite/dist/node/types.d-jgA8ss1A';
import { DashSidebar } from '../components/DashSidebar';
import { DashProfile } from '../components/DashProfile';
import { DashPost } from '../components/DashPost';
import { DashUsers } from '../components/DashUsers';
import { DashComments } from '../components/DashComments';

export const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className={'min-h-screen flex flex-col md:flex-row'}>
      <div className={'md:w-56'}>
        <DashSidebar />
      </div>
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashPost />}
      {tab === 'users' && <DashUsers />}
      {tab === 'comments' && <DashComments />}
    </div>
  );
};
