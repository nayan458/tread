import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import React, { useState } from 'react';

const CommonGeneSearch: React.FC = () => {
  
    
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open filter menu
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close filter menu
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Handle filter selection
  const handleFilterSelect = () => {
    handleFilterClose();
  };

  
 const favorite = ["MTLE","MTLE-HS","FCD","HS","DS","CAE","JAE","JME","EGTCS"]

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-grow max-w-md">
          <Tooltip title={`Current filter: ${"tooltip"}`}>
            <IconButton
              onClick={handleFilterClick}
              size="small"
              className="ml-1"
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
      </div>

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
      >
        {favorite.map((item) => (
            <MenuItem key={item} onClick={() => handleFilterSelect()}>
                {item}
            </MenuItem>
        ))}
        <MenuItem><Button>Search</Button></MenuItem>
      </Menu>
    </div>
  );
};

export default CommonGeneSearch;
