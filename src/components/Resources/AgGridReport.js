
import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
import "../../App.css";
import ReportDetails from "./ReportDetails.json";

// LicenseManager.setLicenseKey("MTY4ODA3OTYwMDAwMA==5266e2b19455d0b5c7c8c52bf6367755");

function AgGridReport() {
  const [rowData, setRowData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [reportName, setReportName] = useState("");
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reportKey = urlParams.get("key");
    const columnFilters = {};

    // Extract column filters from query parameters
    urlParams.forEach((value, key) => {
      if (key !== "key") {
        columnFilters[key] = value;
      }
    });

    if (reportKey) {
      const report = ReportDetails.find((item) => item.key === reportKey);
      if (report) {
        const { reportName, url } = report;
        setReportName(reportName);
        console.log("urlllll:::::::::",url);
        fetchCsvData(url)
          .then((rowData) => {
            setRowData(rowData);
            setHeaders(getHeaders(rowData));
            setOriginalData(rowData);
            applyColumnFilters(rowData, columnFilters);
          })
          .catch((error) => {
            console.error("Error fetching CSV data:", error);
          });
      }
    }
  }, []);

  const fetchCsvData = (csvUrl) => {
    return fetch(csvUrl)
      .then((response) => response.text())
      .then((csvData) => {
        const rows = csvData.split("\n");
        const headers = rows[0].split(",").map((header) => header.trim());
        setHeaders(headers);
        const rowData = rows
          .slice(1)
          .filter((row) => row.trim() !== "")
          .map((row) => {
            const values = row.split(",").map((value) => value.trim());
            return headers.reduce((rowObject, header, index) => {
              const key = header.replace(/\s+/g, " ");
              rowObject[key] = values[index];
              return rowObject;
            }, {});
          });

        return rowData;
      });
  };

  const getHeaders = (rowData) => {
    if (rowData.length > 0) {
      return Object.keys(rowData[0]);
    }
    return [];
  };

  const applyColumnFilters = (data, filters) => {
    let filteredData = data;
    for (const key in filters) {
      filteredData = filteredData.filter((row) => row[key] === filters[key]);
    }
    setRowData(filteredData);
    setAppliedFilters(Object.entries(filters));
  };

  const onFilterChanged = (event) => {
    const api = event.api;
    const allFilters = api.getFilterModel();

    const newAppliedFilters = Object.entries(allFilters).map(([field, filter]) => ({
      field,
      filter: filter.filter,
    }));

    setAppliedFilters(newAppliedFilters);

    // Apply the filters
    let filteredData = originalData;
    for (const { field, filter } of newAppliedFilters) {
      filteredData = filteredData.filter((row) =>
        row[field].toString().toLowerCase().includes(filter.toLowerCase())
      );
    }

    setRowData(filteredData);
  };

  const removeFilter = (field) => {
    const newAppliedFilters = appliedFilters.filter(([filterField]) => filterField !== field);
    setAppliedFilters(newAppliedFilters);

    // Apply the filters
    let filteredData = originalData;
    for (const [filterField, filter] of newAppliedFilters) {
      filteredData = filteredData.filter((row) =>
        row[filterField].toString().toLowerCase().includes(filter.toLowerCase())
      );
    }

    setRowData(filteredData);
  };

  const navigateToDetails = (id, url) => {
    console.log("Navigating to details for each row using a URL");
    window.location.href = url;
  };

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  function goBack() {
    window.history.back();
  }

  return (
    <div id="root" className="ag-theme-alpine" style={{ height: "100vh", width: "99vw" }}>
      <div className="report-header">
        
        <div>
          <button className="back-button" onClick={goBack}>
            &lt;
          </button>
        </div>
        <h2 className="report-name">{reportName}</h2>
      </div>

      <div className="filter-cards">
        {appliedFilters.map(([field, filter]) => (
          <div key={field} className="filter-card">
            <span>{field}:</span>
            <span>{filter}</span>
            <span className="remove-filter" onClick={() => removeFilter(field)}>
              &#x2716;
            </span>
          </div>
        ))}
      </div>
      
      <AgGridReact
        rowData={rowData}
        columnDefs={headers.map((header) => ({
          field: header,
          headerName: header,
          filter: true,
        }))}
        defaultColDef={{
          sortable: true,
          resizable: true,
          floatingFilter: true,
          enablePivot: true,
          autoHeaderHeight: true,
          enableFilter: true,
        }}
        rowSelection={"multiple"}
        rowMultiSelectWithClick={true}
        animateRows={true}
        enableCharts={true}
        enableRangeSelection={true}
        enableRangeHandle={true}
        suppressMoveWhenRowDragging={true}
        suppressBrowserResizeObserver={true}
        pivotMode={false}
        sideBar={{
          toolPanels: [
            {
              id: "columns",
              labelDefault: "Columns",
              labelKey: "columns",
              iconKey: "columns",
              toolPanel: "agColumnsToolPanel",
              minWidth: 225,
              maxWidth: 225,
              width: 225,
            },
            {
              id: "filters",
              labelDefault: "Filters",
              labelKey: "filters",
              iconKey: "filter",
              toolPanel: "agFiltersToolPanel",
              minWidth: 180,
              maxWidth: 400,
              width: 250,
            },
          ],
          position: "right",
          defaultToolPanel: "filters",
        }}
        statusBar={{
          statusPanels: [
            { statusPanel: "agTotalRowCountComponent", align: "left" },
            { statusPanel: "agSelectedRowCountComponent", align: "left" },
          ],
        }}
        onRowClicked={(event) => {
          navigateToDetails(event.data.id, event.data.url);
        }}
        onFilterChanged={onFilterChanged}
        getPopupParent={() => popupParent}
      />
    </div>
  );
}

export default AgGridReport;









