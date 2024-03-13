import { Button } from 'flowbite-react';

export const CallToAction = () => {
  return (
    <div>
      <div className={''}>
        <h2>Want learn more about TypeScript?</h2>
        <p>Checkout these resources on my page</p>
        <Button gradientDuoTone={'purpleToBlue'} className={''}>
          <a href="https://github.com/Alex62510" target={'_blank'} rel={}>
            Learn more
          </a>
        </Button>
      </div>
      <div className={'p-7'}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3514yIO_nGw6yag1QJ3nAoRxmkdaA_cV4KA&usqp=CAU"
          alt={'typeScript & vite'}
        />
      </div>
    </div>
  );
};
