import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

type Props = {
  postId: string;
};
export const CommentSection = ({ postId }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className={'max-w-2xl mx-auto w-full p-3'}>
      {currentUser ? (
        <div className={'flex items-center gap-1 my-5 text-gray-500 text-sm'}>
          <p>Signed as:</p>
          <img
            src={currentUser.profilePicture}
            alt=""
            className={'w-6 h-6 object-cover rounded-full'}
          />
          <Link
            to={'/dashboard?tab=profile'}
            className={'text-xs text-cyan-500 hover:underline hover:text-cyan-700'}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className={'text-sm  my-5 flex gap-1 dark:text-teal-100'}>
          You must be signed in to comment.
          <Link to={'/sign-in'} className={'text-cyan-500 hover:underline'}>
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};
