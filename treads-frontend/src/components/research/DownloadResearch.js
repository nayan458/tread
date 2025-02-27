import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const DownloadComponent = ({ jsonData }) => {
  const [downloadType, setDownloadType] = useState('excel');

  const downloadAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const downloadAsCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    
    // Create table from JSON data
    const columns = Object.keys(jsonData[0]);
    const rows = jsonData.map(item => Object.values(item));
    
    doc.autoTable({
      head: [columns],
      body: rows,
    });
    
    doc.save('data.pdf');
  };

  const handleDownload = () => {
    switch(downloadType) {
      case 'excel':
        downloadAsExcel();
        break;
      case 'csv':
        downloadAsCSV();
        break;
      case 'pdf':
        downloadAsPDF();
        break;
      default:
        downloadAsExcel();
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2">Select format:</label>
        <select 
          value={downloadType} 
          onChange={(e) => setDownloadType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
          <option value="pdf">PDF</option>
        </select>
      </div>
      
      <button 
        onClick={handleDownload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download
      </button>
    </div>
  );
};

export default DownloadComponent;