// AgGridReport.js

import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";

LicenseManager.setLicenseKey(
  "MTY4ODA3OTYwMDAwMA==5266e2b19455d0b5c7c8c52bf6367755"
);

function AgGridReportSample() {
    
    const animateRows = true;
    const [rowData, setRowData] = useState();
    const enableCharts = true;
    const enableRangeSelection = true;
    const enableRangeHandle = true;
  
    // Define the columns and Rows
  
    const [columnDefs] = useState([
      {
        field: "LOB",
        headerName: "LOB",
        chartDataType: "category",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        filter: "agSetColumnFilter",
        tooltipField: "LOB",
        rowDrag: true,
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //width: 200,
        //aggFunc: 'count'
      },
      {
        field: "Control ID",
        chartDataType: "category",
        filter: true,
        tooltipField: "Control ID",
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //width: 200,
        //aggFunc: 'count'
      },
      {
        field: "Control Name",
        tooltipField: "Control Name",
        chartDataType: "category",
        filter: true,
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //width: 500,
        //aggFunc: 'count'
      },
      {
        field: "Current Test Frequency",
        chartDataType: "category",
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //width: 100,
        //aggFunc: 'count'
      },
      {
        field: "Recommendation Action",
        chartDataType: "category",
        filter: true,
        tooltipField: "Recommendation Action",
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //width: 100,
        //aggFunc: 'count'
      },
      {
        field: "Recommendation",
        chartDataType: "category",
        filter: true,
        tooltipField: "Recommendation",
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //width: 100,
        //aggFunc: 'count',
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
      },
      {
        field: "Action",
        chartDataType: "series",
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //aggFunc: 'count',
        cellRenderer: function (params) {
          if (params.value === "Take Action") {
            return (
              <button
                onClick={() =>
                  navigateToDetails(
                    params.data.id,
                    "https://mdosri.rnd.metricstream.com/ui/report/101077/report5568"
                  )
                }
                className="btn"
              >
                Take Action
              </button>
            );
          } else {
            return params.value;
          }
        },
      },
      {
        field: "Mode",
        chartDataType: "category",
        filter: true,
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //width: 100,
        //aggFunc: 'count'
      },
      {
        field: "Rationale",
        tooltipField: "Rationale",
        chartDataType: "category",
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //width: 500,
        //aggFunc: 'count'
      },
      {
        field: "Rationale Filter",
        chartDataType: "category",
        tooltipField: "Rationale Filter",
        enableRowGroup: true,
        enablePivot:true,
        filter: true,
        enableValue: true,
        //width: 200,
        //aggFunc: 'count',
        /*cellStyle: (params) => {
          if (params.value === "Issue Detected") {
            return { fontWeight: "bold", borderRadius:'15px', textAlign:'center'};
          }
          if (params.value === "Control Consistently Passed") {
            return {fontWeight: "bold",borderRadius:'15px', textAlign:'center'};
          }
        },*/
      },
      {
        field: "Control Test Count",
        chartDataType: "series",
        tooltipField: "Control Test Count",
        enableRowGroup: true,
        enablePivot:true,
        enableValue: true,
        //width: 200,
        //aggFunc: 'count'
      },
    ]);
  
    useEffect(() => {
      const object_URL =
        "https://ms-optimizer.s3.us-east-2.amazonaws.com/Sample/OptimizationStrategy.csv";
      fetch(object_URL)
        .then((response) => response.text())
        .then((csvData) => {
          const rows = csvData.split("\n");
          const headers = rows[0].split(",").map((header) => header.trim());
          const rowData = rows
            .slice(1)
            .filter((row) => row.trim() !== "")
            .map((row) => {
              const values = row.split(",").map((value) => value.trim());
              return headers.reduce((rowObject, header, index) => {
                const key = header.replace(/\s+/g, " ");
                console.log(key);
                rowObject[key] = values[index];
                return rowObject;
              }, {});
            });
          setRowData(rowData);
          console.log(rowData);
        })
        .catch((error) => {
          console.error("Error fetching CSV data:", error);
        });
    }, []);
  
    // Define the Default columns Parameters
  
    const defaultColDef = useMemo(() => {
      return {
        sortable: true,
        //flex: 1,
        //minWidth: 220,
        resizable: true,
        floatingFilter: true,
        enablePivot: true,
        autoHeaderHeight: true,
      };
    }, []);
  
    // Define the Sidebar Parameters
  
    const sideBar = {
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
    };
  
    // Define the Statusbar Parameters
  
    const statusBar = useMemo(() => {
      return {
        statusPanels: [
          { statusPanel: "agTotalRowCountComponent", align: "left" },
          { statusPanel: "agSelectedRowCountComponent", align: "left" },
        ],
      };
    }, []);
  
    // navigateToDetails Function
    function navigateToDetails(id, url) {
      console.log("Navigating to details for each row using a URL");
      window.location.href = url;
    }
  
    const popupParent = useMemo(() => {
      return document.body;
    }, []);
  
    return (
      <div
        id="root"
        className="ag-theme-alpine"
        style={{ height: 500, width: 1350 }}
      >
        <h2>Test Plan Recommendations</h2>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={"multiple"}
          rowMultiSelectWithClick={true}
          animateRows={animateRows}
          enableCharts={enableCharts}
          enableRangeSelection={enableRangeSelection}
          enableRangeHandle={enableRangeHandle}
          popupParent={popupParent}
          sideBar={sideBar}
          rowDragManaged={true}
          suppressMoveWhenRowDragging={true}
          statusBar={statusBar}
          suppressBrowserResizeObserver={true}
          pivotMode={false}
        />
      </div>
    );
  }


export default AgGridReportSample;
