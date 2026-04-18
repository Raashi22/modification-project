// Theme toggle and persistency
const themeSwitch = document.getElementById('theme-switch');
const themeLabel = document.getElementById('theme-label');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeSwitch.checked = theme === 'dark';
  themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
  themeSwitch.setAttribute('aria-checked', theme === 'dark');
  localStorage.setItem('theme', theme);
}

themeSwitch.addEventListener('change', () => {
  applyTheme(themeSwitch.checked ? 'dark' : 'light');
});

// Load theme on page load
applyTheme(localStorage.getItem('theme') || 'light');

// Tabs and operations listing
const tabs = document.querySelectorAll('.tab-button');
const opsPane = document.querySelector('.operations');

const operations = {
  array: ['Insert at End', 'Insert at Index', 'Delete at Index', 'Delete from End', 'Search', 'Clear Array'],
  stack: ['Push', 'Pop'],
  queue: ['Enqueue', 'Dequeue'],
  linkedlist: ['Insert at End', 'Insert at Start', 'Delete at Index'],
  doublylinkedlist: [
    'Insert at Start',
    'Insert at End',
    'Insert at Index',
    'Delete from Start',
    'Delete from End',
    'Delete at Index',
  ],
  circularlinkedlist: [
    'Insert at Start',
    'Insert at End',
    'Insert After Value',
    'Delete from Start',
    'Delete from End',
    'Delete Value',
  ],
  tree: ['Insert Value', 'Delete Value', 'In-order Traversal', 'Pre-order Traversal', 'Post-order Traversal'],
  graph: ['Add Node', 'Add Edge', 'DFS Traversal', 'BFS Traversal'],
};

tabs.forEach((tab, idx) => {
  tab.addEventListener('click', () => {
    // Handle active tab styles and aria attributes
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.tabIndex = -1;
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.tabIndex = 0;
    tab.focus();

    // Show correct panel
    document.querySelectorAll('.panel').forEach((panel) => panel.classList.remove('active'));
    const selectedPanel = document.getElementById(tab.dataset.tab);
    selectedPanel.classList.add('active');

    // Update operations list
    const opsList = operations[tab.dataset.tab];
    opsPane.innerHTML = `
      <h3>Available Operations</h3>
      <ul>${opsList.map((op) => `<li>${op}</li>`).join('')}</ul>
    `;
    // Trigger pulse highlight
    opsPane.classList.remove('updated');
    void opsPane.offsetWidth; // Trigger reflow
    opsPane.classList.add('updated');

    // Clear previous traversal output
    document.getElementById('tree-traversal-output').textContent = 'Traversal Output: ';
    document.getElementById('graph-traversal-output').textContent = 'Traversal Output: ';
    document.getElementById('array-search-output').textContent = 'Search Result: ';


    // Render the active data structure
    switch (tab.dataset.tab) {
      case 'array':
        renderArray();
        break;
      case 'stack':
        renderStack();
        break;
      case 'queue':
        renderQueue();
        break;
      case 'linkedlist':
        renderLinkedList();
        break;
      case 'doublylinkedlist':
        renderDoublyLinkedList();
        break;
      case 'circularlinkedlist':
        renderCircularLinkedList();
        break;
      case 'tree':
        renderTree();
        break;
      case 'graph':
        renderGraph();
        break;
    }
  });

  // Keyboard nav for tabs (left/right arrows)
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      tabs[(idx + 1) % tabs.length].click();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      tabs[(idx - 1 + tabs.length) % tabs.length].click();
    }
  });
});

// Move initialization to end of file after all functions are defined

// Data structures
let array = [];
let stack = [];
let queue = [];
let linkedList = [];

// Doubly Linked List Node class
class DoublyNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  unshift(value) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return newNode;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current;
    if (index <= this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev;
      }
    }
    return current;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    const newNode = new DoublyNode(value);
    const beforeNode = this.get(index - 1);
    const afterNode = beforeNode.next;

    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;
    this.length++;
    return true;
  }

  pop() {
    if (!this.head) return null;
    const poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }

  shift() {
    if (!this.head) return null;
    const shiftedNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = shiftedNode.next;
      this.head.prev = null;
      shiftedNode.next = null;
    }
    this.length--;
    return shiftedNode;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const removedNode = this.get(index);
    const beforeNode = removedNode.prev;
    const afterNode = removedNode.next;

    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;
    return removedNode;
  }

  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }
}

const doublyLinkedList = new DoublyLinkedList();

// Circular Linked List Node class
class CircularNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new CircularNode(value);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head; // Points to itself
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head;
    }
    this.length++;
    return newNode;
  }

  unshift(value) {
    const newNode = new CircularNode(value);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return newNode;
  }

  insertAfter(existingValue, newValue) {
    if (!this.head) return false;
    let current = this.head;
    do {
      if (current.value == existingValue) {
        const newNode = new CircularNode(newValue);
        newNode.next = current.next;
        current.next = newNode;
        this.length++;
        return true;
      }
      current = current.next;
    } while (current !== this.head);
    return false;
  }

  pop() {
    if (this.length === 0) return null;
    let current = this.head;
    let prev = null;
    if (this.length === 1) {
      this.head = null;
    } else {
      while (current.next !== this.head) {
        prev = current;
        current = current.next;
      }
      prev.next = this.head;
    }
    this.length--;
    return current;
  }

  shift() {
    if (this.length === 0) return null;
    const removedNode = this.head;
    if (this.length === 1) {
      this.head = null;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      this.head = this.head.next;
      current.next = this.head;
    }
    this.length--;
    return removedNode;
  }

  remove(value) {
    if (!this.head) return null;
    // Handle removal of head specifically for circular list
    if (this.head.value == value) {
      if (this.length === 1) {
        this.head = null;
      } else {
        let current = this.head;
        while (current.next !== this.head) {
          current = current.next;
        }
        this.head = this.head.next;
        current.next = this.head;
      }
      this.length--;
      return value;
    }

    let current = this.head.next;
    let prev = this.head;
    // Iterate until we find the value or come back to head
    while (current !== this.head) {
      if (current.value == value) {
        prev.next = current.next;
        this.length--;
        return value;
      }
      prev = current;
      current = current.next;
    }
    return null; // Value not found
  }

  toArray() {
    const arr = [];
    if (!this.head) return arr;
    let current = this.head;
    do {
      arr.push(current.value);
      current = current.next;
    } while (current !== this.head);
    return arr;
  }
}

const circularLinkedList = new CircularLinkedList();


