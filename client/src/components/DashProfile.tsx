import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Alert, Button, TextInput } from 'flowbite-react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const DashProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageFileUrl, setImageFileUrl] = useState<null | string>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState<boolean | string>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage(imageFile);
    }
  }, [imageFile]);

  const uploadImage = async (imageFile: File) => {
    setImageError(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(+progress.toFixed(0));
      },
      error => {
        setImageError('Could not upload image (File must be less 2MB)');
        console.log(error);
        setImagePercent(0);
        setImageFileUrl(null);
        setImageFile(undefined);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>
          setImageFileUrl(downloadURL),
        );
      },
    );
  };

  return (
    <div className={'max-w-lg mx-auto p-3 w-full'}>
      <h1 className={'my-7 text-center font-semibold text-3xl'}>Profile</h1>
      {currentUser && (
        <>
          <form className={'flex flex-col gap-4'}>
            <input
              type={'file'}
              ref={filePickerRef}
              hidden
              accept={'image/*'}
              onChange={handleImageChange}
            />
            <div
              onClick={() => filePickerRef.current?.click()}
              className={
                'relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
              }
            >
              {imagePercent > 0 && (
                <CircularProgressbar
                  value={imagePercent || 0}
                  text={`${imagePercent}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                    path: { stroke: `rgba(62,152,199,${imagePercent / 100})` },
                  }}
                />
              )}
              <img
                src={imageFileUrl || currentUser.profilePicture}
                alt="user"
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                  imagePercent && imagePercent < 100 && 'opacity-60'
                }`}
              />
            </div>
            {imageError && <Alert color={'failure'}>{imageError}</Alert>}
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
