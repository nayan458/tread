import React from 'react';
import CdacLogo from '@assets/CdacLogo.jpeg';
import TreadsLogo from '@assets/TreadsLogo.png';
import Search from '@components/Search/Search';

const Header: React.FC = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-background-primary dark:bg-gray-900 shadow-md py-3 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={CdacLogo} alt="Company 1 Logo" className="h-10 md:h-12" />
            <img
              src={TreadsLogo}
              alt="Company 2 Logo"
              className="h-10 md:h-12"
            />
          </div>

          <div className="flex items-center space-x-4 hidden md:block">
            <Search />
          </div>
        </div>
      </header>
      <header className="w-full py-3">
        <div className="container mx-auto px-6 flex justify-between items-center"></div>
      </header>
    </>
  );
};

export default Header;
