import React from 'react';
import AIIMS_Logo from '@assets/img/AIIMS_Delhi_logo.png';
import NIAS_Logo from '@assets/img/NIAS_logo.png';
import University_Logo from '@assets/img/University_of_Delhi_logo.png';
import IITDelhi_Logo from '@assets/img/IIT_Delhi_logo.png';
import { Link } from '@mui/material';

const logos = [AIIMS_Logo, NIAS_Logo, University_Logo, IITDelhi_Logo];

const links = [
  'https://www.aiims.edu/index.php/en',
  'https://www.nias.res.in/',
  'https://www.du.ac.in/',
  'https://home.iitd.ac.in/',
];

const Footer: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-white border-t-3 border-amber-500 pt-8 pb-6 px-12 shadow-md shadow-black/5 mt-8">
      <div className="flex flex-wrap justify-between max-w-6xl mx-auto">
        <div className="flex-1 min-w-[300px] pr-8 mb-8 md:mb-0">
          <div className="text-lg font-semibold mb-4 text-gray-800">
            Project:{' '}
            <span className="text-amber-500 font-bold">
              Advanced Epilepsy Research (AER)
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Funded by: Office of the Principal Scientific Adviser to the
            Government of India
          </div>
          <div className="text-sm text-gray-600 mb-3">Our Collaborators:</div>
          <div className="flex flex-wrap gap-5 items-center mt-4">
            {[
              'AIIMS Logo',
              'NIAS Logo',
              'Delhi University Logo',
              'IIT Delhi Logo',
            ].map((logo, index) => (
              <a
                href={links[index]}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  key={index}
                  src={logos[index]}
                  alt={logo}
                  className="h-14 filter grayscale-30 transition-all duration-300 hover:filter-none hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className="text-lg font-semibold mb-4 text-gray-800">
            Contact
          </div>
          <div className="flex items-center mb-2 text-gray-600 text-sm">
            <div className="text-amber-500 mr-2 w-6 text-center">✉</div>
            <Link href="mailto:aer-cdackp@cdac.in">
              <div>Mail</div>
            </Link>
          </div>

          <div className="flex items-center mb-2 text-gray-600 text-sm">
            <div className="text-amber-500 mr-2 w-6 text-center">📞</div>
            <div>+91 080-2509-3412</div>
          </div>
          <div className="flex items-center mb-2 text-gray-600 text-sm">
            <div className="text-amber-500 mr-2 w-6 text-center">📍</div>
            <div>CDAC, Knowledge Park, Old Madras Road, Bangalore 560038.</div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pt-4 border-t border-gray-200 text-gray-400 text-xs">
        Copyright © 2019 C-DAC. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
