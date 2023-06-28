
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './components/Resources/Home';
import RecordList  from './components/Resources/RecordList'
import Reports from './components/AGGrid/Reports';
import Records from './components/AGGrid/Records.js';
import ReportCibic from './components/AGGrid/cibicData.js';
import AgGridReportSample from "./components/AgGridReportSample";
import AgGridReport from './components/Resources/AgGridReport';



// require('./components/Data/generateReportMapping');


function App() {
  
return (

	<Router>
	{/* <Navbar /> */}
	<Routes>
		{/* <Route path='/' exact element={<Home />}/> */}
		<Route path='/' exact element={<RecordList />}/>
    	<Route path='/sample' element={<AgGridReportSample />} />
		<Route path='/grid' element={<AgGridReport />} />
		<Route path='/records' element={<Records />} />
		<Route path='/reports' element={<Reports />} />
		<Route path='/cibic' element={<ReportCibic />} />
    
		
	</Routes>
	</Router>
);
}

export default App;
