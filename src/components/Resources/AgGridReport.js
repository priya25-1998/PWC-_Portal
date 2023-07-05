import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ReportDetails from "./ReportDetails.json";
import { LicenseManager } from "ag-grid-enterprise";

LicenseManager.setLicenseKey(
  "MTY4ODA3OTYwMDAwMA==5266e2b19455d0b5c7c8c52bf6367755"
);

function AgGridReport() {
  const [rowData, setRowData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [reportName, setReportName] = useState("");
  const [appliedFilterCardFilters, setAppliedFilterCardFilters] = useState([]);
  const [rootFilter, setRootFilter] = useState({});
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
    setAppliedFilterCardFilters(Object.entries(filters));
    setRootFilter({ ...rootFilter, ...filters });
  };

  const applyFilterCardFilters = (filters) => {
    let filteredData = originalData;
    for (const key in filters) {
      filteredData = filteredData.filter((row) =>
        row[key].toString().toLowerCase().includes(filters[key].toLowerCase())
      );
    }
    setRowData(filteredData);
    setAppliedFilterCardFilters(Object.entries(filters));
    setRootFilter({ ...rootFilter, ...filters });
  };

  const removeFilter = (field) => {
    const newFilterCardFilters = appliedFilterCardFilters.filter(([filterField]) => filterField !== field);
    const newRootFilter = { ...rootFilter };
    delete newRootFilter[field];

    setAppliedFilterCardFilters(newFilterCardFilters);
    setRootFilter(newRootFilter);

    let filteredData = originalData;
    for (const [filterField, filter] of newFilterCardFilters) {
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
        {/* <div>
          <button className="back-button" onClick={goBack}>
            &lt;
          </button>
        </div> */}
        <h2 className="report-name">{reportName}</h2>
      </div>

      <div className="filter-cards">
        {appliedFilterCardFilters.map(([field, filter]) => (
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
        columnDefs={[
          {
            field: "", 
            headerName: "", 
            checkboxSelection: true, 
            headerCheckboxSelection: true, 
            rowDrag: true, 
            width: 50, 
            minWidth: 50, 
            maxWidth: 50, 
          },
          ...headers.map((header) => ({
            field: header,
            headerName: header,
            filter: true,
            // chartDataType: "category",
            chartDataType: "series",
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            width: 200,
            minWidth: 100,
            maxWidth: 400,
          })),
        ]}
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
            // { statusPanel: "agAggregationComponent", align: "right" },
          ],
        }}
        onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
        popupParent={popupParent}
      />
    </div>
  );
}

export default AgGridReport;
