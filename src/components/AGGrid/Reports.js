import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Papa from 'papaparse';
import reportMapping from '../Data/report_mapping.json';

const Reports = () => {
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});

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
    const columnFilters = {};

    // Get the column filter values from the URL parameters
    urlParams.forEach((value, key) => {
      if (key !== 'name') {
        columnFilters[key] = value;
      }
    });

    if (reportName) {
      const reportId = reportMapping[reportName];
      if (reportId) {
        handleFileUpload(reportId);
        setColumnFilters(columnFilters);
      }
    }
  }, []);

  useEffect(() => {
    let filteredRows = rowData;

    // Apply column filters
    Object.keys(columnFilters).forEach((columnName) => {
      const filterValue = columnFilters[columnName];
      filteredRows = filteredRows.filter((row) =>
        row[columnName].toLowerCase().includes(filterValue.toLowerCase())
      );
    });

    setFilteredData(filteredRows);
  }, [rowData, columnFilters]);

  return (
    <div className="report-container">
      {Object.keys(columnDefs).map((column) => {
        const columnName = columnDefs[column].headerName;
        return (
          <div key={columnName}>
            <input
              type="text"
              placeholder={`Filter by ${columnName}`}
              value={columnFilters[columnName] || ''}
              onChange={(e) =>
                setColumnFilters((prevFilters) => ({
                  ...prevFilters,
                  [columnName]: e.target.value,
                }))
              }
            />
          </div>
        );
      })}
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact columnDefs={columnDefs} rowData={filteredData}></AgGridReact>
      </div>
    </div>
  );
};

export default Reports;
