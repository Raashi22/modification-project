'use client'

import { useState } from 'react'

interface DoublyListNode {
  value: string
  next: DoublyListNode | null
  prev: DoublyListNode | null
}

export default function DoublyLinkedListVisualizer() {
  const [head, setHead] = useState<DoublyListNode | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [insertIndex, setInsertIndex] = useState('')
  const [deleteIndex, setDeleteIndex] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)

  const insertAtStart = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    const newNode: DoublyListNode = { value: inputValue.trim(), next: head, prev: null }
    if (head) {
      head.prev = newNode
    }
    setHead(newNode)
    setInputValue('')
  }

  const insertAtEnd = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    const newNode: DoublyListNode = { value: inputValue.trim(), next: null, prev: null }
    
    if (!head) {
      setHead(newNode)
    } else {
      let current = head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
      newNode.prev = current
    }
    setInputValue('')
  }

  const insertAtIndex = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    const index = parseInt(insertIndex)
    if (isNaN(index) || index < 0) {
      alert('Enter a valid index!')
      return
    }
    
    const newNode: DoublyListNode = { value: inputValue.trim(), next: null, prev: null }
    
    if (index === 0) {
      newNode.next = head
      if (head) {
        head.prev = newNode
      }
      setHead(newNode)
    } else {
      let current = head
      for (let i = 0; i < index - 1 && current; i++) {
        current = current.next
      }
      if (current) {
        newNode.next = current.next
        newNode.prev = current
        if (current.next) {
          current.next.prev = newNode
        }
        current.next = newNode
      } else {
        alert('Index out of range!')
        return
      }
    }
    setInputValue('')
    setInsertIndex('')
  }

  const deleteAtIndex = () => {
    const index = parseInt(deleteIndex)
    if (isNaN(index) || index < 0) {
      alert('Enter a valid index!')
      return
    }
    
    if (!head) {
      alert('List is empty!')
      return
    }
    
    if (index === 0) {
      setHead(head.next)
      if (head) {
        head.prev = null
      }
    } else {
      let current = head
      for (let i = 0; i < index && current; i++) {
        current = current.next
      }
      if (current) {
        if (current.prev) {
          current.prev.next = current.next
        }
        if (current.next) {
          current.next.prev = current.prev
        }
      } else {
        alert('Index out of range!')
        return
      }
    }
    setDeleteIndex('')
  }

  const clearList = () => {
    setHead(null)
  }

  const renderList = () => {
    const nodes = []
    let current = head
    let index = 0
    
    while (current) {
      nodes.push(
        <div key={index} className="linked-list-node">
          <div className="node-value">{current.value}</div>
          {current.next && <div className="arrow">⇄</div>}
        </div>
      )
      current = current.next
      index++
    }
    
    return nodes
  }

  return (
    <>
      <div className="controls">
        <div className="input-group">
          <input
            type="text"
            placeholder="Value to insert"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && insertAtStart()}
          />
          <button onClick={insertAtStart}>Insert at Start</button>
        </div>

        <div className="input-group">
          <button onClick={insertAtEnd}>Insert at End</button>
        </div>

        <div className="input-group">
          <input
            type="number"
            placeholder="Index"
            value={insertIndex}
            onChange={(e) => setInsertIndex(e.target.value)}
          />
          <button onClick={insertAtIndex}>Insert at Index</button>
        </div>

        <div className="input-group">
          <input
            type="number"
            placeholder="Index to delete"
            value={deleteIndex}
            onChange={(e) => setDeleteIndex(e.target.value)}
          />
          <button onClick={deleteAtIndex}>Delete at Index</button>
        </div>

        <div className="input-group">
          <button onClick={clearList}>Clear List</button>
        </div>

        <div className="input-group">
          <button onClick={() => setShowExplanation(!showExplanation)}>
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
        </div>
      </div>

      <div className="structure-container linked-list-container">
        {!head ? (
          <div className="empty-message">Doubly Linked List is empty</div>
        ) : (
          renderList()
        )}
      </div>

      {showExplanation && (
        <div className="explanation-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Doubly Linked List Data Structure</h3>
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
        <p><strong>Definition:</strong> A doubly linked list is a linear data structure where each node contains data and two pointers - one to the next node and one to the previous node.</p>
        
        <h4>Key Characteristics:</h4>
        <ul>
          <li><strong>Bidirectional Traversal:</strong> Can move forward and backward</li>
          <li><strong>Two Pointers:</strong> Each node has next and prev pointers</li>
          <li><strong>Dynamic Size:</strong> Can grow and shrink during runtime</li>
          <li><strong>Non-contiguous Memory:</strong> Nodes can be stored anywhere</li>
        </ul>

        <h4>Operations:</h4>
        <ul>
          <li><strong>Insertion at Start:</strong> O(1) - Add new head</li>
          <li><strong>Insertion at End:</strong> O(n) - Must traverse to end</li>
          <li><strong>Insertion at Index:</strong> O(n) - Must traverse to position</li>
          <li><strong>Deletion:</strong> O(n) - Must traverse to find element</li>
          <li><strong>Search:</strong> O(n) - Linear search required</li>
        </ul>

        <h4>Advantages over Singly Linked List:</h4>
        <ul>
          <li>Bidirectional traversal</li>
          <li>Easier deletion of nodes (no need to find previous)</li>
          <li>Can traverse backwards from any node</li>
          <li>More efficient for certain algorithms</li>
        </ul>

        <h4>Disadvantages:</h4>
        <ul>
          <li>Extra memory for prev pointer</li>
          <li>More complex implementation</li>
          <li>More operations to maintain pointers</li>
        </ul>
        </div>
      )}
    </>
  )
}
