#!/usr/bin/env node

var fs = require('fs')
  , lineReader = require('line-reader')
  ;

var fileName = process.argv[2] || null;

if (!fileName) {
  console.log("Specify a file name.");
  console.log("Example: node sortcodes raw-sortcodes.txt");
  process.exit(1);
}

var csvData = "Bank Code,Sort Code,Bank,Branch, "
    + "Sort Code Component (Bank), Sort Code Component (Clearing Zone), Sort Code Component (Branch)\n"
  , lineRe = /^(\d{6})(\D+)(\d{6})(\D+)$/
  , delimiter = ','
  ;

lineReader
  .eachLine(fileName, function (line) {
    var matches = line.match(lineRe);
    if (matches) {
      var bankCode = matches[1];
      var bankName = matches[2].trim();
      var sortCode = matches[3];
      var branchName = matches[4].trim();
      // console.log("BankCode: ", bankCode);
      // console.log("Bank Name: ", bankName);
      // console.log("Branch Code: ", sortCode);
      // console.log("Branch Name: ", branchName);
      csvData += bankCode + delimiter;
      csvData += sortCode + delimiter;
      csvData += bankName + delimiter; // Short Name
      csvData += parseBranchName(branchName).replace(',', '-') + delimiter;
      // csvData += parseBranchName(branchName)[0] + delimiter; // Full Name
      // csvData += parseBranchName(branchName)[1] + delimiter; // Branch
      csvData += parseSortCode(sortCode)[0] + delimiter; // SortCode's Bank code
      csvData += parseSortCode(sortCode)[1] + delimiter; // SortCode's Clearing Zone code
      csvData += parseSortCode(sortCode)[2]; // SortCode's Branch code
      csvData += '\n';
    }
  })
  .then(function () {
    var fileToWrite = process.argv[3] || 'sortcodes-output.csv';
    fs.writeFileSync(fileToWrite, csvData, {
      encoding: 'utf8'
    });
    process.exit();
  });


function parseBranchName (branchName) {
  var output = branchName.split('-');
  if (output.length == 2) {
    return output[1].trim();
  }
  if (output.length > 2) {
    return output.slice(1).join('-').trim();
  }
  return output[0].trim();
}

function parseSortCode (sortCode) {
  return [
    sortCode.substr(0,2),
    sortCode.substr(2,2),
    sortCode.substr(4,2)
  ];
}