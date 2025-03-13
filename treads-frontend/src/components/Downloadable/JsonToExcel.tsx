import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { RowType } from 'src/types';
// import CaeJsonData from '@db/Browse/Disorders/GGE/CAE'; // Import your JSON data

interface JsonToExcelProps {
  json_data: RowType;
}

const JsonToExcel: React.FC<JsonToExcelProps> = ({ json_data }) => {
  const exportToExcel = () => {
    // Extract data from JSON
    const ws = XLSX.utils.json_to_sheet(json_data);

    // Create a new workbook and append the sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convert workbook to a Blob and trigger download
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, 'Data.xlsx');
  };

  return (
    <div onClick={exportToExcel} className="w-[100%]">
      Download Excel
    </div>
  );
};

export default JsonToExcel;
