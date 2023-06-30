export class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.parent = null;
  }
}

export class Tree {
  constructor() {
    this.root = null;
  }
  //this addNode only adding child/parent to node in the parameter
  addNode(parentNode, childNode) {
    if (!this.root) {
      this.root = parentNode;
    }

    if (childNode === this.root) {
      this.root = parentNode;
    }
    childNode.parent = parentNode;
    parentNode.children.push(childNode);
  }
  //combine with findNode to find the coresponding node within the tree
  findNode(name, currentNode = this.root) {
    // starting from root
    if (!currentNode) return null; //for if tree is empty
    if (currentNode.name === name) {
      return currentNode;
    }

    for (const childNode of currentNode.children) {
      const foundNode = this.findNode(name, childNode); //recursive for each children available
      if (foundNode) {
        return foundNode;
      }
    }

    return null;
  }

  printNode(node, path = []) {
    while (node.parent !== null) {
      path.push(node.name);
      node = node.parent;
    }
    path.push(node.name);
    return path;
  }
}
