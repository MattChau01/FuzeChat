import React from 'react';

export default function NewUserName(props) {
  return (
    <form>
      <div className='mt-5'>
        <label htmlFor='username'>
          <input name='username' type='text' value='Type a username here' className='user-input' />
        </label>
      </div>
      <div className='mt-5'>
        <button type='submit' className='next'>NEXT</button>
      </div>
    </form>
  );
}
