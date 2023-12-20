import { Node, Tree } from "./nodeTree.js";
// import { writeOutput } from "./server.js";

let jsonOutput = null;
let toOutput = [];
let errorData = [];
let valid = true;
let projectsList = [];

function writeFileReq(data) {
  fetch("http://localhost:3000/write-file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: data }),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}
function processJson(jsonData) {
  jsonData.forEach((data) => {
    projectsList.push(data.projectName);
    let employee = []; //reset every project
    employee.push({
      // just to save list of employee with the project name
      employee: data.employees,
      project: data.projectName,
    });
    const tempTree = new Tree();
    const projectTree = data.employeeHierarchies;
    projectTree.forEach((row) => {
      //node insertion based on jsonData
      for (let i = 0; i < row.directReports.length; i++) {
        let parent = tempTree.findNode(row.employeeName);
        let child = tempTree.findNode(row.directReports[i]);
        if (!parent) parent = new Node(row.employeeName); //for first node initialise
        if (!child) child = new Node(row.directReports[i]);
        if (parent.parent && child.parent)
          //if both child and parent have parent it will produce a node with more than one parent
          errorData.push({
            code: "101",
            name: row.directReports[i],
            project: data.projectName,
          });
        tempTree.addNode(parent, child);
      }
    });
    let find = data.employeeHierarchiesToDisplay;
    // let find = tempTree.findNode(element.employeeHierarchiesToDisplay);
    find.forEach((staff) => {
      let checkNode = tempTree.findNode(staff);
      if (checkNode) {
        let tempOutput = tempTree.printNode(checkNode);
        toOutput.push({
          value: tempOutput,
          project: data.projectName,
        });
      }
    });
    //check every employee, is it already have a hierarchy
    employee.forEach((data) => {
      data.employee.forEach((row) => {
        let find = tempTree.findNode(row);
        if (!find)
          errorData.push({
            code: "102",
            name: row,
            project: data.project,
          });
      });
    });
  });
}
function readSingleFile(e) {
  const file = e.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    const contents = e.target.result;

    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  const element = document.getElementById("file-content");
  element.textContent = contents;
  jsonOutput = JSON.parse(contents);
  //check json format
  jsonOutput.forEach((data) => {
    if (!data.hasOwnProperty("projectName")) valid = false;
    if (!data.hasOwnProperty("employees")) valid = false;
    if (!data.hasOwnProperty("employeeHierarchies")) valid = false;
    if (!data.hasOwnProperty("employeeHierarchiesToDisplay")) valid = false;
    data.employeeHierarchies.forEach((row) => {
      if (!row.hasOwnProperty("employeeName")) valid = false;
      if (!row.hasOwnProperty("directReports")) valid = false;
    });
  });
  if (valid) processJson(jsonOutput);
  else window.alert("JSON Format Error");
}
function getJsonData(data, key) {
  return data.filter(function (data) {
    return data.project === key;
  });
}
function showResult() {
  //mapping the data
  let output = [];
  projectsList.forEach((data) => {
    let projectData = {};
    let tempData = [];
    let arrayError = [];
    projectData.projectName = data;
    getJsonData(errorData, data).forEach((item) => {
      //check if error exist
      let tempError = {};
      tempError.code = item.code;
      tempError.name = [];
      tempError.name.push(item.name);
      arrayError.push(tempError);
    });
    if (arrayError.length > 0) {
      let stringError = "";
      if (arrayError[0].code == "101") stringError = " has multiple managers";
      if (arrayError[0].code == "102") stringError = " not having hierarchy";
      projectData.error =
        "unable to process employee tree. one or more employee" + stringError;
    } else {
      getJsonData(toOutput, data).forEach((item) => {
        let arrayData = {};
        arrayData.employee = item.value.shift();
        let sp = item.value;
        arrayData.superiors = sp;
        tempData.push(arrayData);
      });
      projectData.employeeHierarchies = tempData;
    }
    output.push(projectData);
  });
  const element2 = document.getElementById("file-output");
  element2.textContent = JSON.stringify(output, null, 2);
  writeFileReq(output);
}

const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", readSingleFile, false);

const outputButton = document.getElementById("button-output");
outputButton.addEventListener("click", showResult);
