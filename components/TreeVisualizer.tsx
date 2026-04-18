'use client'

import { useState, useEffect, useRef } from 'react'

interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
}

class BinaryTree {
  root: TreeNode | null = null
  size: number = 0

  insert(value: number) {
    const newNode: TreeNode = { value, left: null, right: null }
    if (this.root === null) {
      this.root = newNode
      this.size++
      console.log(`Inserted ${value} as root`)
      return this
    }

    let current = this.root
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode
          this.size++
          console.log(`Inserted ${value} as left child of ${current.value}`)
          return this
        } else {
          current = current.left
        }
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = newNode
          this.size++
          console.log(`Inserted ${value} as right child of ${current.value}`)
          return this
        } else {
          current = current.right
        }
      } else {
        alert(`Value ${value} already exists in the tree!`)
        return this
      }
    }
  }

  delete(value: number) {
    this.root = this.deleteNode(this.root, value)
  }

  private deleteNode(node: TreeNode | null, value: number): TreeNode | null {
    if (!node) return null

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value)
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value)
    } else {
      if (!node.left) return node.right
      if (!node.right) return node.left

      const successor = this.findMin(node.right)
      node.value = successor.value
      node.right = this.deleteNode(node.right, successor.value)
    }

    return node
  }

  private findMin(node: TreeNode): TreeNode {
    while (node.left) {
      node = node.left
    }
    return node
  }

  inorderTraversal(): number[] {
    const result: number[] = []
    this.inorderHelper(this.root, result)
    return result
  }

  private inorderHelper(node: TreeNode | null, result: number[]) {
    if (node) {
      this.inorderHelper(node.left, result)
      result.push(node.value)
      this.inorderHelper(node.right, result)
    }
  }

  preorderTraversal(): number[] {
    const result: number[] = []
    this.preorderHelper(this.root, result)
    return result
  }

  private preorderHelper(node: TreeNode | null, result: number[]) {
    if (node) {
      result.push(node.value)
      this.preorderHelper(node.left, result)
      this.preorderHelper(node.right, result)
    }
  }

  postorderTraversal(): number[] {
    const result: number[] = []
    this.postorderHelper(this.root, result)
    return result
  }

  private postorderHelper(node: TreeNode | null, result: number[]) {
    if (node) {
      this.postorderHelper(node.left, result)
      this.postorderHelper(node.right, result)
      result.push(node.value)
    }
  }

  clear() {
    this.root = null
    this.size = 0
  }
}

