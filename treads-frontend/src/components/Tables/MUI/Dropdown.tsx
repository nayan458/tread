import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function Dropdown() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Download
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Excel</MenuItem>
            <MenuItem onClick={popupState.close}>Pdf</MenuItem>
            <MenuItem onClick={popupState.close}>CSV</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// // Sample data - replace with your actual data import
// const AEDJsonData = {
//   data: [
//     {
//       drugBankID: 'DB05821',
//       AEDName: 'DP-VPA',
//       targetGene: 'Not Available',
//       status: 'Investigational',
//       link: 'https://go.drugbank.com/drugs/DB05821',
//     },
//     {
//       drugBankID: 'DB00593',
//       AEDName: 'Ethosuximide',
//       targetGene: 'CACNA1G',
//       status: 'Approved',
//       link: 'https://go.drugbank.com/drugs/DB00593',
//     },
//   ]
// };

// export default function Dropdown() {
//   // Function to export data as Excel
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(AEDJsonData.data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "AED Data");
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     saveAs(data, 'AED_Data.xlsx');
//   };

//   // Function to export data as CSV
//   const exportToCSV = () => {
//     const worksheet = XLSX.utils.json_to_sheet(AEDJsonData.data);
//     const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
//     const data = new Blob([csvOutput], { type: 'text/csv;charset=utf-8' });
//     saveAs(data, 'AED_Data.csv');
//   };

//   // Function to export data as PDF
//   const exportToPDF = () => {
//     const doc = new jsPDF();

//     // Add title
//     doc.text('AED Data Report', 14, 16);

//     // Define the table columns and rows
//     const columns = Object.keys(AEDJsonData.data[0]).map(key => ({
//       header: key.charAt(0).toUpperCase() + key.slice(1),
//       dataKey: key
//     }));

//     // Create the table
//     doc.autoTable({
//       startY: 20,
//       head: [columns.map(col => col.header)],
//       body: AEDJsonData.data.map(row => columns.map(col => row[col.dataKey])),
//     });

//     // Save the PDF
//     doc.save('AED_Data.pdf');
//   };

//   return (
//     <PopupState variant="popover" popupId="demo-popup-menu">
//       {(popupState) => (
//         <React.Fragment>
//           <Button variant="contained" {...bindTrigger(popupState)}>
//             Download
//           </Button>
//           <Menu {...bindMenu(popupState)}>
//             <MenuItem onClick={() => { exportToExcel(); popupState.close(); }}>Excel</MenuItem>
//             <MenuItem onClick={() => { exportToPDF(); popupState.close(); }}>PDF</MenuItem>
//             <MenuItem onClick={() => { exportToCSV(); popupState.close(); }}>CSV</MenuItem>
//           </Menu>
//         </React.Fragment>
//       )}
//     </PopupState>
//   );
// }
