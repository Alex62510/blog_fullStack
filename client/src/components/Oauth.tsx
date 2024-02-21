import React from 'react';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';

export const Oauth = () => {
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button
      type={'button'}
      outline
      gradientDuoTone={'pinkToOrange'}
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className={'w-6 h-6 mr-2'} />
      Continue with Google
    </Button>
  );
};
