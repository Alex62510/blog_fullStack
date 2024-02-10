import React from 'react';
import { Button, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Navbar className={'border-b-2'}>
      <Link
        to={'/'}
        className={
          'self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white '
        }
      >
        <span
          className={
            'px-3 py-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-lime-500 rounded-lg text-white'
          }
        >
          Alex's
        </span>
        Blog
      </Link>
    </Navbar>
  );
};
