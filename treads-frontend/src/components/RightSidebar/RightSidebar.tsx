// components/RightSidebar/RightSidebar.tsx
import React from 'react';
import TableOfContents from './TableOfContents';

const RightSidebar: React.FC = () => {
  return (
    <div className="p-4">
      <TableOfContents />
    </div>
  );
};

export default RightSidebar;
