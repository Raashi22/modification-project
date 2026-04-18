'use client'

import React, { useState, useEffect } from 'react'

// Queue class implementation
class Queue {
  private items: string[] = []

  enqueue(element: string): void {
    this.items.push(element)
  }

  dequeue(): string | undefined {
    return this.items.shift()
  }

  front(): string | undefined {
    return this.items[0]
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  toArray(): string[] {
    return [...this.items]
  }

  clear(): void {
    this.items = []
  }

  deleteAfterValue(value: string): boolean {
    const index = this.items.indexOf(value)
    if (index === -1 || index === this.items.length - 1) {
      return false // Value not found or it's the last element
    }
    this.items.splice(index + 1, 1)
    return true
  }
}

export default function QueueVisualizer() {
  const [queue] = useState(new Queue())
  const [inputValue, setInputValue] = useState('')
  const [insertAfterValue, setInsertAfterValue] = useState('')
  const [deleteValue, setDeleteValue] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [queueVersion, setQueueVersion] = useState(0)

  const insertAtStart = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    queue.enqueue(inputValue.trim())
    setInputValue('')
    setQueueVersion(prev => prev + 1)
  }

  const insertAtEnd = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    queue.enqueue(inputValue.trim())
    setInputValue('')
    setQueueVersion(prev => prev + 1)
  }

  const handleInsertAfterValue = () => {
    if (!inputValue.trim() || !insertAfterValue.trim()) {
      alert('Enter both values!')
      return
    }
    const index = queue.toArray().indexOf(insertAfterValue.trim())
    if (index === -1) {
      alert('Value not found!')
      return
    }
    const items = queue.toArray()
    items.splice(index + 1, 0, inputValue.trim())
    queue.clear()
    items.forEach(item => queue.enqueue(item))
    setInputValue('')
    setInsertAfterValue('')
    setQueueVersion(prev => prev + 1)
  }

  const deleteAtStart = () => {
    if (queue.isEmpty()) {
      alert('Queue is empty!')
      return
    }
    queue.dequeue()
    setQueueVersion(prev => prev + 1)
  }

  const deleteAtEnd = () => {
    if (queue.isEmpty()) {
      alert('Queue is empty!')
      return
    }
    const items = queue.toArray()
    items.pop()
    queue.clear()
    items.forEach(item => queue.enqueue(item))
    setQueueVersion(prev => prev + 1)
  }

  const handleDeleteValue = () => {
    if (!deleteValue.trim()) {
      alert('Enter a value to delete!')
      return
    }
    const items = queue.toArray()
    const index = items.indexOf(deleteValue.trim())
    if (index === -1) {
      alert('Value not found!')
      return
    }
    items.splice(index, 1)
    queue.clear()
    items.forEach(item => queue.enqueue(item))
    setDeleteValue('')
    setQueueVersion(prev => prev + 1)
  }

  const clearQueue = () => {
    queue.clear()
    setQueueVersion(prev => prev + 1)
  }

  const renderQueue = () => {
    const queueArray = queue.toArray()
    return (
      <div className="structure-container circularlinkedlist-container">
        {queueArray.length === 0 ? (
          <div className="empty-message">Queue is empty</div>
        ) : (
          <>
            <div className="head-label">head</div>
            <div className="head-arrow">→</div>
            <div className="linkedlist-container">
              {queueArray.map((value, index) => (
                <div key={index} className="linked-list-node">
                  <div className="node-value">{value}</div>
                  {index < queueArray.length - 1 && <div className="arrow">→</div>}
                </div>
              ))}
              {queueArray.length > 0 && (
                <div className="arrow circular-arrow">↗</div>
              )}
            </div>
          </>
        )}
      </div>
    )
  }

  useEffect(() => {
    // Re-render when queue changes
  }, [queueVersion])

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
          <input
            type="text"
            placeholder="Value to insert"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && insertAtEnd()}
          />
          <button onClick={insertAtEnd}>Insert at End</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Value to insert"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input
            type="text"
            placeholder="Insert after"
            value={insertAfterValue}
            onChange={(e) => setInsertAfterValue(e.target.value)}
          />
          <button onClick={handleInsertAfterValue}>Insert After</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Value to delete"
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
          />
          <button onClick={handleDeleteValue}>Delete Value</button>
        </div>

        <div className="input-group">
          <button onClick={deleteAtStart}>Delete at Start</button>
        </div>

        <div className="input-group">
          <button onClick={deleteAtEnd}>Delete at End</button>
        </div>

        <div className="input-group">
          <button onClick={clearQueue}>Clear Queue</button>
        </div>

        <div className="input-group">
          <button onClick={() => setShowExplanation(!showExplanation)}>
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
        </div>
      </div>

      {renderQueue()}

      {showExplanation && (
        <div className="explanation-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Queue Data Structure</h3>
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
          <p><strong>Definition:</strong> A Queue is a linear data structure that follows the FIFO (First In, First Out) principle.</p>
          
          <h4>Key Concepts:</h4>
          <ul>
            <li><strong>FIFO:</strong> First In, First Out - the first element added is the first one removed</li>
            <li><strong>Front:</strong> The element at the front of the queue (first to be removed)</li>
            <li><strong>Rear:</strong> The element at the rear of the queue (most recently added)</li>
          </ul>
          
          <h4>Operations:</h4>
          <ul>
            <li><strong>Insert at Start:</strong> Adds an element to the front of the queue</li>
            <li><strong>Insert at End:</strong> Adds an element to the rear of the queue</li>
            <li><strong>Insert After Value:</strong> Adds an element after a specific value</li>
            <li><strong>Delete at Start:</strong> Removes element from the front</li>
            <li><strong>Delete at End:</strong> Removes element from the rear</li>
            <li><strong>Delete Value:</strong> Removes a specific value</li>
          </ul>
          
          <h4>Real-world Applications:</h4>
          <ul>
            <li>Print job scheduling</li>
            <li>CPU task scheduling</li>
            <li>Breadth-First Search (BFS)</li>
            <li>Customer service lines</li>
          </ul>
          
          <h4>Time Complexity:</h4>
          <ul>
            <li>Insert at Start: O(1)</li>
            <li>Insert at End: O(1)</li>
            <li>Delete at Start: O(1)</li>
            <li>Delete at End: O(1)</li>
          </ul>
        </div>
      )}
    </>
  )
}