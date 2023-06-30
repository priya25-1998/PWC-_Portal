import React, { useState } from 'react';
import Select from 'react-select';
import ReportDetails from './ReportDetails.json';
import '../../App.css';

const RecordList = () => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const handleNameChange = (selectedOption) => {
    setSelectedName(selectedOption);
    const report = ReportDetails.find((record) => record.reportName === selectedOption.value);
    setSelectedReport(report);
  };

  const options = ReportDetails.map((record) => ({
    value: record.reportName,
    label: record.reportName
  }));

  const handleReportClick = (key) => {
    const url = `${window.location.origin}/grid/?key=${key}`;
    window.open(url, '_self');
  };

  return (
    <div className="page-container">
      <div className="record-list-wrapper">
        <div className="search-container">
          <div className="search-bar">
            <Select
              value={selectedName}
              onChange={handleNameChange}
              options={options}
              placeholder="Select Report"
              isSearchable={true}
            />
          </div>
        </div>
        <div className="container">
          <h2>Report Details</h2>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Name</th>
                <th style={{ textAlign: 'left', width: '20%' }}>Key</th>
                <th style={{ textAlign: 'left', width: '50%' }}>URL</th>
              </tr>
            </thead>
            <tbody>
              {!selectedName ? (
                
                ReportDetails.map((record) => (
                  <tr key={record.key} onClick={() => handleReportClick(record.key)}>
                    <td className="table-cell" style={{ textAlign: 'left' }}>
                      {record.reportName}
                    </td>
                    <td className="table-cell" style={{ textAlign: 'left', width: '20%' }}>
                      {record.key}
                    </td>
                    <td className="table-cell" style={{ textAlign: 'left', width: '50%' }}>
                      {record.url}
                    </td>
                  </tr>
                ))
              ) : (
                // Display the selected report details
                <tr onClick={() => handleReportClick(selectedReport.key)}>
                  <td className="table-cell" style={{ textAlign: 'left' }}>
                    {selectedReport.reportName}
                  </td>
                  <td className="table-cell" style={{ textAlign: 'left', width: '20%' }}>
                    {selectedReport.key}
                  </td>
                  <td className="table-cell" style={{ textAlign: 'left', width: '50%' }}>
                    {selectedReport.url}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecordList;