export default function TreeVisualizer() {
  const [binaryTree] = useState(() => new BinaryTree())
  const [insertValue, setInsertValue] = useState('')
  const [deleteValue, setDeleteValue] = useState('')
  const [traversalOutput, setTraversalOutput] = useState('Traversal Output: ')
  const [showExplanation, setShowExplanation] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const NODE_RADIUS = 20
  const LEVEL_HEIGHT = 80

  const getMaxLevel = (node: TreeNode | null, level: number): number => {
    if (!node) return level - 1
    return Math.max(
      getMaxLevel(node.left, level + 1),
      getMaxLevel(node.right, level + 1)
    )
  }

  const getNodesByLevel = (root: TreeNode | null): TreeNode[][] => {
    const levels: TreeNode[][] = []
    
    const traverse = (node: TreeNode | null, level: number) => {
      if (!node) return
      
      if (!levels[level]) levels[level] = []
      levels[level].push(node)
      
      traverse(node.left, level + 1)
      traverse(node.right, level + 1)
    }
    
    traverse(root, 0)
    
    // Sort each level by value to ensure correct left-to-right order
    levels.forEach(level => {
      level.sort((a, b) => a.value - b.value)
    })
    
    return levels
  }

  const createSvgElement = (tag: string, attributes: Record<string, any>) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag)
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })
    return element
  }

  const drawEdges = (node: TreeNode | null, positions: Map<TreeNode, {x: number, y: number}>, svg: SVGSVGElement) => {
    if (!node) return
    
    const { x, y } = positions.get(node)!
    
    if (node.left) {
      const leftPos = positions.get(node.left)!
      const line = createSvgElement('line', {
        x1: x,
        y1: y,
        x2: leftPos.x,
        y2: leftPos.y,
        class: 'tree-edge'
      })
      svg.appendChild(line)
      drawEdges(node.left, positions, svg)
    }
    
    if (node.right) {
      const rightPos = positions.get(node.right)!
      const line = createSvgElement('line', {
        x1: x,
        y1: y,
        x2: rightPos.x,
        y2: rightPos.y,
        class: 'tree-edge'
      })
      svg.appendChild(line)
      drawEdges(node.right, positions, svg)
    }
  }

  const drawNodes = (node: TreeNode | null, positions: Map<TreeNode, {x: number, y: number}>, svg: SVGSVGElement) => {
    if (!node) return
    
    const { x, y } = positions.get(node)!
    
    const circle = createSvgElement('circle', {
      cx: x,
      cy: y,
      r: NODE_RADIUS,
      class: 'tree-node-circle'
    })
    svg.appendChild(circle)
    
    const text = createSvgElement('text', {
      x: x,
      y: y,
      class: 'tree-node-text'
    })
    text.textContent = node.value.toString()
    svg.appendChild(text)
    
    drawNodes(node.left, positions, svg)
    drawNodes(node.right, positions, svg)
  }

  const renderTree = () => {
    const svg = svgRef.current
    if (!svg) return

    svg.innerHTML = ''
    setTraversalOutput('Traversal Output: ')

    if (!binaryTree.root) {
      const textElement = createSvgElement('text', {
        x: 400,
        y: 250,
        'text-anchor': 'middle',
        'alignment-baseline': 'middle',
        fill: 'var(--fg)',
        'font-size': '1.5rem',
      })
      textElement.textContent = 'Tree is empty.'
      svg.appendChild(textElement)
      return
    }

    const maxLevel = getMaxLevel(binaryTree.root, 0)
    const svgWidth = 800
    const svgHeight = Math.max(500, (maxLevel + 1) * LEVEL_HEIGHT + 160)
    
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
    
    const padding = 80
    const availableWidth = svgWidth - (2 * padding)
    
    const levelNodes = getNodesByLevel(binaryTree.root)
    const nodePositions = new Map<TreeNode, {x: number, y: number}>()
    
    for (let level = 0; level < levelNodes.length; level++) {
      const nodes = levelNodes[level]
      const y = padding + NODE_RADIUS + (level * LEVEL_HEIGHT)
      
      if (nodes.length === 1) {
        nodePositions.set(nodes[0], { x: svgWidth / 2, y })
      } else {
        const minSpacing = 80
        const totalWidth = (nodes.length - 1) * minSpacing
        
        if (totalWidth <= availableWidth) {
          const startX = (svgWidth - totalWidth) / 2
          nodes.forEach((node, index) => {
            const x = startX + (index * minSpacing)
            nodePositions.set(node, { x, y })
          })
        } else {
          const spacing = availableWidth / (nodes.length - 1)
          const startX = padding + NODE_RADIUS
          nodes.forEach((node, index) => {
            const x = startX + (index * spacing)
            nodePositions.set(node, { x, y })
          })
        }
      }
    }

    drawEdges(binaryTree.root, nodePositions, svg)
    drawNodes(binaryTree.root, nodePositions, svg)
  }

  useEffect(() => {
    renderTree()
  }, [binaryTree.root])

  const handleInsert = () => {
    const value = parseInt(insertValue.trim())
    if (isNaN(value)) {
      alert('Enter a valid number to insert!')
      return
    }
    if (value < 0) {
      alert('Please enter a positive number!')
      return
    }
    binaryTree.insert(value)
    setInsertValue('')
    renderTree()
  }

  const handleDelete = () => {
    const value = parseInt(deleteValue.trim())
    if (isNaN(value)) {
      alert('Enter a valid number to delete!')
      return
    }
    if (value < 0) {
      alert('Please enter a positive number!')
      return
    }
    binaryTree.delete(value)
    setDeleteValue('')
    renderTree()
  }

  const handleInorderTraversal = () => {
    const result = binaryTree.inorderTraversal()
    setTraversalOutput(`In-order Traversal: ${result.join(' → ')}`)
  }

  const handlePreorderTraversal = () => {
    const result = binaryTree.preorderTraversal()
    setTraversalOutput(`Pre-order Traversal: ${result.join(' → ')}`)
  }

  const handlePostorderTraversal = () => {
    const result = binaryTree.postorderTraversal()
    setTraversalOutput(`Post-order Traversal: ${result.join(' → ')}`)
  }

  const clearAnimation = () => {
    setTraversalOutput('Traversal Output: ')
  }

  return (
    <>
      <div className="controls">
        <div className="input-group">
          <input
            type="number"
            placeholder="Value to insert"
            value={insertValue}
            onChange={(e) => setInsertValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
            min="0"
          />
          <button onClick={handleInsert}>Insert</button>
        </div>

        <div className="input-group">
          <input
            type="number"
            placeholder="Value to delete"
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleDelete()}
            min="0"
          />
          <button onClick={handleDelete}>Delete</button>
        </div>

        <div className="input-group">
          <button onClick={handleInorderTraversal}>In-order Traversal</button>
        </div>

        <div className="input-group">
          <button onClick={handlePreorderTraversal}>Pre-order Traversal</button>
        </div>

        <div className="input-group">
          <button onClick={handlePostorderTraversal}>Post-order Traversal</button>
        </div>

        <div className="input-group">
          <button onClick={clearAnimation}>Clear Animation</button>
        </div>

        <div className="input-group">
          <button onClick={() => setShowExplanation(!showExplanation)}>
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
        </div>
      </div>

      <div className="traversal-output">
        {traversalOutput}
      </div>

      <svg
        ref={svgRef}
        className="structure-container svg-container"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
        aria-live="polite"
        aria-label="Tree nodes container"
      />

      {showExplanation && (
        <div className="explanation-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Binary Search Tree (BST) Data Structure</h3>
            <button 
              onClick={() => setShowExplanation(false)}
              style={{ 
                background: 'var(--accent)', 
                color: 'white', 
                border: 'none', 
                padding: '0.5rem 1rem', 
                borderRadius: '6px', 
                cursor: 'pointer' 
              }}
            >
              Close
            </button>
          </div>
          <p><strong>Definition:</strong> A Binary Search Tree is a hierarchical data structure where each node has at most two children, and the values follow a specific ordering property.</p>
          
          <h4>BST Properties:</h4>
          <ul>
            <li><strong>Left Child:</strong> All values in left subtree are less than parent</li>
            <li><strong>Right Child:</strong> All values in right subtree are greater than parent</li>
            <li><strong>Unique Values:</strong> No duplicate values allowed</li>
            <li><strong>Recursive Structure:</strong> Each subtree is also a BST</li>
          </ul>

          <h4>Operations:</h4>
          <ul>
            <li><strong>Search:</strong> O(log n) average, O(n) worst case</li>
            <li><strong>Insertion:</strong> O(log n) average, O(n) worst case</li>
            <li><strong>Deletion:</strong> O(log n) average, O(n) worst case</li>
            <li><strong>Traversal:</strong> O(n) - visits every node once</li>
          </ul>

          <h4>Traversal Types:</h4>
          <ul>
            <li><strong>In-order:</strong> Left → Root → Right (gives sorted order)</li>
            <li><strong>Pre-order:</strong> Root → Left → Right (useful for copying tree)</li>
            <li><strong>Post-order:</strong> Left → Right → Root (useful for deleting tree)</li>
          </ul>

          <h4>Use Cases:</h4>
          <ul>
            <li>Implementing dynamic sets and maps</li>
            <li>Database indexing</li>
            <li>Expression parsing</li>
            <li>Priority queues</li>
          </ul>
        </div>
      )}
    </>
  )
}
