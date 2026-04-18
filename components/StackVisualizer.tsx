'use client'

import { useState } from 'react'

export default function StackVisualizer() {
  const [stack, setStack] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)

  const push = () => {
    if (!inputValue.trim()) {
      alert('Enter a value to push!')
      return
    }
    setStack([...stack, inputValue.trim()])
    setInputValue('')
  }

  const pop = () => {
    if (stack.length === 0) {
      alert('Stack is empty!')
      return
    }
    setStack(stack.slice(0, -1))
  }

  const peek = () => {
    if (stack.length === 0) {
      alert('Stack is empty!')
      return
    }
    alert(`Top element: ${stack[stack.length - 1]}`)
  }

  const clearStack = () => {
    setStack([])
  }

  return (
    <>
      <div className="controls">
        <div className="input-group">
          <input
            type="text"
            placeholder="Value to push"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && push()}
          />
          <button onClick={push}>Push</button>
        </div>

        <div className="input-group">
          <button onClick={pop}>Pop</button>
        </div>

        <div className="input-group">
          <button onClick={peek}>Peek</button>
        </div>

        <div className="input-group">
          <button onClick={clearStack}>Clear Stack</button>
        </div>

        <div className="input-group">
          <button onClick={() => setShowExplanation(!showExplanation)}>
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
        </div>
      </div>

      <div className="structure-container stack-container">
        {stack.length === 0 ? (
          <div className="empty-message">Stack is empty</div>
        ) : (
          stack.map((value, index) => (
            <div key={index} className="stack-item">
              {value}
            </div>
          ))
        )}
      </div>

      {showExplanation && (
        <div className="explanation-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Stack Data Structure</h3>
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
          <p><strong>Definition:</strong> A stack is a linear data structure that follows the Last In, First Out (LIFO) principle.</p>
          
          <h4>Key Characteristics:</h4>
          <ul>
            <li><strong>LIFO Principle:</strong> Last element added is the first to be removed</li>
            <li><strong>Single End Access:</strong> Operations only at the top</li>
            <li><strong>Linear Structure:</strong> Elements arranged in a linear sequence</li>
            <li><strong>Dynamic Size:</strong> Can grow and shrink as needed</li>
          </ul>

          <h4>Operations:</h4>
          <ul>
            <li><strong>Push:</strong> Add element to the top - O(1)</li>
            <li><strong>Pop:</strong> Remove element from the top - O(1)</li>
            <li><strong>Peek/Top:</strong> View top element without removing - O(1)</li>
            <li><strong>IsEmpty:</strong> Check if stack is empty - O(1)</li>
          </ul>

          <h4>Use Cases:</h4>
          <ul>
            <li>Function call management (call stack)</li>
            <li>Expression evaluation and syntax parsing</li>
            <li>Undo operations in text editors</li>
            <li>Browser history navigation</li>
            <li>Memory management in programming languages</li>
          </ul>
        </div>
      )}
    </>
  )
}
