import React from 'react';
import NewUserName from '../components/username';

export default function Home(props) {
  return (
    <div className='container-fluid main' >
      <div className='mt-5 pt-5'>
        <div className='mt-5 pt-5 text-center'>
          <div className='row welcome wht-txt'>
            <p>Welcome to FuzeChat!</p>
          </div>
          <div>
            <NewUserName />
          </div>
        </div>
      </div>
    </div>
  );
}
