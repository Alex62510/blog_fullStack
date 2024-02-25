import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, TextInput } from 'flowbite-react';

export const DashProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [imageFile, setImageFile] = useState<null | object>(null);
  const [imageFileUrl, setImageFileUrl] = useState<null | string>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  console.log(imageFile);
  console.log(imageFileUrl);
  return (
    <div className={'max-w-lg mx-auto p-3 w-full'}>
      <h1 className={'my-7 text-center font-semibold text-3xl'}>Profile</h1>
      {currentUser && (
        <>
          <form className={'flex flex-col gap-4'}>
            <input type={'file'} accept={'image/*'} onChange={handleChange} />
            <div
              className={
                'w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
              }
            >
              <img
                src={currentUser.profilePicture}
                alt="user"
                className={
                  'rounded-full w-full h-full border-8 object-cover border-[lightgray]'
                }
              />
            </div>
            <TextInput
              type={'text'}
              id={'username'}
              placeholder={'Username'}
              defaultValue={currentUser.username}
            />
            <TextInput
              type={'text'}
              id={'email'}
              placeholder={'Email'}
              defaultValue={currentUser.email}
            />
            <TextInput type={'password'} id={'password'} placeholder={'password'} />
            <Button
              type={'submit'}
              gradientDuoTone={'greenToBlue'}
              className={''}
              outline
            >
              Update
            </Button>
          </form>
          <div className={'text-red-700 flex justify-between mt-5 mb-14'}>
            <span
              className={'cursor-pointer hover:scale-105 transition hover:animate-pulse'}
            >
              Delete Account
            </span>
            <span
              className={'cursor-pointer hover:scale-105 transition hover:animate-pulse'}
            >
              Sign Out
            </span>
          </div>
        </>
      )}
    </div>
  );
};
