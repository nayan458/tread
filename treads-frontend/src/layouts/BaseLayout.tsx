import Header from '@components/Header/Header';
import Navbar from '@components/Navbar/Navbar';
import RightSidebar from '@components/RightSidebar/RightSidebar';
import React, { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CircularProgess from '@components/Spinner/CircularProgess';

const BaseLayout: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Fixed Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden pt-4">
        {/* Mobile Navbar Toggle */}
        <button
          className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-gray-700 text-white rounded"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        >
          {isNavbarOpen ? <CloseIcon /> : <MenuRoundedIcon />}
        </button>

        {/* Left Sidebar (Navigation) */}
        <div
          className={`absolute lg:relative z-40 lg:w-64 bg-background-secondary h-full overflow-y-auto transition-transform duration-300 ${
            isNavbarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <Navbar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-background-tertiary scrollbar-hide px-4 sm:px-6 lg:px-8 ">
          <div className="text-text-secondary py-8 sm:py-12">
            <Suspense fallback={<CircularProgess />}>
              <Outlet />
            </Suspense>
          </div>
        </div>

        {/* Right Sidebar - Hidden on smaller screens */}
        <div className="hidden xl:block w-72 overflow-y-auto bg-background-tertiary scrollbar-hide">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
