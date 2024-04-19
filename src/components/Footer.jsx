import React from 'react';

const Footer = () => {
  return (
    <footer className='h-40 bg-blue-600'>
      <div className='flex p-5 justify-between'>
        <div className='text-center flex flex-col justify-center mt-5'>
          <h1 className='text-2xl'>Welcome to work manager</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
          </p>
        </div>
        <div className='text-center'>
          <h1>Important links</h1>
          <ul>
            <li>
              <a href='#!'>Facebook</a>
            </li>
            <li>
              <a href='#!'>Linkdien</a>
            </li>
            <li>
              <a href='#!'>Youtube</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
