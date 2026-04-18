'use client'

import { useState } from 'react'

export default function ArrayVisualizer() {
  const [array, setArray] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [insertIndex, setInsertIndex] = useState('')
  const [deleteIndex, setDeleteIndex] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchOutput, setSearchOutput] = useState('Search Result: ')
  const [showExplanation, setShowExplanation] = useState(false)

  const insertAtEnd = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    setArray([...array, inputValue.trim()])
    setInputValue('')
  }

  const insertAtIndex = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to insert!')
      return
    }
    const index = parseInt(insertIndex)
    if (isNaN(index) || index < 0 || index > array.length) {
      alert('Enter a valid index!')
      return
    }
    const newArray = [...array]
    newArray.splice(index, 0, inputValue.trim())
    setArray(newArray)
    setInputValue('')
    setInsertIndex('')
  }

  const deleteAtIndex = () => {
    const index = parseInt(deleteIndex)
    if (isNaN(index) || index < 0 || index >= array.length) {
      alert('Enter a valid index!')
      return
    }
    const newArray = [...array]
    newArray.splice(index, 1)
    setArray(newArray)
    setDeleteIndex('')
  }

  const deleteFromEnd = () => {
    if (array.length === 0) {
      alert('Array is empty!')
      return
    }
    setArray(array.slice(0, -1))
  }

  const search = () => {
    if (!searchValue.trim()) {
      alert('Enter a value to search!')
      return
    }
    const searchVal = searchValue.trim()
    const index = array.findIndex(item => item === searchVal)
    if (index === -1) {
      setSearchOutput(`Search Result: Value "${searchVal}" not found in array!`)
    } else {
      setSearchOutput(`Search Result: Value "${searchVal}" found at index ${index}!`)
    }
    setSearchValue('')
  }

  const clearArray = () => {
    setArray([])
    setSearchOutput('Search Result: ')
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
            onKeyPress={(e) => e.key === 'Enter' && insertAtEnd()}
          />
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
          <button onClick={deleteFromEnd}>Delete from End</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Value to search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && search()}
          />
          <button onClick={search}>Search</button>
        </div>

        <div className="input-group">
          <button onClick={clearArray}>Clear Array</button>
        </div>

        <div className="input-group">
          <button onClick={() => setShowExplanation(!showExplanation)}>
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
        </div>
      </div>

      <div className="search-output">
        {searchOutput}
      </div>

      <div className="structure-container array-container">
        {array.length === 0 ? (
          <div className="empty-message">Array is empty</div>
        ) : (
          array.map((value, index) => (
            <div key={index} className="array-element-container">
              <div className="array-index">{index}</div>
              <div className="array-element">{value}</div>
            </div>
          ))
        )}
      </div>

      {showExplanation && (
        <div className="explanation-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Array Data Structure</h3>
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
          <p><strong>Definition:</strong> An array is a collection of elements stored in contiguous memory locations, identified by an index or key.</p>
          
          <h4>Key Characteristics:</h4>
          <ul>
            <li><strong>Fixed Size:</strong> Size is determined at creation</li>
            <li><strong>Indexed Access:</strong> Elements accessed by index (0-based)</li>
            <li><strong>Contiguous Memory:</strong> Elements stored in adjacent memory locations</li>
            <li><strong>Homogeneous:</strong> All elements are of the same data type</li>
          </ul>

          <h4>Operations:</h4>
          <ul>
            <li><strong>Access:</strong> O(1) - Direct access by index</li>
            <li><strong>Search:</strong> O(n) - Linear search through elements</li>
            <li><strong>Insertion:</strong> O(n) - May require shifting elements</li>
            <li><strong>Deletion:</strong> O(n) - May require shifting elements</li>
          </ul>

          <h4>Use Cases:</h4>
          <ul>
            <li>Storing collections of similar data</li>
            <li>Implementing other data structures (stacks, queues)</li>
            <li>Mathematical computations and algorithms</li>
            <li>Lookup tables and caches</li>
          </ul>
        </div>
      )}
    </>
  )
}
