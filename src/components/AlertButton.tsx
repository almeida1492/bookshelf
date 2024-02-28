import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AlertButton() {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="alert-title">Alert Messages</h2>
      <p>Click on the "x" symbol to close the alert message.</p>
      {/* &times si chiamano Entities*/}
      <div className='alert'>
        <span className='closebtn' onClick={() => navigate('/')}>
          &times;</span><span>Ops... Something went wrong!</span>
        
      </div>
    </>
  );
}
