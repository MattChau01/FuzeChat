import React from 'react';
// import NewUserName from '../components/username';
import SelectRoom from '../components/room-select';

export default function Home(props) {
  return (
    <div className='container-fluid' >
      <div className='mt-5 pt-5'>
        <div className='mt-5'>
          <div className='mt-5 pt-5 d-flex align-items-center justify-content-center text-center'>
            <div>
              <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
              {/* <NewUserName /> */}
              <SelectRoom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
