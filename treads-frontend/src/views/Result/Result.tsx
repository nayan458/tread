import Load from "@components/Spinner/RiseLoader";
import { useSearch } from "@context/SearchContext";
import { Card, CardContent } from "@mui/material";
import React from "react";

const Result: React.FC = () => {
  const { searchResult, loading } = useSearch();

  if (loading) {
    return (
        <div className="w-[100%] min-h-screen  flex justify-center align-middle items-center">
          <Load/>
        </div>
    );
  }

  if (!searchResult) {
    return <div className="p-4">No results to display</div>;
  }

  return (
    <Card className="m-4">
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">Gene Information</h3>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(searchResult, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
};

export default Result