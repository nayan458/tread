import React from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { RowType } from 'src/types';

interface JsonToCsvProps {
  data: RowType;
}

const JsonToCsv: React.FC<JsonToCsvProps> = ({ data }) => {
  const exportToCsv = () => {
    if (!Array.isArray(data) || data.length === 0) {
      alert('No data available');
      return;
    }

    // Extract dynamic column headers from the first row
    const tableColumns = Object.keys(data[0]) as (keyof RowType[number])[];

    // Convert data into an array of objects suitable for CSV
    const csvData = data.map((row) => {
      const rowData: Record<string, string> = {};
      tableColumns.forEach((col) => {
        rowData[col as string] = Array.isArray(row[col])
          ? row[col].join(', ') // Convert arrays to comma-separated strings
          : String(row[col]);
      });
      return rowData;
    });

    // Convert JSON to CSV format
    const csv = Papa.unparse(csvData);

    // Create a Blob and trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'ExportedData.csv');
  };

  return (
    <div onClick={exportToCsv} className="w-[100%]">
      Download CSV
    </div>
  );
};

export default JsonToCsv;
