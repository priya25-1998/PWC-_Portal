// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');

// // Define the file names for which you want to generate IDs
// const fileNames = ['cibc_data_april.csv', 'cibc_data.csv'];

// // Read the existing report mapping JSON file
// const reportMappingPath = './Data/report_mapping.json';
// const reportMappingData = fs.readFileSync(reportMappingPath, 'utf8');
// const reportMapping = JSON.parse(reportMappingData);

// // Generate unique IDs for each file name and update the report mapping object
// fileNames.forEach((fileName) => {
//   // Generate a unique ID
//   const id = uuidv4();

//   // Update the report mapping object with the new file name and ID
//   reportMapping[fileName] = id;
// });

// // Convert the report mapping object to a JSON string
// const updatedReportMappingData = JSON.stringify(reportMapping, null, 2);

// // Write the updated JSON string back to the file
// fs.writeFile(reportMappingPath, updatedReportMappingData, 'utf8', (err) => {
//   if (err) {
//     console.error('Error writing to file:', err);
//   } else {
//     console.log('report_mapping.json file updated successfully.');
//   }
// });
