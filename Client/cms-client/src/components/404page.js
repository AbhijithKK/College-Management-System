import React from 'react';
import pic from '../assets/404.jpg';

const Fpage = () => {
  return (
    <div
      style={{
        backgroundColor:'red',
        backgroundImage: `url(${pic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
        height: '100vh',
      }}
    ></div>
  );
};

export default Fpage;
