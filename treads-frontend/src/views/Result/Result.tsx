import Graphs from '@components/Charts/Graphs';
import Section from '@components/Sections/Section';
import Load from '@components/Spinner/RiseLoader';
import StickyHeaderTable from '@components/Tables/StickyHeader/StickyHeaderTable';
import { useSearch } from '@context/SearchContext';
import { Card, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import LiteratureAssociated from './LiteratureAssociated';
import RelatedAED from './RelatedAED';

const Result: React.FC = () => {
  const { searchResult, loading } = useSearch();

  if (loading) {
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

{
  /* <Card className="m-4">
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">Gene Information</h3>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(searchResult, null, 2)}
        </pre>
      </CardContent>
    </Card> */
}
