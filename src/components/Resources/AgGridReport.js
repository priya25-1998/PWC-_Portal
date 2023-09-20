import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ReportMetaDetails from "./ReportMetaDetails.json";
import csvtojson from 'csvtojson';
import { BarWave } from "react-cssfx-loading";
import "./AgGrid.css"

//   function AgGridReport() {
//     const [rowData, setRowData] = useState([]);
//     const [headers, setHeaders] = useState([]);
//     const [reportName, setReportName] = useState("");
//     const [appliedFilterCardFilters, setAppliedFilterCardFilters] = useState([]);
//     const [rootFilter, setRootFilter] = useState({});
//     const [originalData, setOriginalData] = useState([]);
  
//     useEffect(() => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const reportKey = urlParams.get("key");
//       const columnFilters = {};
  
      
//       urlParams.forEach((value, key) => {
//         if (key !== "key") {
//           columnFilters[key] = value;
//         }
//       });
  
//       if (reportKey) {
//         const report = ReportDetails.find((item) => item.key === reportKey);
//         if (report) {
//           const { reportName, url } = report;
//           setReportName(reportName);
//           fetchCsvData(url)
//             .then((jsonData) => {
//               setRowData(jsonData);
//               setHeaders(getHeaders(jsonData));
//               setOriginalData(jsonData);
//               applyColumnFilters(jsonData, columnFilters);
//             })
//             .catch((error) => {
//               console.error("Error fetching CSV data:", error);
//             });
//         }
//       }
//     }, []);

//       // const fetchCsvData = (csvUrl) => {
//   //   return fetch(csvUrl)
//   //     .then((response) => response.text())
//   //     .then((csvData) => {
//   //       return csvtojson().fromString(csvData);
//   //     })
//   //     .then((jsonData) => {
//   //       console.log("jsonData:", jsonData); // Check the jsonData in the console
//   //       setRowData(jsonData); // Set the rowData state here
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching CSV data:", error);
//   //     });
//   // };
  
//     const fetchCsvData = (csvUrl) => {
//       return fetch(csvUrl)
//         .then((response) => response.text())
//         .then((csvData) => csvtojson().fromString(csvData))
//         .catch((error) => {
//           console.error("Error fetching CSV data:", error);
//         });
//     };
  
//     const getHeaders = (jsonData) => {
//       if (jsonData.length > 0) {
//         return Object.keys(jsonData[0]);
//       }
//       return [];
//     };

//   const applyColumnFilters = (data, filters) => {
//     let filteredData = data;
//     for (const key in filters) {
//       filteredData = filteredData.filter((row) => row[key] === filters[key]);
//     }
//     setRowData(filteredData);
//     setAppliedFilterCardFilters(Object.entries(filters));
//     setRootFilter({ ...rootFilter, ...filters });
//   };

//   const applyFilterCardFilters = (filters) => {
//     let filteredData = originalData;
//     for (const key in filters) {
//       filteredData = filteredData.filter((row) =>
//         row[key].toString().toLowerCase().includes(filters[key].toLowerCase())
//       );
//     }
//     setRowData(filteredData);
//     setAppliedFilterCardFilters(Object.entries(filters));
//     setRootFilter({ ...rootFilter, ...filters });
//   };

//   const removeFilter = (field) => {
//     const newFilterCardFilters = appliedFilterCardFilters.filter(([filterField]) => filterField !== field);
//     const newRootFilter = { ...rootFilter };
//     delete newRootFilter[field];

//     setAppliedFilterCardFilters(newFilterCardFilters);
//     setRootFilter(newRootFilter);

//     let filteredData = originalData;
//     for (const [filterField, filter] of newFilterCardFilters) {
//       filteredData = filteredData.filter((row) =>
//         row[filterField].toString().toLowerCase().includes(filter.toLowerCase())
//       );
//     }

