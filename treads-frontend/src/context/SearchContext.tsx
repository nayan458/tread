import axiosInstance from '@api/AxiosInsctance';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResultType, searchTermType } from 'src/types';
import Cookies from 'js-cookie';

interface SearchContextType {
  searchTerm: searchTermType;
  setSearchTerm: React.Dispatch<React.SetStateAction<searchTermType>>;
  searchResult: SearchResultType | null;
  loading: boolean;
  handleSearch: () => Promise<void>;
  handleSearchByParameter: (gene: string, searchID: string) => Promise<void>;
  saveToCookies: () => void;
  searchCommonGenes: string[];
  setSearchCommonGenes: React.Dispatch<React.SetStateAction<string[]>>;
  handleSetSearchCommonGenes: (disorder: string) => void;
  handleSearchCommonGenes: () => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const COOKIE_EXPIRY = 7;
const SEARCH_TERM_COOKIE = 'searchTerm';
const SEARCH_RESULT_COOKIE = 'searchResult';
const COMMON_GENES_COOKIE = 'searchCommonGenes';

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<searchTermType>({
    gene: '',
    search_id: '',
  });
  const [searchResult, setSearchResult] = useState<SearchResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchCommonGenes, setSearchCommonGenes] = useState<string[]>([]);
  
  // Refs to track if data was loaded from cookies
  const initialLoadDone = useRef(false);

  // Load data from cookies ONLY on initial render
  useEffect(() => {
    if (initialLoadDone.current) return;
    
    const savedSearchTerm = Cookies.get(SEARCH_TERM_COOKIE);
    // Only load result if we're not going to restore it immediately
    const savedSearchResult = Cookies.get(SEARCH_RESULT_COOKIE);
    const savedCommonGenes = Cookies.get(COMMON_GENES_COOKIE);
    
    if (savedSearchTerm) {
      try {
        setSearchTerm(JSON.parse(savedSearchTerm));
      } catch (e) {
        console.error("Error parsing search term cookie:", e);
      }
    }
    
    // Only load the result from cookies if we're not on the result page
    // This prevents showing old data when we're expecting new data
    if (savedSearchResult && window.location.pathname !== '/result') {
      try {
        setSearchResult(JSON.parse(savedSearchResult));
      } catch (e) {
        console.error("Error parsing search result cookie:", e);
      }
    }
    
    if (savedCommonGenes) {
      try {
        setSearchCommonGenes(JSON.parse(savedCommonGenes));
      } catch (e) {
        console.error("Error parsing common genes cookie:", e);
      }
    }
    
    initialLoadDone.current = true;
  }, []);

  // Save data to cookies manually
  const saveToCookies = () => {
    if (searchTerm.gene || searchTerm.search_id) {
      Cookies.set(SEARCH_TERM_COOKIE, JSON.stringify(searchTerm), { expires: COOKIE_EXPIRY });
    }
    
    if (searchResult) {
      Cookies.set(SEARCH_RESULT_COOKIE, JSON.stringify(searchResult), { expires: COOKIE_EXPIRY });
    }
    
    if (searchCommonGenes.length > 0) {
      Cookies.set(COMMON_GENES_COOKIE, JSON.stringify(searchCommonGenes), { expires: COOKIE_EXPIRY });
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.gene.trim() || !searchTerm.search_id.trim()) return;

    saveToCookies();
    navigate('/result');

    setLoading(true);
    try {
      // Clear previous result
      setSearchResult(null);
      
      const formData = new FormData();
      formData.append('gene', searchTerm.gene);
      formData.append('search_id', searchTerm.search_id);
      const response = await axiosInstance.post('/result', formData);
      const data = await response.data;
      setSearchResult(data);
      // Save cookies after successful response
      Cookies.set(SEARCH_TERM_COOKIE, JSON.stringify(searchTerm), { expires: COOKIE_EXPIRY });
      Cookies.set(SEARCH_RESULT_COOKIE, JSON.stringify(data), { expires: COOKIE_EXPIRY });
    } catch (error) {
      console.error('Error fetching gene data:', error);
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByParameter = async (gene: string, searchID: string) => {
    if (!gene.trim() || !searchID.trim()) return Promise.resolve();

    // Update the searchTerm state
    const newSearchTerm = {
      gene: gene,
      search_id: searchID
    };
    
    setSearchTerm(newSearchTerm);

    // Don't navigate if we're already on the result page
    if (window.location.pathname !== '/result') {
      navigate('/result');
    }

    setLoading(true);
    
    // Clear previous result to prevent showing old data
    setSearchResult(null);
    
    try {
      const formData = new FormData();
      formData.append('gene', gene);
      formData.append('search_id', searchID);
      const response = await axiosInstance.post('/result', formData);
      const data = await response.data;
      setSearchResult(data);
      // Save cookies after successful response
      Cookies.set(SEARCH_TERM_COOKIE, JSON.stringify(newSearchTerm), { expires: COOKIE_EXPIRY });
      Cookies.set(SEARCH_RESULT_COOKIE, JSON.stringify(data), { expires: COOKIE_EXPIRY });
    } catch (error) {
      console.error('Error fetching gene data:', error);
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSetSearchCommonGenes = (disorder: string) => {
    if (!disorder.trim()) return;

    setSearchCommonGenes((prev) => {
      const newValue = prev.includes(disorder)
        ? prev.filter((item) => item !== disorder)
        : [...prev, disorder];
      
      // Save to cookie manually when the state changes
      Cookies.set(COMMON_GENES_COOKIE, JSON.stringify(newValue), { expires: COOKIE_EXPIRY });
      
      return newValue;
    });
  };

  const handleSearchCommonGenes = async () => {
    if (!searchCommonGenes.length) return Promise.resolve();

    navigate('/result');
    
    setLoading(true);
    // Clear previous result to prevent showing old data
    setSearchResult(null);
    
    try {
      const response = await axiosInstance.post('/common_genes', {
        favorite: searchCommonGenes,
      });
      const data = await response.data;
      setSearchResult(data);
      // Save cookies after successful response
      Cookies.set(SEARCH_RESULT_COOKIE, JSON.stringify(data), { expires: COOKIE_EXPIRY });
    } catch (error) {
      console.error('Error fetching gene data:', error);
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResult,
        loading,
        handleSearch,
        handleSearchByParameter,          
        saveToCookies,
        searchCommonGenes,
        setSearchCommonGenes,
        handleSetSearchCommonGenes,
        handleSearchCommonGenes
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error('useSearch must be used within a SearchContext');
  return context;
};