'use client'

import { useState, useEffect } from 'react'
import DataStructureVisualizer from '@/components/DataStructureVisualizer'

export default function Home() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light')
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <>
      <header>
        <div className="header-content">
          <a href="/" className="logo">
            Data Structures Visualizer
          </a>
          <button onClick={toggleTheme} className="theme-toggle">
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>
      
      <main>
        <DataStructureVisualizer />
      </main>
    </>
  )
}