//     setRowData(filteredData);
//   };
//   const navigateToDetails = (header) => {
//     console.log("header :::", header);
//     if (((header === "Submit") || ( header === "Action"))&& (reportName === "Risk Recommendations" || reportName === "Control Recommendations" || reportName === "Optimization Strategy")) {
//       return (params) => {
//         // const columnValue = params.data[params.column.colId];
//         // if (columnValue !== undefined) {
//           return (
//             <button
//               onClick={() =>
//                 window.open(
//                   "https://mdosri.rnd.metricstream.com/ui/report/101077/report5568"
//                 )
//               }
//               className="btn"
//             >
//               Take Action
//             </button>
//           );
//         // }
//       };
//     }
//     return header;
//   };
  

  
//   const handleRowDragEnd = (event) => {
//     const { node, overIndex } = event;
//     const updatedRowData = [...rowData];
//     updatedRowData.splice(node.rowIndex, 1); 
//     updatedRowData.splice(overIndex, 0, node.data); 
//     setRowData(updatedRowData);
//   };

//   const popupParent = useMemo(() => {
//     return document.body;
//   }, []);

//   // function goBack() {
//   //   window.history.back();
//   // }

//    const getChartDataType = (header) => {
//     const columnValues = originalData.map((row) => row[header]);
//     const isNumeric = columnValues.every((value) => !isNaN(value));
//     return isNumeric ? "series" : "category";
//   };

//   const IDColumns = ['Issue ID', 'Action ID', 'Issue Identified On','Issue Closed On','Issue Status','Primary Issue ID','Label','Score','Control ID','Redundancy','Organization','Theme ID','Schedule Date','Total Test Count','Test Frequency','Due Date','Test Result','Duration','Status','Key Control','Parent Object','Purpose','Recommended Purpose','GRC Object ID','GRC Object Type','Risk ID','X Coordinate','Y Coordinate','Current Test Frequency','Recommendation','Action','Mode','Rationale Filter','Control Test Count','LOB'];
//   const getColumnWidth = (header) => {
//     if (IDColumns.includes(header)) {
//       return 250;
//     } else {
//       return 500;
//     }
//   };

//   const navigateToSubReport = (params) => {
//     if (reportName === "Recommended Controls Details" && params.data) {
//       const url = `${window.location.origin}/grid/?key=controlmetadataaggridtesting&Control ID=${params.data["Control ID"]}`;
//       window.open(url, "_blank");
//     }
//   };

//   //const columnsWithWrapText = ["Issue Description", "Issue Title", "Action Title","Action Description",'Issue Theme'];
// // const shouldApplyWrapText = (column) => {
// //   return columnsWithWrapText.includes(column);
// // };

// // const getColumnDefs = () => {
// //   return headers.map((header) => ({
// //     field: header,
// //     headerName: header,
// //     filter: true,
// //     chartDataType: getChartDataType(header),
// //     cellRenderer: navigateToDetails(header),
// //     enableRowGroup: true,
// //     enablePivot: true,
// //     enableValue: true,
// //     width: getColumnWidth(header),
// //     cellStyle:  {
// //       lineHeight: "1.5",
// //       whiteSpace: "normal", 
// //       wordBreak: "break-word",
// //       paddingTop: "10px",
// //     } ,
// //     // cellStyle: (params) => {
// //     //   if (params.value === "Re-test" || params.value === "Retest") {
// //     //     return {
// //     //       backgroundColor: "LightCoral",
// //     //       fontWeight: "bold",
// //     //       borderRadius: "2px",
// //     //       textAlign: "center",
// //     //       border: "crimson Solid",
// //     //       color: "white",
// //     //       width: "160px",
// //     //       height: "35px",
          
// //     //     };
// //     //   }
// //     //   if (params.value === "Optimize") {
// //     //     return {
// //     //       backgroundColor: "MediumAquamarine",
// //     //       fontWeight: "bold",
// //     //       borderRadius: "2px",
// //     //       textAlign: "center",
// //     //       border: "LightSeaGreen Solid",
// //     //       color: "white",
// //     //       width: "160px",
// //     //       height: "35px",
// //     //     };
// //     //   }
// //     // },
// // //     tooltipField: header, 
    
