import Graphs from '@components/Charts/Graphs';
import Section from '@components/Sections/Section';
import Load from '@components/Spinner/RiseLoader';
import StickyHeaderTable from '@components/Tables/StickyHeader/StickyHeaderTable';
import { useSearch } from '@context/SearchContext';
import { Card, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useRef, useState } from 'react';
import LiteratureAssociated from './LiteratureAssociated';
import RelatedAED from './RelatedAED';
import Cookies from 'js-cookie';

const Result: React.FC = () => {
  const { searchResult, loading, handleSearchByParameter } = useSearch();
  const hasAttemptedRestore = useRef(false);
  // Add state to track if we're currently restoring from cookies
  const [isRestoring, setIsRestoring] = useState(false);

  // Only run this effect once to prevent infinite loops
  useEffect(() => {
    // Skip if already loading or if we have search results
    if (loading || searchResult || hasAttemptedRestore.current) {
      return;
    }
    
    hasAttemptedRestore.current = true;
    
    const searchTermCookie = Cookies.get('searchTerm');
    
    if (searchTermCookie) {
      try {
        const parsedTerm = JSON.parse(searchTermCookie);
        if (parsedTerm.gene && parsedTerm.search_id) {
          console.log('Restoring search from cookies:', parsedTerm);
          setIsRestoring(true);
          // Clear previous cookies to prevent old data display
          Cookies.remove('searchResult');
          handleSearchByParameter(parsedTerm.gene, parsedTerm.search_id)
            .finally(() => {
              setIsRestoring(false);
            });
        }
      } catch (e) {
        console.error('Error parsing search term cookie:', e);
        setIsRestoring(false);
      }
    }
  }, [loading, searchResult]); // Dependencies that will prevent this from running if we already have results

  // Show loader if either global loading state is true OR we're restoring from cookies
  if (loading || isRestoring) {
    return (
      <div className="w-[100%] min-h-screen flex justify-center items-center">
        <Load />
      </div>
    );
  }

  if (!searchResult || Object.keys(searchResult).length === 0) {
    return <div className="p-4">No results Found </div>;
  }

  return (
    <>
      {searchResult.gene_id && <Section topic={searchResult.gene_id} />}

      {searchResult.table && typeof searchResult.table.Value === 'object' && (
        <StickyHeaderTable data={searchResult.table.Value} />
      )}

      <Grid container spacing={3}>
        {searchResult.graphs &&
          Object.entries(searchResult.graphs).map(([key, value]) => {
            return (
              <Grid size={{ xs: 12, md: 6 }} key={key}>
                <Card>
                  <CardHeader />
                  <CardContent>
                    {value.data && (
                      <Graphs
                        data={value.data}
                        xaxis_title={value.layout['xaxis_title']}
                        yaxis_title={value.layout['yaxis_title']}
                        gene={searchResult['gene_id'] || ''}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      <Grid container spacing={3} marginTop={'20px'}>
        {searchResult.articles && (
          <LiteratureAssociated articles={searchResult.articles} />
        )}
        {searchResult.aed_dict && (
          <RelatedAED aed_dict={searchResult.aed_dict} />
        )}
      </Grid>
    </>
  );
};

export default Result;