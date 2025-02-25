// Search Component
import { useSearch } from "@context/SearchContext";
import { Button, Input } from "@mui/material";
import { useState } from "react";
import { searchTermType } from "src/types";

const SearchComponent: React.FC = () => {
  const { setSearchTerm, handleSearch, loading } = useSearch();

  const [data, setData] = useState<searchTermType>({
      'gene': '',
      'search_id': ''
    });

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

  return (
    <div className="flex gap-2 p-4">
      <Input
        type="text"
        value={data.gene}
        name="gene"
        onChange={handleChange}
        placeholder="Enter gene name..."
        className="max-w-xs"
      />
      <Input
        type="text"
        value={data.search_id}
        name="search_id"
        onChange={handleChange}
        placeholder="Enter search_id name..."
        className="max-w-xs"
      />

      <Button
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </div>
  );
};

export default SearchComponent