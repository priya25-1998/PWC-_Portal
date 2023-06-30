import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Papa from 'papaparse';
// import cibcData from '../Data/cibc_data.csv';
import cibcData from '../Data/cibc_data_april.csv';
const ReportCibic = () => {
  const [rowData, setRowData] = useState([]);

  const handleFileUpload = () => {
    console.log('CSV data:', cibcData);
    Papa.parse(cibcData, {
      header: true,
      complete: (results) => {
        const formattedData = results.data;
        console.log('Formatted data:', formattedData);
        setRowData(formattedData);
      },
      
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  const columnDefs = rowData.length > 0 ? Object.keys(rowData[0]).map((key) => ({ headerName: key, field: key })) : [];

  return (
    <div>
      <button onClick={handleFileUpload}>Load Data</button>
      <div className="ag-theme-alpine" style={{ height: '400px', width: '600px' }}>
        <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
      </div>
    </div>
  );
};

export default ReportCibic;
