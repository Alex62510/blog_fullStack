import React from 'react';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from './Profile';
import { toggleTheme } from '../redux/theme/themeSlice';

export const Header = () => {
  const path = useLocation().pathname;
  const dispatch: AppDispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <Navbar className={'border-b-2'}>
      <Link
        to={'/'}
        className={
          'self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white hover:opacity-80 transition'
        }
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
      <form className={'flex'}>
        <TextInput
          type={'text'}
          placeholder={'Search...'}
          rightIcon={AiOutlineSearch}
          className={'hidden lg:inline'}
        />
      </form>
      <Button className={'w-12 h-10  lg:hidden'} color="green" pill>
        <AiOutlineSearch />
      </Button>
      <div className={'flex gap-2 md:order-2'}>
        <Button
          className={'w-12 h-10 hidden sm:inline'}
          color="green"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <Profile />
        ) : (
          <Link to={'/sign-in'}>
            <Button gradientDuoTone={'greenToBlue'} outline className={'transition'}>
              Sign in
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active={path === '/'}
          as={'div'}
          className={'hover:scale-105 transition'}
        >
          <Link to={'/'}>Home</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === '/about'}
          as={'div'}
          className={'hover:scale-105 transition'}
        >
          <Link to={'/about'}>About</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === '/projects'}
          as={'div'}
          className={'hover:scale-105 transition'}
        >
          <Link to={'/projects'}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
