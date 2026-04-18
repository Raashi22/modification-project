'use client'

import { useState } from 'react'

interface CircularListNode {
  value: string
  next: CircularListNode | null
}

export default function CircularLinkedListVisualizer() {
  const [head, setHead] = useState<CircularListNode | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [insertAfterValue, setInsertAfterValue] = useState('')
  const [deleteValueInput, setDeleteValueInput] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)

  const insertAtStart = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    const newNode: CircularListNode = { value: inputValue.trim(), next: null }
    
    if (!head) {
      newNode.next = newNode
      setHead(newNode)
    } else {
      newNode.next = head
      let current = head
      while (current.next !== head) {
        current = current.next!
      }
      current.next = newNode
      setHead(newNode)
    }
    setInputValue('')
  }

  const insertAtEnd = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    const newNode: CircularListNode = { value: inputValue.trim(), next: null }
    
    if (!head) {
      newNode.next = newNode
      setHead(newNode)
    } else {
      newNode.next = head
      let current = head
      while (current.next !== head) {
        current = current.next!
      }
      current.next = newNode
    }
    setInputValue('')
  }

  const insertAfter = () => {
    if (!inputValue.trim() || !insertAfterValue.trim()) {
      alert('Enter both values!')
      return
    }
    
    if (!head) {
      alert('List is empty!')
      return
    }
    
    const newNode: CircularListNode = { value: inputValue.trim(), next: null }
    let current = head
    
    do {
      if (current.value === insertAfterValue.trim()) {
        newNode.next = current.next
        current.next = newNode
        setInputValue('')
        setInsertAfterValue('')
        return
      }
      current = current.next!
    } while (current !== head)
    
    alert('Value not found!')
  }

  const deleteValue = () => {
    if (!deleteValueInput.trim()) {
      alert('Enter a value to delete!')
      return
    }
    
    if (!head) {
      alert('List is empty!')
      return
    }
    
    if (head.value === deleteValueInput.trim()) {
      if (head.next === head) {
        setHead(null)
      } else {
        let current = head
        while (current.next !== head) {
          current = current.next!
        }
        current.next = head.next
        setHead(head.next)
      }
      setDeleteValueInput('')
      return
    }
    
    let current = head
    while (current.next !== head) {
      if (current.next!.value === deleteValueInput.trim()) {
        current.next = current.next!.next
        setDeleteValueInput('')
        return
      }
      current = current.next!
    }
    
    alert('Value not found!')
  }

  const clearList = () => {
    setHead(null)
  }

  const renderList = () => {
    if (!head) return null
    
    const nodes = []
    let current = head
    let index = 0
    
    do {
      nodes.push(
        <div key={index} className="circularlinkedlist-node" style={{ 
          position: 'absolute', 
          left: `${100 + index * 100}px`, 
          top: '70px' 
        }}>
          <div className="node-value">{current.value}</div>
          {index < getListLength() - 1 && (
            <div className="arrow" style={{ 
              position: 'absolute', 
              right: '-30px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              fontSize: '1.5rem',
              color: 'var(--accent)',
              fontWeight: 'bold'
            }}>→</div>
          )}
        </div>
      )
      current = current.next!
      index++
    } while (current !== head)
    
    return (
      <>
        <div className="head-label">head</div>
        <div className="head-arrow">→</div>
        {nodes}
        {getListLength() > 0 && (
          <div style={{
            position: 'absolute',
            left: `${100 + (getListLength() - 1) * 100 + 50}px`,
            top: '40px',
            fontSize: '2rem',
            color: 'var(--accent)',
            fontWeight: 'bold',
            transform: 'rotate(45deg)'
          }}>↗</div>
        )}
      </>
    )
  }

  const getListLength = () => {
    if (!head) return 0
    let count = 0
    let current = head
    do {
      count++
      current = current.next!
    } while (current !== head)
    return count
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
            type="text"
            placeholder="Insert after"
            value={insertAfterValue}
            onChange={(e) => setInsertAfterValue(e.target.value)}
          />
          <button onClick={insertAfter}>Insert After</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Value to delete"
            value={deleteValueInput}
            onChange={(e) => setDeleteValueInput(e.target.value)}
          />
          <button onClick={deleteValue}>Delete Value</button>
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

      <div className="structure-container circularlinkedlist-container">
        {!head ? (
          <div className="empty-message">Circular Linked List is empty</div>
        ) : (
          renderList()
        )}
      </div>

      {showExplanation && (
        <div className="explanation-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Circular Linked List Data Structure</h3>
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
        <p><strong>Definition:</strong> A circular linked list is a variation of a linked list where the last node points back to the first node, creating a circular structure.</p>
        
        <h4>Key Characteristics:</h4>
        <ul>
          <li><strong>Circular Structure:</strong> Last node points to first node</li>
          <li><strong>No Null Pointers:</strong> No node points to null</li>
          <li><strong>Infinite Traversal:</strong> Can traverse indefinitely</li>
          <li><strong>Single Entry Point:</strong> Usually accessed through head pointer</li>
        </ul>

        <h4>Operations:</h4>
        <ul>
          <li><strong>Insertion at Start:</strong> O(1) - Add new head</li>
          <li><strong>Insertion at End:</strong> O(n) - Must traverse to end</li>
          <li><strong>Insertion After Value:</strong> O(n) - Must find specific value</li>
          <li><strong>Deletion:</strong> O(n) - Must find element to delete</li>
          <li><strong>Search:</strong> O(n) - Linear search required</li>
        </ul>

        <h4>Advantages:</h4>
        <ul>
          <li>Efficient for round-robin scheduling</li>
          <li>No need to check for null pointers</li>
          <li>Can start traversal from any node</li>
          <li>Useful for implementing circular buffers</li>
        </ul>

        <h4>Use Cases:</h4>
        <ul>
          <li>Round-robin scheduling in operating systems</li>
          <li>Music playlists with repeat functionality</li>
          <li>Circular buffers for data streams</li>
          <li>Game loops and animation cycles</li>
        </ul>
        </div>
      )}
    </>
  )
}