// Tree Data Structure (Binary Search Tree with proper BST rules)
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    // For visualization:
    this.x = 0;
    this.y = 0;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
    this.size = 0; // Keep track of the number of nodes
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      this.size++;
      console.log(`Inserted ${value} as root`);
      return this;
    }

    // BST insertion: find the correct position based on value
    let current = this.root;
    while (true) {
      if (value < current.value) {
        // Go to left subtree
        if (current.left === null) {
          current.left = newNode;
          this.size++;
          console.log(`Inserted ${value} as left child of ${current.value}`);
          return this;
        } else {
          current = current.left;
        }
      } else if (value > current.value) {
        // Go to right subtree
        if (current.right === null) {
          current.right = newNode;
          this.size++;
          console.log(`Inserted ${value} as right child of ${current.value}`);
          return this;
        } else {
          current = current.right;
        }
      } else {
        // Value already exists in tree
        alert(`Value ${value} already exists in the tree!`);
        return this;
      }
    }
  }

  // Helper to find the deepest rightmost node (for deletion replacement)
  _findDeepestRightmostNode() {
    if (!this.root) return null;
    const queue = [this.root];
    let deepestNode = null;
    while (queue.length > 0) {
      deepestNode = queue.shift();
      if (deepestNode.left) queue.push(deepestNode.left);
      if (deepestNode.right) queue.push(deepestNode.right);
    }
    return deepestNode;
  }

  // Find a node by value and return it with its parent
  findNode(value) {
    if (!this.root) return { node: null, parent: null };
    
    let current = this.root;
    let parent = null;
    
    while (current) {
      if (value === current.value) {
        return { node: current, parent: parent };
      } else if (value < current.value) {
        parent = current;
        current = current.left;
      } else {
        parent = current;
        current = current.right;
      }
    }
    
    return { node: null, parent: null };
  }

  // Find inorder successor (smallest node in right subtree) and its parent
  findInorderSuccessor(node) {
    let current = node.right;
    let parent = node;
    
    while (current && current.left) {
      parent = current;
      current = current.left;
    }
    
    return { successor: current, parent: parent };
  }

  // Simple deletion with proper BST rules
  delete(value) {
    if (!this.root) {
      alert('Tree is empty! Cannot delete.');
      return false;
    }

    const { node: nodeToDelete, parent: parentNode } = this.findNode(value);
    
    if (!nodeToDelete) {
      alert(`Value ${value} not found in tree!`);
      return false;
    }

    // Case 1: Node has no children (leaf node)
    if (!nodeToDelete.left && !nodeToDelete.right) {
      if (parentNode) {
        if (parentNode.left === nodeToDelete) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
      } else {
        // Deleting root node
        this.root = null;
      }
      this.size--;
      return true;
    }

    // Case 2: Node has one child
    if (!nodeToDelete.left || !nodeToDelete.right) {
      const child = nodeToDelete.left || nodeToDelete.right;
      
      if (parentNode) {
        if (parentNode.left === nodeToDelete) {
          parentNode.left = child;
        } else {
          parentNode.right = child;
        }
      } else {
        // Deleting root node
        this.root = child;
      }
      this.size--;
      return true;
    }

    // Case 3: Node has two children
    const { successor, parent: successorParent } = this.findInorderSuccessor(nodeToDelete);
    nodeToDelete.value = successor.value;
    
    // Delete the successor (it will be case 1 or 2)
    if (successor.left || successor.right) {
      // Case 2: Successor has one child
      const successorChild = successor.left || successor.right;
      if (successorParent.left === successor) {
        successorParent.left = successorChild;
      } else {
        successorParent.right = successorChild;
      }
    } else {
      // Case 1: Successor is a leaf
      if (successorParent.left === successor) {
        successorParent.left = null;
      } else {
        successorParent.right = null;
      }
    }
    
    this.size--;
    return true;
  }



  // Traversal methods (remain the same)
  inOrder() {
    const result = [];
    function traverse(node) {
      if (node) {
        if (node.left) traverse(node.left);
        result.push(node.value);
        if (node.right) traverse(node.right);
      }
    }
    traverse(this.root);
    return result;
  }

  preOrder() {
    const result = [];
    function traverse(node) {
      if (node) {
        result.push(node.value);
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
      }
    }
    traverse(this.root);
    return result;
  }

  postOrder() {
    const result = [];
    function traverse(node) {
      if (node) {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
        result.push(node.value);
      }
    }
    traverse(this.root);
    return result;
  }

  // Animated traversal methods
  async inOrderAnimated(onNodeVisit, onComplete) {
    const result = [];
    
    async function traverse(node) {
      if (node) {
        if (node.left) await traverse(node.left);
        
        result.push(node.value);
        if (onNodeVisit) {
          await onNodeVisit(node.value, result.length - 1);
        }
        
        if (node.right) await traverse(node.right);
      }
    }
    
    await traverse(this.root);
    if (onComplete) onComplete(result);
    return result;
  }

  async preOrderAnimated(onNodeVisit, onComplete) {
    const result = [];
    
    async function traverse(node) {
      if (node) {
        result.push(node.value);
        if (onNodeVisit) {
          await onNodeVisit(node.value, result.length - 1);
        }
        
        if (node.left) await traverse(node.left);
        if (node.right) await traverse(node.right);
      }
    }
    
    await traverse(this.root);
    if (onComplete) onComplete(result);
    return result;
  }

  async postOrderAnimated(onNodeVisit, onComplete) {
    const result = [];
    
    async function traverse(node) {
      if (node) {
        if (node.left) await traverse(node.left);
        if (node.right) await traverse(node.right);
        
        result.push(node.value);
        if (onNodeVisit) {
          await onNodeVisit(node.value, result.length - 1);
        }
      }
    }
    
    await traverse(this.root);
    if (onComplete) onComplete(result);
    return result;
  }
}

const binaryTree = new BinaryTree(); // Renamed instance

// Graph Data Structure (Adjacency List) - Now supports directed edges
class GraphNode {
  constructor(value) {
    this.value = value;
    // For visualization:
    this.x = 0;
    this.y = 0;
  }
}

class Graph {
  constructor() {
    this.adjacencyList = {}; // Stores { nodeValue: [neighbor1, neighbor2] }
    this.nodes = {}; // Stores { nodeValue: GraphNode instance }
    this.edges = []; // Stores directed edges as {from, to} pairs
  }

  addNode(value) {
    if (!this.adjacencyList[value]) {
      this.adjacencyList[value] = [];
      this.nodes[value] = new GraphNode(value);
      return true;
    }
    return false;
  }

  addEdge(fromNode, toNode) {
    if (this.adjacencyList[fromNode] && this.adjacencyList[toNode]) {
      // Add directed edge from fromNode to toNode
      if (!this.adjacencyList[fromNode].includes(toNode)) {
        this.adjacencyList[fromNode].push(toNode);
        this.edges.push({ from: fromNode, to: toNode });
      }
      return true;
    }
    return false; // One or both nodes not found
  }

  removeEdge(fromNode, toNode) {
    if (this.adjacencyList[fromNode]) {
      this.adjacencyList[fromNode] = this.adjacencyList[fromNode].filter(v => v !== toNode);
      // Remove from edges array
      this.edges = this.edges.filter(edge => !(edge.from === fromNode && edge.to === toNode));
      return true;
    }
    return false;
  }

  removeNode(nodeValue) {
    if (!this.adjacencyList[nodeValue]) return false;
    
    // Remove all edges connected to this node
    this.edges = this.edges.filter(edge => edge.from !== nodeValue && edge.to !== nodeValue);
    
    // Remove from adjacency lists
    for (let neighbor of this.adjacencyList[nodeValue]) {
      this.adjacencyList[neighbor] = this.adjacencyList[neighbor].filter(v => v !== nodeValue);
    }
    
    delete this.adjacencyList[nodeValue];
    delete this.nodes[nodeValue];
    return true;
  }

  // Graph Traversal
  dfs(startNode) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    (function dfsRecursive(node) {
      if (!node || !adjacencyList[node]) return;
      visited[node] = true;
      result.push(node);
      adjacencyList[node].forEach(neighbor => {
        if (!visited[neighbor]) {
          dfsRecursive(neighbor);
        }
      });
    })(startNode);

