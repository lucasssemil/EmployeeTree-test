import { Node, Tree } from "./nodeTree.js";

let jsonOutput = null;

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
  const element2 = document.getElementById("file-output");
  jsonOutput = JSON.parse(contents);
  element.textContent = contents;
  element2.textContent = contents;
}

function showResult() {
  if (jsonOutput) console.log(jsonOutput);
  else console.log("no selected file");
}

const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", readSingleFile, false);

const outputButton = document.getElementById("button-output");
outputButton.addEventListener("click", showResult);

const tree = new Tree();

// Create nodes
const root = new Node("Root", "CEO");
const node1 = new Node("Node 1", "Manager");
const node2 = new Node("Node 2", "Developer");
const node3 = new Node("Node 3", "Designer");

// Insert nodes as children
tree.insertChild(root, node1);
tree.insertChild(root, node2);
tree.insertChild(node1, node3);
tree.insertChild(node1, new Node("emil", "dev"));
let temp = tree.search(root, "emil");
if (temp) tree.insertChild(temp, new Node("lucas", "dev"));

// Print all nodes in the tree with indentation
tree.printAll(root);
console.log("----");
tree.printAllParent(temp);
console.log("----");
