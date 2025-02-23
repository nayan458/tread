import React from 'react';
import { NavLink } from 'react-router-dom';

interface LinksProps {
  to: string;
  label: string;
  dropdown?: boolean;
}

const LeftNavLink: React.FC<LinksProps> = ({ to, label, dropdown }) => {
  return (<>
    <NavLink to={to} style={
        ({isActive}) => ({
          color: isActive ? '#D49B17' : 'black',
          fontWeight: dropdown? isActive ? '600' : '' : '600',
        })
      }
      className={dropdown? 'font-light' : ''}
      >
      {label}
      </NavLink>
  </>
  );
};

export default LeftNavLink;
