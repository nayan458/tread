import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <NavLink to="/home">Go Back Home</NavLink>
      </div>
    </>
  );
};

export default PageNotFound;
