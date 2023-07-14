import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ReportDetails from "./ReportDetails.json";
import csvtojson from 'csvtojson';

import { LicenseManager } from "ag-grid-enterprise";

LicenseManager.setLicenseKey(
  "[TRIAL]_this_AG_Grid_Enterprise_key_( AG-043118 )_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_( legal@ag-grid.com )___For_help_with_purchasing_a_production_key_please_contact_( info@ag-grid.com )___All_FrontEnd_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_( 31 July 2023 )____[v2]_MTY5MDc1ODAwMDAwMA==f7deb9985cb10bc1921d8a43ac3c1b44");



  
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
            .then((jsonData) => {
              setRowData(jsonData);
              setHeaders(getHeaders(jsonData));
              setOriginalData(jsonData);
              applyColumnFilters(jsonData, columnFilters);
            })
            .catch((error) => {
              console.error("Error fetching CSV data:", error);
            });
        }
      }
    }, []);

      // const fetchCsvData = (csvUrl) => {
  //   return fetch(csvUrl)
  //     .then((response) => response.text())
  //     .then((csvData) => {
  //       return csvtojson().fromString(csvData);
  //     })
  //     .then((jsonData) => {
  //       console.log("jsonData:", jsonData); // Check the jsonData in the console
  //       setRowData(jsonData); // Set the rowData state here
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching CSV data:", error);
  //     });
  // };
  
    const fetchCsvData = (csvUrl) => {
      return fetch(csvUrl)
        .then((response) => response.text())
        .then((csvData) => csvtojson().fromString(csvData))
        .catch((error) => {
          console.error("Error fetching CSV data:", error);
        });
    };
  
    const getHeaders = (jsonData) => {
      if (jsonData.length > 0) {
        return Object.keys(jsonData[0]);
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
  const navigateToDetails = (header) => {
    console.log("header :::", header);
    if (header === "Submit" && (reportName === "Risk Recommendations" || reportName === "Control Recommendations")) {
      return (params) => {
        // const columnValue = params.data[params.column.colId];
        // if (columnValue !== undefined) {
          return (
            <button
              onClick={() =>
                window.open(
                  "https://mdosri.rnd.metricstream.com/ui/report/101077/report5568"
                )
              }
              className="btn"
            >
              Take Action
            </button>
          );
        // }
      };
    }
    return header;
  };
  

  
  const handleRowDragEnd = (event) => {
    const { node, overIndex } = event;
    const updatedRowData = [...rowData];
    updatedRowData.splice(node.rowIndex, 1); 
    updatedRowData.splice(overIndex, 0, node.data); 
    setRowData(updatedRowData);
  };

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  // function goBack() {
  //   window.history.back();
  // }

   const getChartDataType = (header) => {
    const columnValues = originalData.map((row) => row[header]);
    const isNumeric = columnValues.every((value) => !isNaN(value));
    return isNumeric ? "series" : "category";
  };

  const columnDefs = [
    {
      field: "",
      headerName: "",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      rowDrag: true,
      width: 60,
      // minWidth: 50,
      // maxWidth: 50,
    },
    ...headers.map((header) => {
      //const shouldEnableNavigation = reportName === "Risk Recommendations"  && header === "Submit" ;
  
      return {
        field: header,
        headerName: header,
        filter: true,
        chartDataType: getChartDataType(header),
        // cellRenderer: shouldEnableNavigation ? navigateToDetails(header) : false,
        cellRenderer:navigateToDetails(header),
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        width: 300,
        // minWidth: 100,
        // maxWidth: 400,
      };
    }),
  ];
  
  return (
    <div id="root" className="ag-theme-alpine" style={{ height: "82vh", width: "99vw" }}>
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
        columnDefs={columnDefs}
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
        suppressMoveWhenRowDragging={false}
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
            { statusPanel: "agSelectedRowCountComponent", align: "left" },
            // { statusPanel: "agAggregationComponent", align: "right" },
          ],
        }}
        onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
        popupParent={popupParent}
        onRowDragEnd={handleRowDragEnd}
      />
    </div>
  );
}

export default AgGridReport;
