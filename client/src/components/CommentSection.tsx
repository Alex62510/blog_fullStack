import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { Alert, Button, Textarea } from 'flowbite-react';

type Props = {
  postId: string;
};
export const CommentSection = ({ postId }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      if (currentUser) {
        setCommentError('');
        const res = await fetch('/api/comment/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
        });
        const data = await res.json();
        if (res.ok) {
          setComment('');
          setCommentError('');
        }
      }
    } catch (e) {
      setCommentError((e as Error).message);
    }
  };

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
      {currentUser && (
        <form className={'border border-teal-500 p-4 rounded-md'} onSubmit={handleSubmit}>
          <Textarea
            placeholder={'Add a comment...'}
            rows={3}
            maxLength={200}
            onChange={e => setComment(e.target.value)}
            value={comment}
          ></Textarea>
          <div className={'flex justify-between items-center mt-5'}>
            <p className={'text-gray-500 text-xs'}>
              {200 - comment.length} characters remaining
            </p>
            <Button
              className={''}
              type={'submit'}
              gradientDuoTone={'purpleToBlue'}
              outline
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color={'failure'} className={'mt-5'}>
              {commentError && commentError}
            </Alert>
          )}
        </form>
      )}
    </div>
  );
};
