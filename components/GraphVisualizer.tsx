'use client'

import { useState, useRef, useEffect } from 'react'

interface GraphNode {
  id: string
  x: number
  y: number
}

interface GraphEdge {
  from: string
  to: string
}

export default function GraphVisualizer() {
  const [nodes, setNodes] = useState<GraphNode[]>([])
  const [edges, setEdges] = useState<GraphEdge[]>([])
  const [nodeId, setNodeId] = useState('')
  const [fromNode, setFromNode] = useState('')
  const [toNode, setToNode] = useState('')
  const [traversalOutput, setTraversalOutput] = useState('Traversal Output: ')
  const [showExplanation, setShowExplanation] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const addNode = () => {
    if (!nodeId.trim()) {
      alert('Enter a node ID!')
      return
    }
    
    if (nodes.find(n => n.id === nodeId.trim())) {
      alert('Node already exists!')
      return
    }
    
    const newNode: GraphNode = {
      id: nodeId.trim(),
      x: Math.random() * 600 + 100,
      y: Math.random() * 300 + 100
    }
    setNodes([...nodes, newNode])
    setNodeId('')
  }

  const addEdge = () => {
    if (!fromNode.trim() || !toNode.trim()) {
      alert('Enter both node IDs!')
      return
    }
    
    const fromExists = nodes.find(n => n.id === fromNode.trim())
    const toExists = nodes.find(n => n.id === toNode.trim())
    
    if (!fromExists || !toExists) {
      alert('One or both nodes do not exist!')
      return
    }
    
    if (fromNode.trim() === toNode.trim()) {
      alert('Cannot create self-loop!')
      return
    }
    
    const edgeExists = edges.find(e => 
      (e.from === fromNode.trim() && e.to === toNode.trim()) ||
      (e.from === toNode.trim() && e.to === fromNode.trim())
    )
    
    if (edgeExists) {
      alert('Edge already exists!')
      return
    }
    
    setEdges([...edges, { from: fromNode.trim(), to: toNode.trim() }])
    setFromNode('')
    setToNode('')
  }

  const removeNode = () => {
    if (!nodeId.trim()) {
      alert('Enter a node ID!')
      return
    }
    
    setNodes(nodes.filter(n => n.id !== nodeId.trim()))
    setEdges(edges.filter(e => e.from !== nodeId.trim() && e.to !== nodeId.trim()))
    setNodeId('')
  }

  const clearGraph = () => {
    setNodes([])
    setEdges([])
    setTraversalOutput('Traversal Output: ')
  }

  const dfs = () => {
    if (nodes.length === 0) {
      setTraversalOutput('Graph is empty!')
      return
    }
    
    const visited = new Set<string>()
    const result: string[] = []
    
    const dfsHelper = (nodeId: string) => {
      visited.add(nodeId)
      result.push(nodeId)
      
      const neighbors = edges
        .filter(e => e.from === nodeId || e.to === nodeId)
        .map(e => e.from === nodeId ? e.to : e.from)
        .filter(id => !visited.has(id))
      
      neighbors.forEach(neighbor => dfsHelper(neighbor))
    }
    
    dfsHelper(nodes[0].id)
    setTraversalOutput(`DFS Traversal: ${result.join(' → ')}`)
  }

  const bfs = () => {
    if (nodes.length === 0) {
      setTraversalOutput('Graph is empty!')
      return
    }
    
    const visited = new Set<string>()
    const queue: string[] = [nodes[0].id]
    const result: string[] = []
    
    while (queue.length > 0) {
      const current = queue.shift()!
      if (visited.has(current)) continue
      
      visited.add(current)
      result.push(current)
      
      const neighbors = edges
        .filter(e => e.from === current || e.to === current)
        .map(e => e.from === current ? e.to : e.from)
        .filter(id => !visited.has(id))
      
      queue.push(...neighbors)
    }
    
    setTraversalOutput(`BFS Traversal: ${result.join(' → ')}`)
  }

  const renderGraph = () => {
    const svg = svgRef.current
    if (!svg) return

    svg.innerHTML = ''

    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from)
      const toNode = nodes.find(n => n.id === edge.to)
      
      if (fromNode && toNode) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('x1', fromNode.x.toString())
        line.setAttribute('y1', fromNode.y.toString())
        line.setAttribute('x2', toNode.x.toString())
        line.setAttribute('y2', toNode.y.toString())
        line.setAttribute('class', 'graph-edge')
        svg.appendChild(line)
      }
    })

    // Draw nodes
    nodes.forEach(node => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', node.x.toString())
      circle.setAttribute('cy', node.y.toString())
      circle.setAttribute('r', '20')
      circle.setAttribute('class', 'graph-node-circle')
      svg.appendChild(circle)

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('x', node.x.toString())
      text.setAttribute('y', node.y.toString())
      text.setAttribute('class', 'graph-node-text')
      text.textContent = node.id
      svg.appendChild(text)
    })
  }

  useEffect(() => {
    renderGraph()
  }, [nodes, edges])

  return (
    <>
      <div className="controls">
        <div className="input-group">
          <input
            type="text"
            placeholder="Node ID"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNode()}
          />
          <button onClick={addNode}>Add Node</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="From Node"
            value={fromNode}
            onChange={(e) => setFromNode(e.target.value)}
          />
          <input
            type="text"
            placeholder="To Node"
            value={toNode}
            onChange={(e) => setToNode(e.target.value)}
          />
          <button onClick={addEdge}>Add Edge</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Node ID to remove"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
          />
          <button onClick={removeNode}>Remove Node</button>
        </div>

        <div className="input-group">
          <button onClick={dfs}>DFS Traversal</button>
        </div>

        <div className="input-group">
          <button onClick={bfs}>BFS Traversal</button>
        </div>

        <div className="input-group">
          <button onClick={clearGraph}>Clear Graph</button>
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
        aria-label="Graph nodes container"
      />

      {showExplanation && (
        <div className="explanation-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Graph Data Structure</h3>
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
        <p><strong>Definition:</strong> A graph is a collection of nodes (vertices) connected by edges, representing relationships between entities.</p>
        
        <h4>Key Components:</h4>
        <ul>
          <li><strong>Vertices (Nodes):</strong> The fundamental units of the graph</li>
          <li><strong>Edges:</strong> Connections between vertices</li>
          <li><strong>Directed/Undirected:</strong> Edges may have direction or be bidirectional</li>
          <li><strong>Weighted/Unweighted:</strong> Edges may have associated weights</li>
        </ul>

        <h4>Types of Graphs:</h4>
        <ul>
          <li><strong>Directed Graph:</strong> Edges have direction (A→B)</li>
          <li><strong>Undirected Graph:</strong> Edges are bidirectional (A-B)</li>
          <li><strong>Weighted Graph:</strong> Edges have associated weights</li>
          <li><strong>Cyclic/Acyclic:</strong> Contains cycles or not</li>
        </ul>

        <h4>Traversal Algorithms:</h4>
        <ul>
          <li><strong>DFS (Depth-First Search):</strong> Explores as far as possible before backtracking</li>
          <li><strong>BFS (Breadth-First Search):</strong> Explores all neighbors before moving to next level</li>
        </ul>

        <h4>Use Cases:</h4>
        <ul>
          <li>Social networks and relationships</li>
          <li>Computer networks and routing</li>
          <li>Maps and navigation systems</li>
          <li>Dependency graphs in software</li>
          <li>Recommendation systems</li>
        </ul>
        </div>
      )}
    </>
  )
}
