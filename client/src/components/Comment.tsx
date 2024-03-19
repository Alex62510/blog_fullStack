import React, { useEffect, useState } from 'react';
import { CommentType, UserType } from '../types/types';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, Textarea } from 'flowbite-react';

type Props = {
  comment: CommentType;
  onLike: (commentId: string) => void;
  onEdit: (commentId: string, editContent: string) => void;
};
export const Comment = ({ comment, onLike, onEdit }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [user, setUser] = useState<UserType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEdit(true);
    setEditedContent(comment.content);
  };
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComments/${comment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEdit(false);
        onEdit(comment._id, editedContent);
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <div className={'flex p-4 border-b dark:border-gray-600 text-sm'}>
      {user && (
        <div className={'flex-shrink-0 mr-3'}>
          <img
            className={'w-10 h-10 rounded-full bg-gray-500 '}
            src={user.profilePicture}
            alt={user.username}
          />
        </div>
      )}
      <div className={'flex-1'}>
        <div className={'flex items-center mb-1'}>
          <span className={'font-bold mr-1 text-xs truncate dark:text-teal-100'}>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className={'text-gray-500 text-xs'}>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEdit ? (
          <>
            {' '}
            <Textarea
              className={'mb-2'}
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
              rows={3}
            ></Textarea>
            <div className={'flex justify-end gap-2 text-xs'}>
              <Button
                size={'sm'}
                type={'button'}
                className={'hover:animate-pulse transition'}
                gradientDuoTone={'purpleToBlue'}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                size={'sm'}
                type={'button'}
                className={'hover:animate-pulse transition'}
                gradientDuoTone={'greenToBlue'}
                outline
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className={'text-gray-500 mb-2'}>{comment.content}</p>
            <div
              className={
                'flex gap-3 items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit'
              }
            >
              <button
                type={'button'}
                onClick={() => onLike(comment._id)}
                className={` hover:text-cyan-600 text-blue-300 ${currentUser && comment.likes.includes(currentUser._id) && '!text-emerald-500'}`}
              >
                <FaThumbsUp className={'text-sm'} />
              </button>
              <p className={'text-gray-400'}>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    onClick={handleEdit}
                    type={'button'}
                    className={'text-gray-400 hover:text-cyan-600 hover:underline'}
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
