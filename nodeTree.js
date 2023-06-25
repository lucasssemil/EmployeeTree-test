export class Node {
  constructor(name, jobTitle) {
    this.name = name;
    this.jobTitle = jobTitle;
    this.children = [];
    this.parent = null;
  }
}

export class Tree {
  constructor() {
    this.root = null;
  }

  search(node, name) {
    if (node.name === name) {
      return node;
    }
    //for each child im node children if the node name equal search name
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
