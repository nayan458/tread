import React from 'react';
import { TextField, MenuItem, ListItemText, Popper } from '@mui/material';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  field: string;
  suggestions?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, field, suggestions = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Handle the opening of the suggestions menu
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the suggestions menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleClose(); // Close menu after selection
  };

  return (
    <div className="relative w-full">
      <TextField
        fullWidth
        label={`Search by ${field}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClick={handleClick} // To show menu when the input is clicked
        variant="outlined"
        size="small"
        className="mb-2"
      />

      {/* Suggestions dropdown using Popper for better positioning */}
      {suggestions.length > 0 && (
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start" sx={{zIndex: 50}}>
          <div
            style={{
              maxHeight: 200,
              overflowY: 'auto',
              width: '100%',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: 4,
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              zIndex: 50,
            }}
          >
            {suggestions.map((suggestion, index) => (
              <MenuItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: 'pointer' }}
              >
                <ListItemText primary={suggestion} />
              </MenuItem>
            ))}
          </div>
        </Popper>
      )}
    </div>
  );
};

export default SearchBar;
