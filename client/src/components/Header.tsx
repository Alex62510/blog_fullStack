import React from 'react';
import { Button, Navbar } from 'flowbite-react';

export const Header = () => {
  return (
    <Navbar className={'border-b-2'}>
      <Button gradientDuoTone="greenToBlue">Click me</Button>
    </Navbar>
  );
};
