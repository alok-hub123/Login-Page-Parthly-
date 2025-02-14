import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthPage from './component/AuthPage'
import HomePage from './component/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
