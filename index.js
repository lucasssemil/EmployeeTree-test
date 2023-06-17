class Node {
  constructor(name, jobTitle) {
    this.name = name;
    this.jobTitle = jobTitle;
    this.children = [];
    this.parent = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  search(node, name) {
    if (node.name === name) {
      return node;
    }

    for (let child of node.children) {
      const foundNode = this.search(child, name);
      if (foundNode) {
        return foundNode;
      }
    }

    return null;
  }

  insertChild(parentNode, childNode) {
    parentNode.children.push(childNode);
    childNode.parent = parentNode;
  }

  insertParent(childNode, parentNode) {
    if (childNode.parent) {
      const index = childNode.parent.children.indexOf(childNode);
      childNode.parent.children.splice(index, 1);
    }

    parentNode.children.push(childNode);
    childNode.parent = parentNode;
  }

  printAll(node, indent = "") {
    console.log(indent + "Node:", node.name, "Job Title:", node.jobTitle);

    for (let child of node.children) {
      this.printAll(child, indent + "  ");
    }
  }

  printAllParent(node) {
    const stack = [];
    let currentNode = node;

    while (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.parent;
    }

    while (stack.length > 0) {
      const parentNode = stack.pop();
      console.log(
        "Parent:",
        parentNode.name,
        "Job Title:",
        parentNode.jobTitle
      );
    }
  }

  printAllChild(node) {
    for (let child of node.children) {
      console.log("Child:", child.name, "Job Title:", child.jobTitle);
      this.printAllChild(child);
    }
  }
}

// Usage example
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
temp = tree.search(root, "emil");
if (temp) tree.insertChild(temp, new Node("lucas", "dev"));

// Print all nodes in the tree with indentation
tree.printAll(root);
console.log("----");
tree.printAllParent(temp);
console.log("----");
console.log("test");