// // //     cellRendererParams: {
// // //       tooltipRenderer: (params) => {
// // //         return `<div class="tooltiptext" style="white-space: normal; overflow-wrap: break-word;">${params.value}</div>`;
// // //       },
// // //     }
// // //   }));
// // // };
// const getColumnDefs = () => {
//   return headers.map((header) => ({
//     field: header,
//     headerName: header,
//     filter: true,
//     chartDataType: getChartDataType(header),
//     cellRenderer: navigateToDetails(header),
//     enableRowGroup: true,
//     enablePivot: true,
//     enableValue: true,
//     width: getColumnWidth(header),
//     cellStyle: (params) => {
//       let style = {
//         lineHeight: "1.5",
//         whiteSpace: "normal",
//         wordBreak: "break-word",
//         paddingTop: "10px",
//         paddingButtom :"5px",
//       };

//       if (params.value === "Re-test" || params.value === "Retest") {
//         style.backgroundColor = "LightCoral";
//         style.fontWeight = "bold";
//         style.borderRadius = "2px";
//         style.textAlign = "center";
//         style.border = "crimson solid";
//         style.color = "white";
//         style.width = "160px";
//         style.height = "35px";
//       } else if (params.value === "Optimize") {
//         style.backgroundColor = "MediumAquamarine";
//         style.fontWeight = "bold";
//         style.borderRadius = "2px";
//         style.textAlign = "center";
//         style.border = "LightSeaGreen solid";
//         style.color = "white";
//         style.width = "160px";
//         style.height = "35px";
//       }
      
//       return style;
//     },
//     tooltipField: header,
//     cellRendererParams: {
//       tooltipRenderer: (params) => {
//         return `<div class="tooltiptext" style="white-space: normal; overflow-wrap: break-word;">${params.value}</div>`;
//       },
//     },
//   }));
// };

// const columnDefs = [
//   {
//     field: "",
//     headerName: "",
//     checkboxSelection: true,
//     headerCheckboxSelection: true,
//     rowDrag: true,
//     width: 20,
//     minWidth: 60,
//     maxWidth: 70,
//     enablePivot: false,
//     autoHeaderHeight: false,
//     enableFilter: false,
//     cellRenderer: navigateToSubReport,
//   },
//   ...getColumnDefs(),
// ];
//   const getRowHeight = (params) => {
//     const maxRowHeight = 200; 
//     const lineHeight = 20; 

//     const wrappedTextLines = Math.ceil(params.data[params.colDef.field].length / 25); 
//     const calculatedHeight = wrappedTextLines * lineHeight;

//     return Math.min(calculatedHeight, maxRowHeight);
//   };
  
//   return (
//     <div id="root" className="ag-theme-alpine" style={{ height: "82vh", width: "99vw" }}>
//       <div className="report-header">
//         {/* <div>
//           <button className="back-button" onClick={goBack}>
//             &lt;
//           </button>
//         </div> */}
//         <h2 className="report-name">{reportName}</h2>
//       </div>

//       <div className="filter-cards">
//         {appliedFilterCardFilters.map(([field, filter]) => (
//           <div key={field} className="filter-card">
//             <span>{field}:</span>
//             <span>{filter}</span>
//             <span className="remove-filter" onClick={() => removeFilter(field)}>
//               &#x2716;
//             </span>
//           </div>
//         ))}
//       </div>

//       <AgGridReact
       
//        rowData={rowData}
//        columnDefs={columnDefs}
//        defaultColDef={{
//          sortable: true,
//         // resizable: true,
//          floatingFilter: true,
//          enablePivot: true,
//          autoHeaderHeight: true,
//          enableFilter: true,
//          // autoHeight: true, 
//          wrapText: true,
//          getRowHeight: getRowHeight,
         
