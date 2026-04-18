'use client'

import { useState } from 'react'

interface ListNode {
  value: string
  next: ListNode | null
}

export default function LinkedListVisualizer() {
  const [head, setHead] = useState<ListNode | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [insertIndex, setInsertIndex] = useState('')
  const [deleteIndex, setDeleteIndex] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)

  const insertAtStart = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    const newNode: ListNode = { value: inputValue.trim(), next: head }
    setHead(newNode)
    setInputValue('')
  }

  const insertAtEnd = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    const newNode: ListNode = { value: inputValue.trim(), next: null }
    
    if (!head) {
      setHead(newNode)
    } else {
      let current = head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
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
    
    const newNode: ListNode = { value: inputValue.trim(), next: null }
    
    if (index === 0) {
      newNode.next = head
      setHead(newNode)
    } else {
      let current = head
      for (let i = 0; i < index - 1 && current; i++) {
        current = current.next
      }
      if (current) {
        newNode.next = current.next
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
    } else {
      let current = head
      for (let i = 0; i < index - 1 && current; i++) {
        current = current.next
      }
      if (current && current.next) {
        current.next = current.next.next
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
          {current.next && <div className="arrow">→</div>}
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
          <div className="empty-message">Linked List is empty</div>
        ) : (
          renderList()
        )}
      </div>

      {showExplanation && (
        <div className="explanation-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Linked List Data Structure</h3>
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
        <p><strong>Definition:</strong> A linked list is a linear data structure where elements are stored in nodes, and each node contains data and a reference to the next node.</p>
        
        <h4>Key Characteristics:</h4>
        <ul>
          <li><strong>Dynamic Size:</strong> Can grow and shrink during runtime</li>
          <li><strong>Non-contiguous Memory:</strong> Nodes can be stored anywhere in memory</li>
          <li><strong>Sequential Access:</strong> Must traverse from head to reach any element</li>
          <li><strong>No Indexing:</strong> Elements accessed by following links</li>
        </ul>

        <h4>Operations:</h4>
        <ul>
          <li><strong>Insertion at Start:</strong> O(1) - Add new head</li>
          <li><strong>Insertion at End:</strong> O(n) - Must traverse to end</li>
          <li><strong>Insertion at Index:</strong> O(n) - Must traverse to position</li>
          <li><strong>Deletion:</strong> O(n) - Must traverse to find element</li>
          <li><strong>Search:</strong> O(n) - Linear search required</li>
        </ul>

        <h4>Advantages:</h4>
        <ul>
          <li>Dynamic size allocation</li>
          <li>Efficient insertion/deletion at beginning</li>
          <li>No memory waste (only uses what's needed)</li>
          <li>Easy to implement stacks and queues</li>
        </ul>

        <h4>Disadvantages:</h4>
        <ul>
          <li>No random access (must traverse sequentially)</li>
          <li>Extra memory for storing pointers</li>
          <li>Not cache-friendly (nodes may be scattered)</li>
          <li>More complex than arrays for simple operations</li>
        </ul>
        </div>
      )}
    </>
  )
}
