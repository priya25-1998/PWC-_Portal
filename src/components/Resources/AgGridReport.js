import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ReportDetails from "./ReportDetails.json";
import csvtojson from 'csvtojson';
import "./AgGrid.css"



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
    if (header === "Submit" || header === "Action" && (reportName === "Risk Recommendations" || reportName === "Control Recommendations" || reportName === "Optimization Strategy")) {
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

  const IDColumns = ['Issue ID', 'Action ID', 'Issue Identified On','Issue Closed On','Issue Status','Primary Issue ID','Label','Score','Control ID','Redundancy','Organization','Theme ID','Schedule Date','Total Test Count','Test Frequency','Due Date','Test Result','Duration','Status','Key Control','Parent Object','Purpose','Recommended Purpose','GRC Object ID','GRC Object Type','Risk ID','X Coordinate','Y Coordinate','Current Test Frequency','Recommendation','Action','Mode','Rationale Filter','Control Test Count','LOB'];
  const getColumnWidth = (header) => {
    if (IDColumns.includes(header)) {
      return 250;
    } else {
      return 500;
    }
  };

  const navigateToSubReport = (params) => {
    if (reportName === "Recommended Controls Details" && params.data) {
      const url = `${window.location.origin}/grid/?key=controlmetadataaggridtesting&Control ID=${params.data["Control ID"]}`;
      window.open(url, "_blank");
    }
  };

  const columnsWithWrapText = ["Issue Description", "Issue Title", "Action Title","Action Description",'Issue Theme'];
const shouldApplyWrapText = (column) => {
  return columnsWithWrapText.includes(column);
};

const getColumnDefs = () => {
  return headers.map((header) => ({
    field: header,
    headerName: header,
    filter: true,
    chartDataType: getChartDataType(header),
    cellRenderer: navigateToDetails(header),
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    width: getColumnWidth(header),
    cellStyle: shouldApplyWrapText(header) ? {
      lineHeight: "1.4",
      whiteSpace: "normal", 
      wordBreak: "break-word",
      paddingTop: "10px",
    } : null,
    cellStyle: (params) => {
      if (params.value === "Re-test") {
        return {
          backgroundColor: "LightCoral",
          fontWeight: "bold",
          borderRadius: "2px",
          textAlign: "center",
          border: "crimson Solid",
          color: "white",
          width: "160px",
          height: "35px",
          
        };
      }
      if (params.value === "Optimize") {
        return {
          backgroundColor: "MediumAquamarine",
          fontWeight: "bold",
          borderRadius: "2px",
          textAlign: "center",
          border: "LightSeaGreen Solid",
          color: "white",
          width: "160px",
          height: "35px",
        };
      }
    },
    tooltipField: header, 
    
    cellRendererParams: {
      tooltipRenderer: (params) => {
        return `<div class="tooltiptext" style="white-space: normal; overflow-wrap: break-word;">${params.value}</div>`;
      },
    }
  }));
};

const columnDefs = [
  {
    field: "",
    headerName: "",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    rowDrag: true,
    width: 20,
    minWidth: 60,
    maxWidth: 70,
    enablePivot: false,
    autoHeaderHeight: false,
    enableFilter: false,
    cellRenderer: navigateToSubReport,
  },
  ...getColumnDefs(),
];
  const getRowHeight = (params) => {
    const maxRowHeight = 200; 
    const lineHeight = 20; 

    const wrappedTextLines = Math.ceil(params.data[params.colDef.field].length / 25); 
    const calculatedHeight = wrappedTextLines * lineHeight;

    return Math.min(calculatedHeight, maxRowHeight);
  };
  
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
         // autoHeight: true, 
         wrapText: true,
         getRowHeight: getRowHeight,
         
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
       rowHeight={100}
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
        onRowClicked={(params) => {
          navigateToSubReport(params);
        }}
      />
    </div>
  );
}

export default AgGridReport;
