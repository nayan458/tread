// components/RightSidebar/TableOfContents.tsx
import React from 'react';
import { useTOC } from '@context/TOCContext';

const TableOfContents: React.FC = () => {
  const { tocItems, activeId } = useTOC();

//   HANDLE CLICK 1
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    console.log("Clicked ID:", id);
  };

  return (
    <nav className="p-4 pt-12">
      <ul className="space-y-2">
        {tocItems.map((item) => (
          <li
          key={item.id}
          style={{ paddingLeft: `${item.level * 12}px` }}
          className={`cursor-pointer hover:text-red-500 transition-colors ${
            activeId === item.id ? 'text-red-500 font-medium' : 'text-text-secondary'
          }`}
          onClick={() => handleClick(item.id)}
        >
          {item.title}
        </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;