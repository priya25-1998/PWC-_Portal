import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey(
  "[TRIAL]_this_AG_Grid_Enterprise_key_( AG-043119 )_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_( legal@ag-grid.com )___For_help_with_purchasing_a_production_key_please_contact_( info@ag-grid.com )___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_( 31 August 2023 )____[v2]_MTY5MzQzNjQwMDAwMA==458ec7edd8751844a9f17a7441427632");



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
