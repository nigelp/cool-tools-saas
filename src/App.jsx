import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import QRCodeCreator from './pages/QRCodeCreator'
import UnitConverter from './pages/UnitConverter'
import Login from './pages/Login'
import PromptsGenerator from './pages/PromptsGenerator'
import SignUp from './pages/SignUp'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/qr-code-creator" element={<QRCodeCreator />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/prompts-generator" element={<PromptsGenerator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