    return result;
  }

  bfs(startNode) {
    const queue = [startNode];
    const result = [];
    const visited = { [startNode]: true };
    const adjacencyList = this.adjacencyList;

    if (!adjacencyList[startNode]) return [];

    let current;
    while (queue.length) {
      current = queue.shift();
      result.push(current);

      adjacencyList[current].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  // Animated traversal methods
  async dfsAnimated(startNode, onNodeVisit, onComplete) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    async function dfsRecursive(node) {
      if (!node || !adjacencyList[node]) return;
      
      visited[node] = true;
      result.push(node);
      
      // Call the callback to animate the node visit
      if (onNodeVisit) {
        await onNodeVisit(node, result.length - 1);
      }

      // Visit neighbors in order
      for (const neighbor of adjacencyList[node]) {
        if (!visited[neighbor]) {
          await dfsRecursive(neighbor);
        }
      }
    }

    await dfsRecursive(startNode);
    
    if (onComplete) {
      onComplete(result);
    }
    
    return result;
  }

  async bfsAnimated(startNode, onNodeVisit, onComplete) {
    const queue = [startNode];
    const result = [];
    const visited = { [startNode]: true };
    const adjacencyList = this.adjacencyList;

    if (!adjacencyList[startNode]) {
      if (onComplete) onComplete(result);
      return result;
    }

    while (queue.length) {
      const current = queue.shift();
      result.push(current);
      
      // Call the callback to animate the node visit
      if (onNodeVisit) {
        await onNodeVisit(current, result.length - 1);
      }

      // Add unvisited neighbors to queue
      for (const neighbor of adjacencyList[current]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }
    
    if (onComplete) {
      onComplete(result);
    }
    
    return result;
  }
}

const graph = new Graph();


// Render helpers with animation
const createNode = (value, type = '') => {
  const div = document.createElement('div');
  div.className = `node ${type}`;
  div.textContent = value;
  return div;
};

// SVG helper to create an SVG element
const createSvgElement = (tag, attributes = {}) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
};


// Array: render elements horizontally with indices
const renderArray = () => {
  const container = document.getElementById('array-container');
  container.innerHTML = '';
  container.classList.add('array-container');
  
  if (array.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'empty-message';
    emptyMessage.textContent = 'Array is empty';
    container.appendChild(emptyMessage);
    return;
  }
  
  // Create array elements with indices
  array.forEach((value, index) => {
    const elementContainer = document.createElement('div');
    elementContainer.className = 'array-element-container';
    
    const indexLabel = document.createElement('div');
    indexLabel.className = 'array-index';
    indexLabel.textContent = index;
    
    const valueElement = document.createElement('div');
    valueElement.className = 'array-element';
    valueElement.textContent = value;
    
    elementContainer.appendChild(indexLabel);
    elementContainer.appendChild(valueElement);
    container.appendChild(elementContainer);
  });
};

// Stack: ensure numbers stack vertically (one on top of the other)
const renderStack = () => {
  const container = document.getElementById('stack-container');
  container.innerHTML = '';
  container.classList.add('stack-container'); // Ensure vertical stacking
  // Stack elements are rendered from bottom to top, newest on top
  stack.forEach((value) => {
    const node = createNode(value);
    container.appendChild(node);
  });
};

const renderQueue = () => {
  const container = document.getElementById('queue-container');
  const newQueue = [...queue];
  const oldNodes = Array.from(container.children);

  // Identify nodes that are no longer in the queue (dequeued)
  oldNodes.forEach(node => {
    if (!newQueue.some(val => String(val) === node.textContent)) {
      node.classList.add('node-exiting-queue');
      node.addEventListener('animationend', () => {
        node.remove();
      }, { once: true });
    }
  });

  // Create a map of existing nodes by their value for efficient lookup
  const existingNodeMap = new Map();
  oldNodes.forEach(node => existingNodeMap.set(node.textContent, node));

  // Build the new set of nodes to render
  const nodesToRender = [];
  newQueue.forEach(value => {
    let nodeElement;
    if (existingNodeMap.has(String(value))) {
      // Node already exists, reuse it and remove from map
      nodeElement = existingNodeMap.get(String(value));
      existingNodeMap.delete(String(value)); // Mark as processed
      nodeElement.classList.remove('node-exiting-queue'); // Ensure it's not marked for removal if it reappears
    } else {
      // New node, create and apply entering animation
      nodeElement = createNode(value, 'node-entering-queue');
      nodeElement.addEventListener('animationend', () => {
        nodeElement.classList.remove('node-entering-queue');
      }, { once: true });
    }
    nodesToRender.push(nodeElement);
  });

  // Clear container only after nodes for removal have been processed for animation
  container.innerHTML = '';
  nodesToRender.forEach(node => container.appendChild(node));
};


const renderLinkedList = () => {
  const container = document.getElementById('linkedlist-container');
  container.innerHTML = '';
  linkedList.forEach((value) => {
    const node = createNode(value, 'singly-node');
    container.appendChild(node);
  });
};

const renderDoublyLinkedList = () => {
  const container = document.getElementById('doublylinkedlist-container');
  container.innerHTML = '';
  let current = doublyLinkedList.head;
  while (current) {
    const node = createNode(current.value, 'doubly-node');
    container.appendChild(node);
    current = current.next;
  }
};

