import React from 'react'
import './App.css'
import RouteList from './navigation/RouteList'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div role='presentation' className='App'>
      <Navbar />
      <RouteList />
    </div>
  )
}

export default App
