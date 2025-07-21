import React, { useState } from 'react'
import VolumePricingTool from './components/VolumePricingTool'
import AdminPanel from './components/AdminPanel'
import './styles/App.css'

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Volume Pricing Tool</h1>
        <button 
          className="mode-toggle"
          onClick={() => setIsAdminMode(!isAdminMode)}
        >
          {isAdminMode ? 'Customer View' : 'Admin Panel'}
        </button>
      </header>
      
      <main className="app-main">
        {isAdminMode ? <AdminPanel /> : <VolumePricingTool />}
      </main>
    </div>
  )
}

export default App 