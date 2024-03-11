import React from 'react';

export const Spiner = () => {
  return (
    <div
      className="loader"
      style={{
        background: 'conic-gradient(white, violet)',
        position: 'relative',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        animation: 'rotation 2s linear infinite',
      }}
    >
      <div
        className="loader-before"
        style={{
          content: '',
          position: 'absolute',
          width: '80px',
          height: '80px',
          backgroundColor: 'white',
          borderRadius: '50%',
          top: '10%',
          left: '10%',
        }}
      ></div>
      <div
        className="loader-after"
        style={{
          content: '',
          position: 'absolute',
          width: '10px',
          height: '10px',
          backgroundColor: 'violet',
          borderRadius: '50%',
          right: '45%',
        }}
      ></div>
    </div>
  );
};
