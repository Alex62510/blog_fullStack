import { Link } from 'react-router-dom';
import React from 'react';
import { Button, Label, TextInput } from 'flowbite-react';

export const SignUp = () => {
  return (
    <div className={'min-h-screen mt-20'}>
      <div
        className={
          'flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'
        }
      >
        <div className={' flex flex-col flex-1 '}>
          <Link
            to={'/'}
            className={'font-bold dark:text-white text-4xl hover:opacity-80 transition'}
          >
            <span
              className={
                'px-3 py-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-lime-500 rounded-lg text-white '
              }
            >
              OrlovAlex's
            </span>
            Blog
          </Link>
          <p className={'text-sm mt-5'}>
            You can sign up with your email and password or with Google!
          </p>
        </div>
        <div className={'flex-1'}>
          <form className={'flex flex-col gap-4'}>
            <div>
              <Label value={'Your username'} />
              <TextInput type={'text'} placeholder={'Username'} id={'username'} />
            </div>
            <div>
              <Label value={'Your email'} />
              <TextInput type={'text'} placeholder={'Email'} id={'email'} />
            </div>
            <div>
              <Label value={'Your password'} />
              <TextInput type={'text'} placeholder={'Password'} id={'password'} />
            </div>
            <Button gradientDuoTone={'greenToBlue'} type={'submit'}>
              Sign up
            </Button>
          </form>
          <div className={'flex gap-2 mt-5 text-sm'}>
            <span className={''}>Have an account?</span>
            <Link to={'/sign-in'} className={'text-blue-500'}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