//        }}
//        rowSelection={"multiple"}
//        rowMultiSelectWithClick={true}
//        animateRows={true}
//        enableCharts={true}
//        enableRangeSelection={true}
//        enableRangeHandle={true}
//        suppressMoveWhenRowDragging={false}
//        suppressBrowserResizeObserver={true}
//        pivotMode={false}
//        rowHeight={100}
//         sideBar={{
//           toolPanels: [
//             {
//               id: "columns",
//               labelDefault: "Columns",
//               labelKey: "columns",
//               iconKey: "columns",
//               toolPanel: "agColumnsToolPanel",
//               minWidth: 225,
//               maxWidth: 225,
//               width: 225,
//             },
//             {
//               id: "filters",
//               labelDefault: "Filters",
//               labelKey: "filters",
//               iconKey: "filter",
//               toolPanel: "agFiltersToolPanel",
//               minWidth: 180,
//               maxWidth: 400,
//               width: 250,
//             },
//           ],
//           position: "right",
//           defaultToolPanel: "filters",
//         }}
//         statusBar={{
//           statusPanels: [
//             { statusPanel: "agSelectedRowCountComponent", align: "left" },
//             // { statusPanel: "agAggregationComponent", align: "right" },
//           ],
//         }}
//         onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
//         popupParent={popupParent}
//         onRowDragEnd={handleRowDragEnd}
//         onRowClicked={(params) => {
//           navigateToSubReport(params);
//         }}
//       />
//     </div>
//   );
// }

// export default AgGridReport;

const renderLoadingMessage = () => (
  <div className="loading-container">
    <BarWave color="#42335b" />
  </div>
);


