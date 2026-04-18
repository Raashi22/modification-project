'use client'

import { useState, useEffect } from 'react'
import ArrayVisualizer from './ArrayVisualizer'
import StackVisualizer from './StackVisualizer'
import QueueVisualizer from './QueueVisualizer'
import LinkedListVisualizer from './LinkedListVisualizer'
import DoublyLinkedListVisualizer from './DoublyLinkedListVisualizer'
import CircularLinkedListVisualizer from './CircularLinkedListVisualizer'
import TreeVisualizer from './TreeVisualizer'
import GraphVisualizer from './GraphVisualizer'

const dataStructures = [
  { 
    id: 'array', 
    name: 'Array', 
    component: ArrayVisualizer,
    operations: ['Insert at End', 'Insert at Index', 'Delete at Index', 'Delete from End', 'Search', 'Clear Array']
  },
  { 
    id: 'stack', 
    name: 'Stack', 
    component: StackVisualizer,
    operations: ['Push', 'Pop', 'Peek']
  },
  { 
    id: 'queue', 
    name: 'Queue', 
    component: QueueVisualizer,
    operations: ['Enqueue', 'Dequeue']
  },
  { 
    id: 'linkedlist', 
    name: 'Linked List', 
    component: LinkedListVisualizer,
    operations: ['Insert at Start', 'Insert at End', 'Delete at Index']
  },
  { 
    id: 'doublylinkedlist', 
    name: 'Doubly Linked List', 
    component: DoublyLinkedListVisualizer,
    operations: ['Insert at Start', 'Insert at End', 'Insert at Index', 'Delete from Start', 'Delete from End', 'Delete at Index']
  },
  { 
    id: 'circularlinkedlist', 
    name: 'Circular Linked List', 
    component: CircularLinkedListVisualizer,
    operations: ['Insert at Start', 'Insert at End', 'Insert After Value', 'Delete from Start','Delete from End','Delete Value']
  },
  { 
    id: 'tree', 
    name: 'Binary Search Tree', 
    component: TreeVisualizer,
    operations: ['Insert', 'Delete', 'In-order Traversal', 'Pre-order Traversal', 'Post-order Traversal']
  },
  { 
    id: 'graph', 
    name: 'Graph', 
    component: GraphVisualizer,
    operations: ['Add Node', 'Add Edge', 'Remove Node', 'DFS Traversal', 'BFS Traversal']
  },
]

export default function DataStructureVisualizer() {
  const [activeTab, setActiveTab] = useState('array')

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }

  return (
    <>
      <nav className="tabs">
        {dataStructures.map((ds) => (
          <button
            key={ds.id}
            className={`tab ${activeTab === ds.id ? 'active' : ''}`}
            onClick={() => handleTabClick(ds.id)}
          >
            {ds.name}
          </button>
        ))}
      </nav>

      {dataStructures.map((ds) => {
        const Component = ds.component
        return (
          <section
            key={ds.id}
            id={ds.id}
            className={`data-structure-section ${activeTab === ds.id ? 'active' : ''}`}
          >
            <h2>{ds.name}</h2>
            
            <div className="operations-list">
              <h3>Available Operations</h3>
              <ul>
                {ds.operations.map((operation, index) => (
                  <li key={index}>{operation}</li>
                ))}
              </ul>
            </div>

            <Component />
          </section>
        )
      })}
    </>
  )
}
