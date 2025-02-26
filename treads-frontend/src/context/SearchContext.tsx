import axiosInstance from '@api/AxiosInsctance';
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResultType, searchTermType } from 'src/types';


interface SearchContextType {
    searchTerm: searchTermType,
    setSearchTerm: React.Dispatch<React.SetStateAction<searchTermType>>,
    searchResult: SearchResultType | null,
    loading: boolean,
    handleSearch:() => Promise<void>;
    handleSearchByParameter:(gene: string, searchID: string) => Promise<void>
}

// Create Context
const SearchContext = createContext<SearchContextType | undefined>(undefined);


// Context Provider Component
export const SearchProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState({
    'gene': '',
    'search_id': ''
  });
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.gene.trim() || !searchTerm.search_id.trim()) return;
    
    navigate('/result')

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('gene',searchTerm.gene)
      formData.append('search_id',searchTerm.search_id)
      const response = await axiosInstance.post('/result', formData);
      const data = await response.data;
      setSearchResult(data);
    } catch (error) {
      console.error('Error fetching gene data:', error);
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByParameter = async (gene: string, searchID: string) => {


    if (!gene.trim() || !searchID.trim()) return;
    
    navigate('/result')

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('gene',gene)
      formData.append('search_id',searchID)
      const response = await axiosInstance.post('/result', formData);
      const data = await response.data;
      setSearchResult(data);
    } catch (error) {
      console.error('Error fetching gene data:', error);
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider value={{
          searchTerm,
          setSearchTerm,
          searchResult,
          loading,
          handleSearch,
          handleSearchByParameter
        }}>
      {children}
    </SearchContext.Provider>
  );

};

export const useSearch =()=>{
  const context = useContext(SearchContext);
  if(!context)
          throw new Error('useSearch must be used within a SearchContext')
  return context;
}