function AgGridReport() {
  const [rowData, setRowData] = useState([]);
  const [reportName, setReportName] = useState("");
  const [appliedFilterCardFilters, setAppliedFilterCardFilters] = useState([]);
  const [rootFilter, setRootFilter] = useState({});
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reportKey, setReportKey] = useState(null);
  const [columnDetails, setColumnDefs] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("key");
    setReportKey(key);
    const columnFilters = {};
    urlParams.forEach((value, key) => {
      if (key !== "key") {
        columnFilters[key] = value;
      }
    });
    if (reportKey) {
      const report = ReportMetaDetails.find((item) => item.key === key);
      if (report) {
        const { reportName, url, columns } = report;
        setReportName(reportName);
        setIsLoading(true);
        fetchCsvData(url)
          .then((jsonData) => {
            setRowData(jsonData);
            setOriginalData(jsonData);
            const columnDefsWithRenderer = columns.map(column => {
              if ((column.field === 'Action' || column.field === 'Submit') && (reportName === "Risk Recommendations" || reportName === "Control Recommendations" || reportName === "Optimization Strategy")) {
                return {
                  ...column,
                  tooltipField: column.field,
                  cellRenderer: customCellRenderer
                };
              }
              return {
                ...column,
                tooltipField: column.field,
                cellStyle: cellStyleDef
              };
            });

            if ((reportKey === "DuplicateIssues") || (reportKey === "SimilarIssues")) {
              const rowGroupFields = ["Signal Theme", "Primary Signal ID"];
              columnDefsWithRenderer.forEach((column) => {
                if (rowGroupFields.includes(column.field)) {
                  column.rowGroup = true;
                }
              });
            }
            
            setColumnDefs(columnDefsWithRenderer);
            applyColumnFilters(jsonData, columnFilters);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching CSV data:", error);
            setIsLoading(false);
          });


      }
    }
  }, [reportKey]);

  const cellStyleDef = (params) => {
    let style = {
      lineHeight: "1.9",
      whiteSpace: "normal",
      wordBreak: "break-word",
      paddingTop: "10px",

    };

    if (params.value === "Re-test" || params.value === "Retest") {
      style.backgroundColor = "LightCoral";
      style.fontWeight = "bold";
      style.borderRadius = "2px";
      style.textAlign = "center";
      style.border = "crimson solid";
      style.color = "white";
      style.width = "130px";
      style.height = "35px";
      style.paddingTop = "5px";
    } else if (params.value === "Optimize") {
      style.backgroundColor = "MediumAquamarine";
      style.fontWeight = "bold";
      style.borderRadius = "2px";
      style.textAlign = "center";
      style.border = "LightSeaGreen solid";
      style.color = "white";
      style.width = "130px";
      style.height = "35px";
      style.paddingTop = "5px";
    }

    return style;
  }
  const customCellRenderer = (params) => {
    if (params.value) {

      return (
        <button className="btn"
          onClick={() =>
            navigateToDetails(
              params.data.id,
              "https://mdosri.rnd.metricstream.com/ui/report/101077/report5568"
            )
          }

        >
          Take Action
        </button>
      );
    } else {
      return params.value;
    }
  };
  function navigateToDetails(id, url) {
    window.location.href = url;
  }

  const fetchCsvData = (csvUrl) => {
    return fetch(csvUrl)
      .then((response) => response.text())
      .then((csvData) => csvtojson().fromString(csvData))
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  };
  const applyColumnFilters = (data, filters) => {
    let filteredData = data;
    filteredData = filteredData.filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === 'notDefine') {
          return true;
        }
        return row[key] === value;
      });
    });

    const updatedFilterCardFilters = Object.entries(filters).filter(([key, value]) => value !== 'notDefine');
    setRowData(filteredData);
    setAppliedFilterCardFilters(updatedFilterCardFilters);
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

  
  const getRowHeight = (params) => {
    const maxRowHeight = 200;
    const lineHeight = 20;

    const wrappedTextLines = Math.ceil(params.data[params.colDef.field].length / 25);
    const calculatedHeight = wrappedTextLines * lineHeight;

    return Math.min(calculatedHeight, maxRowHeight);
  };

 const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      floatingFilter: true,
      enablePivot: true,
      autoHeaderHeight: true,
      enableFilter: true,
      // suppressSizeToFit: false,
      // minWidth: 300,
      // autoHeight: true, 
      wrapText: true,
      getRowHeight: getRowHeight

    };
  }, []);

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
    //defaultToolPanel: "columns"
  };

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agSelectedRowCountComponent", align: "left" },
      ],
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 500,
    };
  }, []);

  const calculateInitialWidth = (columns, screenWidth) => {
    let totalWidth = 0;
    let i = 0;
    while (i < columns.length && totalWidth + columns[i].width <= screenWidth) {
      totalWidth += columns[i].width;
      i++;
    }
    console.log("totalWidth", totalWidth);
    return totalWidth;
  };



  return (
    <>
      {isLoading && <div className="loading-message">{renderLoadingMessage()}</div>}
      <div id="root" className="ag-theme-alpine" style={{ height: "87vh", width: "99vw" }}>
        {isLoading ? (
          <div className="loading-message">{renderLoadingMessage()}</div>
        ) : (
          <>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="4" fill="#46AF6A" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.2915 13C10.2915 12.3083 10.8498 11.75 11.5415 11.75C12.2332 11.75 12.7915 12.3083 12.7915 13C12.7915 13.6917 12.2332 14.25 11.5415 14.25C10.8498 14.25 10.2915 13.6917 10.2915 13ZM10.2915 18C10.2915 17.3083 10.8498 16.75 11.5415 16.75C12.2332 16.75 12.7915 17.3083 12.7915 18C12.7915 18.6917 12.2332 19.25 11.5415 19.25C10.8498 19.25 10.2915 18.6917 10.2915 18ZM11.5415 21.75C10.8498 21.75 10.2915 22.3167 10.2915 23C10.2915 23.6833 10.8582 24.25 11.5415 24.25C12.2248 24.25 12.7915 23.6833 12.7915 23C12.7915 22.3167 12.2332 21.75 11.5415 21.75ZM25.7082 23.8333H14.0415V22.1667H25.7082V23.8333ZM14.0415 18.8333H25.7082V17.1667H14.0415V18.8333ZM14.0415 13.8333V12.1667H25.7082V13.8333H14.0415Z"
                    fill="white"
                  />
                </svg>
                <h1 style={{ marginLeft: "15px", fontSize: "20px" }}>{reportName}</h1>
              </div>

              {/* <div style={{ position: "relative", marginRight: "20px" }}>
                <button className="back-button" onClick={goBack}>
                  Back
                </button>
              </div> */}
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
              columnDefs={columnDetails}
              defaultColDef={defaultColDef}
              //pagination={true}
              //paginationPageSize={10}
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
              autoGroupColumnDef={autoGroupColumnDef}
              sideBar={sideBar}
              statusBar={statusBar}
              onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
              style={{ width: `${calculateInitialWidth(columnDetails, window.innerWidth)}px`, overflowX: 'auto' }}
              popupParent={popupParent}
              onRowDragEnd={handleRowDragEnd}

            />
          </>
        )}
      </div>
    </>

  );
}

export default AgGridReport;