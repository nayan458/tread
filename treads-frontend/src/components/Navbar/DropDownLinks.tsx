import React, { useState } from 'react';
import LeftNavLink from './LeftNavLink';
import ChevronDown from '@components/icons/ChevronDown';

interface URLItem {
  label: string;
  to?: string;
  dropDown?: boolean;
  urls?: URLItem[];
}

interface DropDownLinksProps {
  label: string;
  urls: URLItem[];
  dropdown?: boolean;
}

const DropDownLinks: React.FC<DropDownLinksProps> = ({ label, urls, dropdown }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className={`py-2 flex justify-between items-center gap-3 ${ dropdown? 'font-medium text-slate-600' : 'font-semibold' }`}
      >
        {label}
        <span className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}>
            <ChevronDown/>
        </span>
      </button>

      {isOpen && (
        <div className="ml-4 flex flex-col mt-1 space-y-1">
          {urls.map((url, index) => {
            if (url.dropDown) {
              return <DropDownLinks key={index} label={url.label} urls={url.urls!} dropdown={true}/>;
            } else if (url.to) {
            return (
              <LeftNavLink key={index} to={url.to} label={url.label} dropdown={true}/>
            );}
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default DropDownLinks;
