import React from 'react';
import { Avatar, Dropdown } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <>
      {currentUser && (
        <Dropdown
          label={<Avatar alt={'user'} img={currentUser.profilePicture} rounded />}
          arrowIcon={false}
          inline
        >
          <Dropdown.Header>
            <span className={'block text-sm'}>@{currentUser.username}</span>
            <span className={'block text-sm font-medium truncate'}>
              @{currentUser.email}
            </span>
          </Dropdown.Header>
          <Link to={'/dashboard?tab=profile'}>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Link>
        </Dropdown>
      )}
    </>
  );
};
