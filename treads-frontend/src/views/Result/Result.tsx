import Graphs from "@components/research/Graphs";
import Section from "@components/Sections/Section";
import Load from "@components/Spinner/RiseLoader";
import StickyHeaderTable from "@components/Tables/StickyHeader/StickyHeaderTable";
import { useSearch } from "@context/SearchContext";
import { Card, CardContent, CardHeader } from "@mui/material";
import Grid from '@mui/material/Grid2';
import React from "react";

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
    return <div className="p-4">No results to display</div>;
  }

  return (
    <>
      {
        searchResult.gene_id && <Section topic={searchResult.gene_id}/>
      }
      {searchResult.table && typeof searchResult.table.Value === "object" && (
        <StickyHeaderTable data={searchResult.table.Value} />
      )}
      
      {
        searchResult.graphs && Object.entries(searchResult.graphs).map(([key, value]) => {
            return(
              <Grid size={{ xs: 12, md: 6 }} key={key}>
                <Card>
                  <CardHeader/>
                  <CardContent>
                    {value.data && <Graphs data={value.data}/>}
                  </CardContent>
                </Card>
              </Grid>
            )
            
        })
      }

    </>
  );
};

export default Result;