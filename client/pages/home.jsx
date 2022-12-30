import React from 'react';
import NewUserName from '../components/username';
import SelectRoom from '../components/room-select';

export default function Home(props) {
  return (
    <div className='container-fluid' >
      <div className='mt-5 pt-5'>
        <div className='mt-5'>
          <div className='mt-5 pt-5 text-center'>
            <div className='row welcome wht-txt'>
              <p>Welcome to FuzeChat!</p>
            </div>
            <div>
              <NewUserName />
              <SelectRoom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
