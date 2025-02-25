import { useSearch } from "@context/SearchContext";
import { Button, Input, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { searchTermType } from "src/types";
import FilterListIcon from "@mui/icons-material/FilterList";

const Search: React.FC = () => {
  const { setSearchTerm, handleSearch, loading } = useSearch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [data, setData] = useState<searchTermType>({
    'gene': '',
    'search_id': 'GeneName' // Default value
  });

  // Get placeholder text based on selected search_id
  const getPlaceholder = () => {
    switch(data.search_id) {
      case 'UniprotID':
        return 'Enter a UniprotID...';
      case 'EnsemblID':
        return 'Enter an EnsemblID...';
      case 'Sequence':
        return 'Enter a sequence...';
      case 'GeneName':
        return 'Enter a gene name...';
      default:
        return 'Enter search term...';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value
      };

      setSearchTerm(updatedData);
      return updatedData;
    });
  };

  // Open filter menu
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close filter menu
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Handle filter selection
  const handleFilterSelect = (value: string) => {
    setData((prevData) => {
      const updatedData = {
        ...prevData,
        'search_id': value
      };

      setSearchTerm(updatedData);
      return updatedData;
    });
    handleFilterClose();
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-grow max-w-md">
        <div className="flex items-center border rounded-md overflow-hidden">
          <Tooltip title={`Current filter: ${data.search_id}`}>
            <IconButton 
              onClick={handleFilterClick}
              size="small"
              className="ml-1"
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          
          <Input
            type="text"
            value={data.gene}
            name="gene"
            onChange={handleChange}
            placeholder={getPlaceholder()}
            className="flex-grow border-none px-2"
            disableUnderline
            fullWidth
          />
          
          <Button
            onClick={handleSearch}
            disabled={loading}
            variant="contained"
            color="secondary"
            className="rounded-none h-full"
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={() => handleFilterSelect('UniprotID')}>
          UniprotID
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect('GeneName')}>
          GeneName
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect('EnsemblID')}>
          EnsemblID
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect('Sequence')}>
          Sequence
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Search;