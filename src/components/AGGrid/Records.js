
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Papa from 'papaparse';
import reportMapping from '../Data/report_mapping.json';


const Records = () => {
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [orgnameFilter, setOrgnameFilter] = useState('');
  const [columnDefs, setColumnDefs] = useState([]);

// working-------------------------------------------------


  const handleFileUpload = (reportId) => {
    fetch(`/static/media/${reportId}.csv`)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            const formattedData = results.data;
            setRowData(formattedData);
            setFilteredData(formattedData);

            // Extract column names dynamically
            const columns = Object.keys(formattedData[0]).map((columnName) => ({
              headerName: columnName,
              field: columnName,
            }));
            setColumnDefs(columns);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching CSV file:', error);
      });
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reportName = urlParams.get('name');
    const orgnameFilterParam = urlParams.get('orgname');
    
    if (reportName) {
      const reportId = reportMapping[reportName];
      if (reportId) {
        handleFileUpload(reportId);
      }
    }

    if (orgnameFilterParam) {
      const decodedOrgname = decodeURIComponent(orgnameFilterParam);
      setOrgnameFilter(decodedOrgname);
    }
  }, []);

  useEffect(() => {
    if (orgnameFilter) {
      const filteredRows = rowData.filter((row) =>
        row.orgname.toLowerCase().includes(orgnameFilter.toLowerCase())
      );
      setFilteredData(filteredRows);
    } else {
      setFilteredData(rowData);
    }
  }, [orgnameFilter, rowData]);

  return (
    <div className="report-container">
      <div>
        <input
          type="text"
          placeholder="Filter by orgname"
          value={orgnameFilter}
          onChange={(e) => setOrgnameFilter(e.target.value)}
        />
      </div>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact columnDefs={columnDefs} rowData={filteredData}></AgGridReact>
      </div>
    </div>
  );
};

export default Records;

