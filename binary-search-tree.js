class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (curr.left === null) {
          curr.left = newNode;
          return this;
        }
        curr = curr.left;
      } else {
        if (curr.right === null) {
          curr.right = newNode;
          return this;
        }
        curr = curr.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const insertHelper = (node, val) => {
      if (node === null) {
        return new Node(val);
      }
      if (val < node.val) {
        node.left = insertHelper(node.left, val);
      } else {
        node.right = insertHelper(node.right, val);
      }
      return node;
    };

    this.root = insertHelper(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currNode = this.root;
    while (currNode) {
      if (currNode.val === val) return currNode;
      if (currNode.val > val) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findHelper = (node, val) => {
      if (node === null) return undefined;
      if (node.val === val) return node;
      
      if (val < node.val) {
        return findHelper(node.left, val);
      } else {
        return findHelper(node.right, val);
      }
    };

    return findHelper(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    };

    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    };

    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [];
    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.val);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, val) => {
      if (node === null) {
        return null;
      }
      if (val === node.val) {
        // node with no children
        if (node.left === null && node.right === null) {
          return null;
        }
        // node with only one child
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        // node with two children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.val = tempNode.val;
        node.right = removeNode(node.right, tempNode.val);
        return node;
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else {
        node.right = removeNode(node.right, val);
        return node;
      }
    };

    this.root = removeNode(this.root, val);
    return this;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const height = (node) => {
      if (node === null) return -1;
      return Math.max(height(node.left), height(node.right)) + 1;
    };

    const checkBalance = (node) => {
      if (node === null) return true;
      const leftHeight = height(node.left);
      const rightHeight = height(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return checkBalance(node.left) && checkBalance(node.right);
    };

    return checkBalance(this.root);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (this.root === null || (this.root.left === null && this.root.right === null)) {
      return undefined;
    }

    let parent = null;
    let current = this.root;

    while (current.right !== null) {
      parent = current;
      current = current.right;
    }

    if (current.left !== null) {
      current = current.left;
      while (current.right !== null) {
        current = current.right;
      }
      return current.val;
    }

    return parent.val;
  }
}

module.exports = BinarySearchTree;
