import React from "react";
import CdacLogo from "@assets/CdacLogo.jpeg";
import TreadsLogo from "@assets/TreadsLogo.png";

const Header: React.FC = () => {
  return (<>
    <header className="fixed top-0 left-0 w-full bg-background-primary dark:bg-gray-900 shadow-md py-3 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Left Section: First Company Logo */}
        <div className="flex items-center space-x-4">
          <img
            src={CdacLogo}
            alt="Company 1 Logo"
            className="h-10 md:h-12"
          />
          <img
            src={TreadsLogo}
            alt="Company 2 Logo"
            className="h-10 md:h-12"
          />
        </div>
      </div>
    </header>
    <header className="w-full py-3">
      <div className="container mx-auto px-6 flex justify-between items-center">
      </div>
    </header>

  </>
  );
};

export default Header;


        {/* <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-700 dark:text-gray-200">
            
          </button>
        </div> */}