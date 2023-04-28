import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import CreateUser from './components/CreateUser'

function App() {
  // Current user
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <CreateUser />
    </div>
  )
}

export default App
