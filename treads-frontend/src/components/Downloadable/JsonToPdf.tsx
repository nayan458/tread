import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RowType } from 'src/types';

interface JsonToPdfProps {
  data: RowType;
}

const JsonToPdf: React.FC<JsonToPdfProps> = ({ data }) => {
  const exportToPdf = () => {
    if (!Array.isArray(data) || data.length === 0) {
      alert('No data available');
      return;
    }

    const doc = new jsPDF();
    doc.text('Exported JSON Data', 14, 10);

    // Extract dynamic column headers from the first row
    const tableColumns = Object.keys(data[0]) as (keyof RowType[number])[];

    // Convert data into an array of arrays for autoTable
    const tableRows = data.map((row) =>
      tableColumns.map(
        (col) => (Array.isArray(row[col]) ? row[col].join(', ') : row[col]) // Convert arrays to comma-separated strings
      )
    );

    autoTable(doc, {
      head: [tableColumns], // Dynamic headers
      body: tableRows,
      startY: 20,
    });

    doc.save('ExportedData.pdf');
  };

  return (
    <div onClick={exportToPdf} className="w-[100%]">
      Download PDF
    </div>
  );
};

export default JsonToPdf;