// --- Circular Linked List Visualization (horizontal, like diagram) ---
const renderCircularLinkedList = () => {
  const container = document.getElementById('circularlinkedlist-container');
  container.innerHTML = '';
  if (!circularLinkedList.head) return;

  // Gather node values
  const nodes = [];
  let current = circularLinkedList.head;
  let count = 0;
  const maxNodes = circularLinkedList.length * 2 + 1; // Safety break
  do {
    nodes.push(current.value);
    current = current.next;
    count++;
  } while (current !== circularLinkedList.head && count < maxNodes);

  // Layout constants
  const nodeWidth = 60;
  const nodeHeight = 50;
  const gap = 50;
  const startX = 80;
  const startY = 60;

  // SVG for arrows
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', (nodes.length * (nodeWidth + gap) + 100));
  svg.setAttribute('height', 160);
  svg.style.position = 'absolute';
  svg.style.left = '0';
  svg.style.top = '0';
  svg.style.pointerEvents = 'none';
  container.appendChild(svg);

  // Arrowhead marker
  if (!svg.querySelector('marker')) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '10');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');
    marker.setAttribute('markerUnits', 'strokeWidth');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M0,0 L10,3.5 L0,7 Z');
    path.setAttribute('fill', 'var(--accent)');
    marker.appendChild(path);
    defs.appendChild(marker);
    svg.appendChild(defs);
  }

  // Draw rightward arrows between nodes
  for (let i = 0; i < nodes.length - 1; i++) {
    const x1 = startX + i * (nodeWidth + gap) + nodeWidth;
    const y1 = startY + nodeHeight / 2;
    const x2 = startX + (i + 1) * (nodeWidth + gap);
    const y2 = y1;
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    arrow.setAttribute('x1', x1);
    arrow.setAttribute('y1', y1);
    arrow.setAttribute('x2', x2);
    arrow.setAttribute('y2', y2);
    arrow.setAttribute('stroke', 'var(--accent)');
    arrow.setAttribute('stroke-width', '2');
    arrow.setAttribute('marker-end', 'url(#arrowhead)');
    svg.appendChild(arrow);
  }

  // Draw curved arrow from last node to head
  if (nodes.length > 1) {
    const xStart = startX + (nodes.length - 1) * (nodeWidth + gap) + nodeWidth;
    const yStart = startY + nodeHeight / 2;
    const xEnd = startX - 10;
    const yEnd = startY + nodeHeight / 2;
    const curveY = yStart + 60;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${xStart},${yStart} Q${xStart + 30},${curveY} ${(xStart + xEnd) / 2},${curveY} Q${xEnd - 30},${curveY} ${xEnd},${yEnd}`);
    path.setAttribute('stroke', 'var(--accent)');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('marker-end', 'url(#arrowhead)');
    svg.appendChild(path);
  }

  // Draw head label
  const headLabel = document.createElement('div');
  headLabel.textContent = 'head';
  headLabel.style.position = 'absolute';
  headLabel.style.left = `${startX - 50}px`;
  headLabel.style.top = `${startY + nodeHeight / 2 - 10}px`;
  headLabel.style.color = 'var(--accent)';
  headLabel.style.fontWeight = 'bold';
  container.appendChild(headLabel);

  // Draw nodes as boxes
  for (let i = 0; i < nodes.length; i++) {
    const nodeDiv = createNode(nodes[i], ''); // Use .node class for blue theme
    nodeDiv.style.position = 'absolute';
    nodeDiv.style.left = `${startX + i * (nodeWidth + gap)}px`;
    nodeDiv.style.top = `${startY}px`;
    nodeDiv.style.width = `${nodeWidth}px`;
    nodeDiv.style.height = `${nodeHeight}px`;
    nodeDiv.style.display = 'flex';
    nodeDiv.style.alignItems = 'center';
    nodeDiv.style.justifyContent = 'center';
    nodeDiv.style.fontSize = '1.5rem';
    nodeDiv.style.zIndex = 2;
    container.appendChild(nodeDiv);
  }

  // Set container height for layout
  container.style.position = 'relative';
  container.style.height = '170px';
  container.style.minWidth = `${nodes.length * (nodeWidth + gap) + 100}px`;
};

// --- Tree Visualization (using SVG) ---
const NODE_RADIUS = 20;
const LEVEL_HEIGHT = 80; // Vertical space between levels

const renderTree = () => {
  const svg = document.getElementById('tree-svg-container');
  svg.innerHTML = ''; // Clear previous drawing
  const traversalOutput = document.getElementById('tree-traversal-output');
  traversalOutput.textContent = 'Traversal Output: ';

  // Clear any previous animation state
  window.currentTreeAnimation = null;

  if (!binaryTree.root) {
    // Show a text message if the tree is empty
    const textElement = createSvgElement('text', {
      x: svg.viewBox.baseVal.width / 2,
      y: svg.viewBox.baseVal.height / 2,
      'text-anchor': 'middle',
      'alignment-baseline': 'middle',
      fill: 'var(--fg)',
      'font-size': '1.5rem',
    });
    textElement.textContent = 'Tree is empty.';
    svg.appendChild(textElement);
    return;
  }

  // Calculate tree dimensions
  const maxLevel = getMaxLevel(binaryTree.root, 0);
  const svgWidth = 800; // Fixed width
  const svgHeight = Math.max(500, (maxLevel + 1) * LEVEL_HEIGHT + 160); // Dynamic height based on levels
  
  // Update SVG viewBox to accommodate all levels
  svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
  
  const padding = 80; // Increased padding
  const availableWidth = svgWidth - (2 * padding);
  
  // Get all nodes organized by level
  const levelNodes = getNodesByLevel(binaryTree.root);
  
  // Calculate positions for all nodes
  const nodePositions = new Map();
  
  // Position nodes level by level with proper spacing
  for (let level = 0; level < levelNodes.length; level++) {
    const nodes = levelNodes[level];
    const y = padding + NODE_RADIUS + (level * LEVEL_HEIGHT);
    
    if (nodes.length === 1) {
      // Single node - center it
      nodePositions.set(nodes[0], { x: svgWidth / 2, y });
    } else {
      // Multiple nodes - distribute with proper spacing
      const minSpacing = 80; // Minimum spacing between nodes
      const totalWidth = (nodes.length - 1) * minSpacing;
      
      if (totalWidth <= availableWidth) {
        // Enough space - distribute evenly
        const startX = (svgWidth - totalWidth) / 2;
        nodes.forEach((node, index) => {
          const x = startX + (index * minSpacing);
          nodePositions.set(node, { x, y });
        });
      } else {
        // Not enough space - use available width
        const spacing = availableWidth / (nodes.length - 1);
        const startX = padding + NODE_RADIUS;
        nodes.forEach((node, index) => {
          const x = startX + (index * spacing);
          nodePositions.set(node, { x, y });
        });
      }
    }
  }

  // Draw edges first
  drawEdges(binaryTree.root, nodePositions, svg);

  // Draw nodes
  drawNodes(binaryTree.root, nodePositions, svg);
};

// Helper function to get maximum level
function getMaxLevel(node, level) {
  if (!node) return level - 1;
  return Math.max(
    getMaxLevel(node.left, level + 1),
    getMaxLevel(node.right, level + 1)
  );
}

// Helper function to get all nodes organized by level in correct BST order
function getNodesByLevel(root) {
  const levels = [];
  
  function traverse(node, level) {
    if (!node) return;
    
    if (!levels[level]) levels[level] = [];
    levels[level].push(node);
    
    // Traverse left first, then right to maintain BST order
    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  }
  
  traverse(root, 0);
  
  // Sort each level by value to ensure correct left-to-right order
  levels.forEach(level => {
    level.sort((a, b) => a.value - b.value);
  });
  
  return levels;
}


// Helper function to draw edges
function drawEdges(node, positions, svg) {
  if (!node) return;
  
  const { x, y } = positions.get(node);
  
  if (node.left) {
    const leftPos = positions.get(node.left);
    const line = createSvgElement('line', {
      x1: x,
      y1: y + NODE_RADIUS,
      x2: leftPos.x,
      y2: leftPos.y - NODE_RADIUS,
      class: 'tree-edge'
    });
    svg.appendChild(line);
    drawEdges(node.left, positions, svg);
  }
  
  if (node.right) {
    const rightPos = positions.get(node.right);
    const line = createSvgElement('line', {
      x1: x,
      y1: y + NODE_RADIUS,
      x2: rightPos.x,
      y2: rightPos.y - NODE_RADIUS,
      class: 'tree-edge'
    });
    svg.appendChild(line);
    drawEdges(node.right, positions, svg);
  }
}

// Helper function to draw nodes
function drawNodes(node, positions, svg) {
  if (!node) return;
  
  const { x, y } = positions.get(node);
  
  // Draw node (circle)
  const circle = createSvgElement('circle', {
    cx: x,
    cy: y,
    r: NODE_RADIUS,
    class: 'tree-node-circle',
    'data-node-value': node.value
  });
  svg.appendChild(circle);

  // Draw text inside node
  const text = createSvgElement('text', {
    x: x,
    y: y,
    'text-anchor': 'middle',
    'alignment-baseline': 'middle',
    class: 'tree-node-text',
    'data-node-value': node.value
  });
  text.textContent = node.value;
  svg.appendChild(text);
  
  // Recursively draw children
  drawNodes(node.left, positions, svg);
  drawNodes(node.right, positions, svg);
}


// --- Graph Visualization (using SVG) ---
const GRAPH_NODE_RADIUS = 25;
const GRAPH_CENTER_X = 400;
const GRAPH_CENTER_Y = 250;
const GRAPH_LAYOUT_RADIUS = 200; // Radius for circular layout

const renderGraph = () => {
  const svg = document.getElementById('graph-svg-container');
  svg.innerHTML = ''; // Clear previous drawing
  const traversalOutput = document.getElementById('graph-traversal-output');
  traversalOutput.textContent = 'Traversal Output: ';

  const nodesArray = Object.values(graph.nodes);
  if (nodesArray.length === 0) {
    // Show a text message if the graph is empty
    const textElement = createSvgElement('text', {
      x: svg.viewBox.baseVal.width / 2,
      y: svg.viewBox.baseVal.height / 2,
      'text-anchor': 'middle',
      'alignment-baseline': 'middle',
      fill: 'var(--fg)',
      'font-size': '1.5rem',
    });
    textElement.textContent = 'Graph is empty.';
    svg.appendChild(textElement);
    return;
  }

  // Clear any previous animation state
  window.currentTraversalAnimation = null;

  // Create arrow marker for directed edges
  const defs = createSvgElement('defs');
  const marker = createSvgElement('marker', {
    id: 'arrowhead',
    markerWidth: '10',
    markerHeight: '7',
    refX: '9',
    refY: '3.5',
    orient: 'auto',
    markerUnits: 'strokeWidth'
  });
  const arrowPath = createSvgElement('path', {
    d: 'M0,0 L10,3.5 L0,7 Z',
    fill: 'var(--accent)'
  });
  marker.appendChild(arrowPath);
  defs.appendChild(marker);
  svg.appendChild(defs);

  // Assign positions for circular layout
  const angleIncrement = (2 * Math.PI) / nodesArray.length;
  nodesArray.forEach((node, i) => {
    node.x = GRAPH_CENTER_X + GRAPH_LAYOUT_RADIUS * Math.cos(i * angleIncrement);
    node.y = GRAPH_CENTER_Y + GRAPH_LAYOUT_RADIUS * Math.sin(i * angleIncrement);
  });

  // Store positions by value for easy lookup
  const nodePositions = new Map();
  nodesArray.forEach(node => nodePositions.set(node.value, { x: node.x, y: node.y }));

  // Draw directed edges with arrows
  graph.edges.forEach(edge => {
    const fromNodePos = nodePositions.get(edge.from);
    const toNodePos = nodePositions.get(edge.to);
    
    if (fromNodePos && toNodePos) {
      // Calculate arrow position (slightly inside the target node)
      const dx = toNodePos.x - fromNodePos.x;
      const dy = toNodePos.y - fromNodePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const unitX = dx / distance;
      const unitY = dy / distance;
      
      const arrowStartX = fromNodePos.x + unitX * GRAPH_NODE_RADIUS;
      const arrowStartY = fromNodePos.y + unitY * GRAPH_NODE_RADIUS;
      const arrowEndX = toNodePos.x - unitX * GRAPH_NODE_RADIUS;
      const arrowEndY = toNodePos.y - unitY * GRAPH_NODE_RADIUS;
      
      const line = createSvgElement('line', {
        x1: arrowStartX,
        y1: arrowStartY,
        x2: arrowEndX,
        y2: arrowEndY,
        class: 'graph-edge',
        'marker-end': 'url(#arrowhead)',
        'stroke-width': '2'
      });
      svg.appendChild(line);
    }
  });

  // Draw nodes
  nodesArray.forEach(node => {
    const circle = createSvgElement('circle', {
      cx: node.x,
      cy: node.y,
      r: GRAPH_NODE_RADIUS,
      class: 'graph-node-circle',
      'data-node-value': node.value
    });
    svg.appendChild(circle);

    const text = createSvgElement('text', {
      x: node.x,
      y: node.y,
      'text-anchor': 'middle',
      'alignment-baseline': 'middle',
      class: 'graph-node-text',
      'data-node-value': node.value
    });
    text.textContent = node.value;
    svg.appendChild(text);
  });
};

// Helper functions for graph animation
const animateNodeVisit = async (nodeValue, visitOrder) => {
  console.log('Animating node:', nodeValue, 'visit order:', visitOrder);
  
  const svg = document.getElementById('graph-svg-container');
  const circle = svg.querySelector(`circle[data-node-value="${nodeValue}"]`);
  const text = svg.querySelector(`text[data-node-value="${nodeValue}"]`);
  
  console.log('Found elements:', { circle: !!circle, text: !!text });
  
  if (circle && text) {
    // Direct style manipulation - this will definitely work
    console.log('Starting animation for node:', nodeValue);
    
    // Step 1: Animate to blue (traversing state)
    circle.style.fill = '#0071e3'; // Blue color
    circle.style.stroke = '#0071e3';
    circle.style.strokeWidth = '3px';
    text.style.fill = 'white';
    text.style.fontWeight = '900';
    
    console.log('Applied blue color to node:', nodeValue);
    
    // Wait for the animation duration
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Step 2: Keep the visited state
    circle.classList.add('visited');
    text.classList.add('visited');
    
    console.log('Animation completed for node:', nodeValue);
  } else {
    console.error('Could not find elements for node:', nodeValue);
  }
  
  // Update traversal output
  const traversalOutput = document.getElementById('graph-traversal-output');
  const currentPath = traversalOutput.textContent.replace('Traversal Output: ', '');
  const newPath = currentPath ? `${currentPath} → ${nodeValue}` : nodeValue;
  traversalOutput.textContent = `Traversal Output: ${newPath}`;
};

const clearGraphAnimation = () => {
  const svg = document.getElementById('graph-svg-container');
  const circles = svg.querySelectorAll('.graph-node-circle');
  const texts = svg.querySelectorAll('.graph-node-text');
  const edges = svg.querySelectorAll('.graph-edge');
  
  circles.forEach(circle => {
    circle.classList.remove('visited', 'traversing');
    // Reset styles to default
    circle.style.fill = '';
    circle.style.stroke = '';
    circle.style.strokeWidth = '';
  });
  
  texts.forEach(text => {
    text.classList.remove('visited', 'traversing');
    // Reset styles to default
    text.style.fill = '';
    text.style.fontWeight = '';
  });
  
  edges.forEach(edge => {
    edge.classList.remove('visited');
  });
  
  const traversalOutput = document.getElementById('graph-traversal-output');
  traversalOutput.textContent = 'Traversal Output: ';
};

// Tree animation helper functions
const animateTreeNodeVisit = async (nodeValue, visitOrder) => {
  console.log('Animating tree node:', nodeValue, 'visit order:', visitOrder);
  
  const svg = document.getElementById('tree-svg-container');
  const circle = svg.querySelector(`circle[data-node-value="${nodeValue}"]`);
  const text = svg.querySelector(`text[data-node-value="${nodeValue}"]`);
  
  console.log('Found tree elements:', { circle: !!circle, text: !!text });
  
  if (circle && text) {
    // Direct style manipulation for tree nodes
    console.log('Starting tree animation for node:', nodeValue);
    
    // Step 1: Animate to blue (traversing state)
    circle.style.fill = '#0071e3'; // Blue color
    circle.style.stroke = '#0071e3';
    circle.style.strokeWidth = '3px';
    text.style.fill = 'white';
    text.style.fontWeight = '900';
    
    console.log('Applied blue color to tree node:', nodeValue);
    
    // Wait for the animation duration
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Step 2: Keep the visited state
    circle.classList.add('visited');
    text.classList.add('visited');
    
    console.log('Tree animation completed for node:', nodeValue);
  } else {
    console.error('Could not find tree elements for node:', nodeValue);
  }
  
  // Update traversal output
  const traversalOutput = document.getElementById('tree-traversal-output');
  const currentPath = traversalOutput.textContent.replace('Traversal Output: ', '');
  const newPath = currentPath ? `${currentPath} → ${nodeValue}` : nodeValue;
  traversalOutput.textContent = `Traversal Output: ${newPath}`;
};


const clearTreeAnimation = () => {
  const svg = document.getElementById('tree-svg-container');
  const circles = svg.querySelectorAll('.tree-node-circle');
  const texts = svg.querySelectorAll('.tree-node-text');
  
  circles.forEach(circle => {
    circle.classList.remove('visited', 'traversing');
    // Reset styles to default
    circle.style.fill = '';
    circle.style.stroke = '';
    circle.style.strokeWidth = '';
  });
  
  texts.forEach(text => {
    text.classList.remove('visited', 'traversing');
    // Reset styles to default
    text.style.fill = '';
    text.style.fontWeight = '';
  });
  
  const traversalOutput = document.getElementById('tree-traversal-output');
  traversalOutput.textContent = 'Traversal Output: ';
};


// Array operations
document.getElementById('array-insert-end').addEventListener('click', () => {
  const input = document.getElementById('array-input');
  const val = input.value.trim();
  if (!val) return alert('Enter a value to insert!');
  array.push(val);
  input.value = '';
  renderArray();
});

document.getElementById('array-insert-at-index').addEventListener('click', () => {
  const input = document.getElementById('array-input');
  const indexInput = document.getElementById('array-index');
  const val = input.value.trim();
  const index = parseInt(indexInput.value);
  
  if (!val) return alert('Enter a value to insert!');
  if (isNaN(index)) return alert('Enter a valid index!');
  if (index < 0 || index > array.length) return alert('Index out of range!');
  
  array.splice(index, 0, val);
  input.value = '';
  indexInput.value = '';
  renderArray();
});

document.getElementById('array-delete-at-index').addEventListener('click', () => {
  const indexInput = document.getElementById('array-delete-index');
  const index = parseInt(indexInput.value);
  
  if (isNaN(index)) return alert('Enter a valid index!');
  if (index < 0 || index >= array.length) return alert('Index out of range!');
  
  array.splice(index, 1);
  indexInput.value = '';
  renderArray();
});

document.getElementById('array-delete-end').addEventListener('click', () => {
  if (array.length === 0) return alert('Array is empty!');
  array.pop();
  renderArray();
});

document.getElementById('array-search').addEventListener('click', () => {
  const input = document.getElementById('array-search-value');
  const val = input.value.trim();
  
  if (!val) return alert('Enter a value to search!');
  
  const index = array.indexOf(val);
  const searchOutput = document.getElementById('array-search-output');
  
  if (index === -1) {
    searchOutput.textContent = `Search Result: Value "${val}" not found in array!`;
  } else {
    searchOutput.textContent = `Search Result: Value "${val}" found at index ${index}!`;
  }
  input.value = '';
});

document.getElementById('array-clear').addEventListener('click', () => {
  array = [];
  renderArray();
  // Clear search output
  document.getElementById('array-search-output').textContent = 'Search Result: ';
});

// Stack operations
document.getElementById('push-stack').addEventListener('click', () => {
  const input = document.getElementById('stack-input');
  const val = input.value.trim();
  if (!val) return alert('Enter a value to push!');
  stack.push(val);
  input.value = '';
  renderStack();
});

document.getElementById('pop-stack').addEventListener('click', () => {
  if (stack.length === 0) return alert('Stack is empty!');
  stack.pop();
  renderStack();
});

// Queue operations
document.getElementById('enqueue').addEventListener('click', () => {
  const input = document.getElementById('queue-input');
  const val = input.value.trim();
  if (!val) return alert('Enter a value to enqueue!');
  queue.push(val); // Add to end of queue
  input.value = '';
  renderQueue();
});

document.getElementById('dequeue').addEventListener('click', () => {
  if (queue.length === 0) return alert('Queue is empty!');
  // Remove from beginning of queue (FIFO)
  queue.shift();
  renderQueue();
});

// Singly Linked list operations
document.getElementById('insert-end').addEventListener('click', () => {
  const input = document.getElementById('list-input');
  const val = input.value.trim();
  if (!val) return alert('Enter a value to insert!');
  linkedList.push(val);
  input.value = '';
  renderLinkedList();
});

document.getElementById('insert-start').addEventListener('click', () => {
  const input = document.getElementById('list-input');
  const val = input.value.trim();
  if (!val) return alert('Enter a value to insert!');
  linkedList.unshift(val);
  input.value = '';
  renderLinkedList();
});

document.getElementById('delete-index-btn').addEventListener('click', () => {
  const indexInput = document.getElementById('delete-index');
  const index = parseInt(indexInput.value);
  if (isNaN(index)) return alert('Enter a valid index!');
  if (index < 0 || index >= linkedList.length)
    return alert('Index out of range!');
  linkedList.splice(index, 1);
  indexInput.value = '';
  renderLinkedList();
});

// Doubly Linked List operations
document.getElementById('dll-insert-start').addEventListener('click', () => {
  const input = document.getElementById('dll-insert-value');
  const val = input.value.trim();
  if (!val) return alert('Enter a value to insert!');
  doublyLinkedList.unshift(val);
  input.value = '';
  renderDoublyLinkedList();
});

document.getElementById('dll-insert-end').addEventListener('click', () => {
  const input = document.getElementById('dll-insert-value');
  const val = input.value.trim();
  if (!val) return alert('Enter a value to insert!');
  doublyLinkedList.push(val);
  input.value = '';
  renderDoublyLinkedList();
});

document.getElementById('dll-insert-at-index').addEventListener('click', () => {
  const valueInput = document.getElementById('dll-insert-value');
  const indexInput = document.getElementById('dll-insert-index');
  const val = valueInput.value.trim();
  const index = parseInt(indexInput.value);

  if (!val) return alert('Enter a value to insert!');
  if (isNaN(index)) return alert('Enter a valid index!');
  if (index < 0 || index > doublyLinkedList.length)
    return alert('Index out of range!');

  doublyLinkedList.insert(index, val);
  valueInput.value = '';
  indexInput.value = '';
  renderDoublyLinkedList();
});

document.getElementById('dll-delete-start').addEventListener('click', () => {
  if (doublyLinkedList.length === 0) return alert('Doubly Linked List is empty!');
  doublyLinkedList.shift();
  renderDoublyLinkedList();
});

document.getElementById('dll-delete-end').addEventListener('click', () => {
  if (doublyLinkedList.length === 0) return alert('Doubly Linked List is empty!');
  doublyLinkedList.pop();
  renderDoublyLinkedList();
});

document.getElementById('dll-delete-at-index').addEventListener('click', () => {
  const indexInput = document.getElementById('dll-delete-index');
  const index = parseInt(indexInput.value);
  if (isNaN(index)) return alert('Enter a valid index!');
  if (index < 0 || index >= doublyLinkedList.length)
    return alert('Index out of range!');
  doublyLinkedList.remove(index);
  indexInput.value = '';
  renderDoublyLinkedList();
});

// Circular Linked List operations
document.getElementById('cll-insert-start').addEventListener('click', () => {
  const input = document.getElementById('cll-insert-value');
  const val = input.value.trim();
  if (!val) return alert('Enter a value to insert!');
  circularLinkedList.unshift(val);
  input.value = '';
  renderCircularLinkedList();
});

document.getElementById('cll-insert-end').addEventListener('click', () => {
  const input = document.getElementById('cll-insert-value');
  const val = input.value.trim();
  if (!val) return alert('Enter a value to insert!');
  circularLinkedList.push(val);
  input.value = '';
  renderCircularLinkedList();
});

document.getElementById('cll-insert-after').addEventListener('click', () => {
  const valueInput = document.getElementById('cll-insert-value');
  const afterValueInput = document.getElementById('cll-insert-after-value');
  const val = valueInput.value.trim();
  const afterVal = afterValueInput.value.trim();

  if (!val) return alert('Enter a value to insert!');
  if (!afterVal) return alert('Enter a value to insert after!');
  if (circularLinkedList.insertAfter(afterVal, val)) {
    valueInput.value = '';
    afterValueInput.value = '';
    renderCircularLinkedList();
  } else {
    alert('Value to insert after not found!');
  }
});

document.getElementById('cll-delete-start').addEventListener('click', () => {
  if (circularLinkedList.length === 0) return alert('Circular Linked List is empty!');
  circularLinkedList.shift();
  renderCircularLinkedList();
});

document.getElementById('cll-delete-end').addEventListener('click', () => {
  if (circularLinkedList.length === 0) return alert('Circular Linked List is empty!');
  circularLinkedList.pop();
  renderCircularLinkedList();
});

document.getElementById('cll-delete-value-btn').addEventListener('click', () => {
  const valueInput = document.getElementById('cll-delete-value');
  const val = valueInput.value.trim();
  if (!val) return alert('Enter a value to delete!');
  if (circularLinkedList.remove(val)) {
    valueInput.value = '';
    renderCircularLinkedList();
  } else {
    alert('Value not found in Circular Linked List!');
  }
});

// Tree operations (now for Generic Binary Tree)
document.getElementById('tree-insert').addEventListener('click', () => {
  const input = document.getElementById('tree-insert-value');
  const val = parseInt(input.value.trim());
  if (isNaN(val)) return alert('Enter a valid number to insert!');
  binaryTree.insert(val); // Changed to binaryTree
  input.value = '';
  renderTree();
});

document.getElementById('tree-delete').addEventListener('click', () => {
  const input = document.getElementById('tree-delete-value');
  const val = parseInt(input.value.trim());
  if (isNaN(val)) return alert('Enter a valid number to delete!');
  
  const success = binaryTree.delete(val);
  if (success) {
    renderTree();
  }
  input.value = '';
});

document.getElementById('tree-traverse-inorder').addEventListener('click', async () => {
  // Clear previous animation
  clearTreeAnimation();
  
  // Disable the buttons during animation
  const inorderBtn = document.getElementById('tree-traverse-inorder');
  const preorderBtn = document.getElementById('tree-traverse-preorder');
  const postorderBtn = document.getElementById('tree-traverse-postorder');
  inorderBtn.disabled = true;
  preorderBtn.disabled = true;
  postorderBtn.disabled = true;
  
  try {
    await binaryTree.inOrderAnimated(animateTreeNodeVisit, (result) => {
      console.log('In-order traversal completed:', result);
    });
  } catch (error) {
    console.error('In-order animation error:', error);
  } finally {
    // Re-enable buttons
    inorderBtn.disabled = false;
    preorderBtn.disabled = false;
    postorderBtn.disabled = false;
  }
});

document.getElementById('tree-traverse-preorder').addEventListener('click', async () => {
  // Clear previous animation
  clearTreeAnimation();
  
  // Disable the buttons during animation
  const inorderBtn = document.getElementById('tree-traverse-inorder');
  const preorderBtn = document.getElementById('tree-traverse-preorder');
  const postorderBtn = document.getElementById('tree-traverse-postorder');
  inorderBtn.disabled = true;
  preorderBtn.disabled = true;
  postorderBtn.disabled = true;
  
  try {
    await binaryTree.preOrderAnimated(animateTreeNodeVisit, (result) => {
      console.log('Pre-order traversal completed:', result);
    });
  } catch (error) {
    console.error('Pre-order animation error:', error);
  } finally {
    // Re-enable buttons
    inorderBtn.disabled = false;
    preorderBtn.disabled = false;
    postorderBtn.disabled = false;
  }
});

document.getElementById('tree-traverse-postorder').addEventListener('click', async () => {
  // Clear previous animation
  clearTreeAnimation();
  
  // Disable the buttons during animation
  const inorderBtn = document.getElementById('tree-traverse-inorder');
  const preorderBtn = document.getElementById('tree-traverse-preorder');
  const postorderBtn = document.getElementById('tree-traverse-postorder');
  inorderBtn.disabled = true;
  preorderBtn.disabled = true;
  postorderBtn.disabled = true;
  
  try {
    await binaryTree.postOrderAnimated(animateTreeNodeVisit, (result) => {
      console.log('Post-order traversal completed:', result);
    });
  } catch (error) {
    console.error('Post-order animation error:', error);
  } finally {
    // Re-enable buttons
    inorderBtn.disabled = false;
    preorderBtn.disabled = false;
    postorderBtn.disabled = false;
  }
});

// Graph operations
document.getElementById('graph-add-node').addEventListener('click', () => {
  const input = document.getElementById('graph-node-value');
  const val = input.value.trim();
  if (!val) return alert('Enter a value for the node!');
  if (graph.addNode(val)) {
    input.value = '';
    renderGraph();
  } else {
    alert('Node already exists or invalid value!');
  }
});

document.getElementById('graph-add-edge').addEventListener('click', () => {
  const fromInput = document.getElementById('graph-edge-from');
  const toInput = document.getElementById('graph-edge-to');
  const fromVal = fromInput.value.trim();
  const toVal = toInput.value.trim();

  if (!fromVal || !toVal) return alert('Enter both "From" and "To" node values!');
  if (fromVal === toVal) return alert('Cannot create edge from node to itself!');
  if (graph.addEdge(fromVal, toVal)) {
    fromInput.value = '';
    toInput.value = '';
    renderGraph();
  } else {
    alert('One or both nodes not found, or edge already exists!');
  }
});

document.getElementById('graph-traverse-dfs').addEventListener('click', async () => {
  const startNodeInput = document.getElementById('graph-start-node');
  const startNode = startNodeInput.value.trim();
  if (!startNode) return alert('Enter a start node for DFS!');
  if (!graph.adjacencyList[startNode]) return alert('Start node not found in graph!');

  // Clear previous animation
  clearGraphAnimation();
  
  // Disable the button during animation
  const dfsButton = document.getElementById('graph-traverse-dfs');
  const bfsButton = document.getElementById('graph-traverse-bfs');
  dfsButton.disabled = true;
  bfsButton.disabled = true;
  
  try {
    await graph.dfsAnimated(startNode, animateNodeVisit, (result) => {
      console.log('DFS completed:', result);
    });
  } catch (error) {
    console.error('DFS animation error:', error);
  } finally {
    // Re-enable buttons
    dfsButton.disabled = false;
    bfsButton.disabled = false;
  }
});

document.getElementById('graph-traverse-bfs').addEventListener('click', async () => {
  const startNodeInput = document.getElementById('graph-start-node');
  const startNode = startNodeInput.value.trim();
  if (!startNode) return alert('Enter a start node for BFS!');
  if (!graph.adjacencyList[startNode]) return alert('Start node not found in graph!');

  // Clear previous animation
  clearGraphAnimation();
  
  // Disable the button during animation
  const dfsButton = document.getElementById('graph-traverse-dfs');
  const bfsButton = document.getElementById('graph-traverse-bfs');
  dfsButton.disabled = true;
  bfsButton.disabled = true;
  
  try {
    await graph.bfsAnimated(startNode, animateNodeVisit, (result) => {
      console.log('BFS completed:', result);
    });
  } catch (error) {
    console.error('BFS animation error:', error);
  } finally {
    // Re-enable buttons
    dfsButton.disabled = false;
    bfsButton.disabled = false;
  }
});

// Graph: Clear Animation button logic
const graphClearAnimationBtn = document.getElementById('graph-clear-animation');
if (graphClearAnimationBtn) {
  graphClearAnimationBtn.addEventListener('click', () => {
    clearGraphAnimation();
  });
}

// Tree: Clear Animation button logic
const treeClearAnimationBtn = document.getElementById('tree-clear-animation');
if (treeClearAnimationBtn) {
  treeClearAnimationBtn.addEventListener('click', () => {
    clearTreeAnimation();
  });
}



// Graph: Remove Node button logic
// Add event listener for Remove Node button
const graphRemoveNodeBtn = document.getElementById('graph-remove-node');
if (graphRemoveNodeBtn) {
  graphRemoveNodeBtn.addEventListener('click', () => {
    const input = document.getElementById('graph-remove-node-value');
    const val = input.value.trim();
    if (!val) return alert('Enter a node value to remove!');
    if (graph.removeNode(val)) {
      input.value = '';
      renderGraph();
    } else {
      alert('Node not found in graph!');
    }
  });
}

// Singly Linked List: Delete at Start
const deleteStartBtn = document.getElementById('delete-start-btn');
if (deleteStartBtn) {
  deleteStartBtn.addEventListener('click', () => {
    if (linkedList.length === 0) return alert('List is empty!');
    linkedList.shift();
    renderLinkedList();
  });
}
// Singly Linked List: Delete at End
const deleteEndBtn = document.getElementById('delete-end-btn');
if (deleteEndBtn) {
  deleteEndBtn.addEventListener('click', () => {
    if (linkedList.length === 0) return alert('List is empty!');
    linkedList.pop();
    renderLinkedList();
  });
}

// Simplified explanation toggle functionality with debugging
const setupExplanationToggles = () => {
  console.log('Setting up explanation toggles...');
  
  const explanationToggles = [
    'array-explanation-toggle',
    'stack-explanation-toggle',
    'queue-explanation-toggle', 
    'linkedlist-explanation-toggle',
    'doublylinkedlist-explanation-toggle',
    'circularlinkedlist-explanation-toggle',
    'tree-explanation-toggle',
    'graph-explanation-toggle'
  ];

  explanationToggles.forEach(toggleId => {
    const toggleBtn = document.getElementById(toggleId);
    const explanationPanel = document.getElementById(toggleId.replace('-toggle', '-explanation'));
    
    console.log(`Checking ${toggleId}:`, {
      button: toggleBtn ? 'Found' : 'Not found',
      panel: explanationPanel ? 'Found' : 'Not found',
      alreadySetup: toggleBtn ? toggleBtn.hasAttribute('data-toggle-setup') : 'N/A'
    });
    
    if (toggleBtn && explanationPanel && !toggleBtn.hasAttribute('data-toggle-setup')) {
      console.log(`Setting up ${toggleId}`);
      toggleBtn.setAttribute('data-toggle-setup', 'true');
      
      // Remove any existing event listeners
      toggleBtn.replaceWith(toggleBtn.cloneNode(true));
      const newToggleBtn = document.getElementById(toggleId);
      newToggleBtn.setAttribute('data-toggle-setup', 'true');
      
      newToggleBtn.addEventListener('click', (e) => {
        console.log(`Button clicked: ${toggleId}`);
        e.preventDefault();
        
        const currentDisplay = explanationPanel.style.display;
        const computedDisplay = getComputedStyle(explanationPanel).display;
        console.log(`Current display: ${currentDisplay}, Computed display: ${computedDisplay}`);
        
        const isCurrentlyHidden = currentDisplay === 'none' || computedDisplay === 'none';
        console.log(`Is hidden: ${isCurrentlyHidden}`);
        
        if (isCurrentlyHidden) {
          explanationPanel.style.display = 'block';
          newToggleBtn.textContent = 'Hide Explanation';
          console.log('Showing explanation panel');
        } else {
          explanationPanel.style.display = 'none';
          newToggleBtn.textContent = 'Show Explanation';
          console.log('Hiding explanation panel');
        }
      });
    }
  });
};

// Setup explanation toggles when DOM is ready and after tab switches
document.addEventListener('DOMContentLoaded', setupExplanationToggles);

// Alternative direct approach - set up each button individually
document.addEventListener('DOMContentLoaded', () => {
  // Array explanation toggle
  const arrayBtn = document.getElementById('array-explanation-toggle');
  const arrayPanel = document.getElementById('array-explanation');
  if (arrayBtn && arrayPanel) {
    arrayBtn.onclick = function() {
      console.log('Array button clicked directly');
      if (arrayPanel.style.display === 'none' || arrayPanel.style.display === '') {
        arrayPanel.style.display = 'block';
        this.textContent = 'Hide Explanation';
      } else {
        arrayPanel.style.display = 'none';
        this.textContent = 'Show Explanation';
      }
    };
  }
  
  // Stack explanation toggle
  const stackBtn = document.getElementById('stack-explanation-toggle');
  const stackPanel = document.getElementById('stack-explanation');
  if (stackBtn && stackPanel) {
    stackBtn.onclick = function() {
      console.log('Stack button clicked directly');
      if (stackPanel.style.display === 'none' || stackPanel.style.display === '') {
        stackPanel.style.display = 'block';
        this.textContent = 'Hide Explanation';
      } else {
        stackPanel.style.display = 'none';
        this.textContent = 'Show Explanation';
      }
    };
  }
  
  // Queue explanation toggle
  const queueBtn = document.getElementById('queue-explanation-toggle');
  const queuePanel = document.getElementById('queue-explanation');
  if (queueBtn && queuePanel) {
    queueBtn.onclick = function() {
      console.log('Queue button clicked directly');
      if (queuePanel.style.display === 'none' || queuePanel.style.display === '') {
        queuePanel.style.display = 'block';
        this.textContent = 'Hide Explanation';
      } else {
        queuePanel.style.display = 'none';
        this.textContent = 'Show Explanation';
      }
    };
  }
  
  // Linked List explanation toggle
  const llBtn = document.getElementById('linkedlist-explanation-toggle');
  const llPanel = document.getElementById('linkedlist-explanation');
  if (llBtn && llPanel) {
    llBtn.onclick = function() {
      console.log('Linked List button clicked directly');
      if (llPanel.style.display === 'none' || llPanel.style.display === '') {
        llPanel.style.display = 'block';
        this.textContent = 'Hide Explanation';
      } else {
        llPanel.style.display = 'none';
        this.textContent = 'Show Explanation';
      }
    };
  }
  
  // Doubly Linked List explanation toggle
  const dllBtn = document.getElementById('doublylinkedlist-explanation-toggle');
  const dllPanel = document.getElementById('doublylinkedlist-explanation');
  if (dllBtn && dllPanel) {
    dllBtn.onclick = function() {
      console.log('Doubly Linked List button clicked directly');
      if (dllPanel.style.display === 'none' || dllPanel.style.display === '') {
        dllPanel.style.display = 'block';
        this.textContent = 'Hide Explanation';
      } else {
        dllPanel.style.display = 'none';
        this.textContent = 'Show Explanation';
      }
    };
  }
  
  // Circular Linked List explanation toggle
  const cllBtn = document.getElementById('circularlinkedlist-explanation-toggle');
  const cllPanel = document.getElementById('circularlinkedlist-explanation');
  if (cllBtn && cllPanel) {
    cllBtn.onclick = function() {
      console.log('Circular Linked List button clicked directly');
      if (cllPanel.style.display === 'none' || cllPanel.style.display === '') {
        cllPanel.style.display = 'block';
        this.textContent = 'Hide Explanation';
      } else {
        cllPanel.style.display = 'none';
        this.textContent = 'Show Explanation';
      }
    };
  }
  
  // Tree explanation toggle
  const treeBtn = document.getElementById('tree-explanation-toggle');
  const treePanel = document.getElementById('tree-explanation');
  if (treeBtn && treePanel) {
    treeBtn.onclick = function() {
      console.log('Tree button clicked directly');
      if (treePanel.style.display === 'none' || treePanel.style.display === '') {
        treePanel.style.display = 'block';
        this.textContent = 'Hide Explanation';
      } else {
        treePanel.style.display = 'none';
        this.textContent = 'Show Explanation';
      }
    };
  }
  
  // Graph explanation toggle
  const graphBtn = document.getElementById('graph-explanation-toggle');
  const graphPanel = document.getElementById('graph-explanation');
  if (graphBtn && graphPanel) {
    graphBtn.onclick = function() {
      console.log('Graph button clicked directly');
      if (graphPanel.style.display === 'none' || graphPanel.style.display === '') {
        graphPanel.style.display = 'block';
        this.textContent = 'Hide Explanation';
      } else {
        graphPanel.style.display = 'none';
        this.textContent = 'Show Explanation';
      }
    };
  }
});

// Also setup toggles after tab switches to ensure they work in all panels
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    setTimeout(setupExplanationToggles, 50);
  });
});

// Debug function to test a specific button
window.testStackButton = () => {
  console.log('Testing stack explanation button...');
  const stackBtn = document.getElementById('stack-explanation-toggle');
  const stackPanel = document.getElementById('stack-explanation');
  
  console.log('Stack button:', stackBtn);
  console.log('Stack panel:', stackPanel);
  
  if (stackBtn && stackPanel) {
    console.log('Initial panel display:', stackPanel.style.display);
    console.log('Initial computed display:', getComputedStyle(stackPanel).display);
    
    // Force click
    stackBtn.click();
    
    setTimeout(() => {
      console.log('After click panel display:', stackPanel.style.display);
      console.log('After click computed display:', getComputedStyle(stackPanel).display);
    }, 100);
  }
};

// Initialize the first tab after all functions are defined
tabs[0].click();