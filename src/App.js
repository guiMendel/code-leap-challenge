import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import CreateUser from './components/CreateUser'
import PostIndex from './components/PostIndex'

// Local storage key for username
const userNameStorageKey = 'user-name'

function App() {
  // Current user
  const [user, setUser] = useState('')

  // Stores user too
  const setUserStored = (newUser) => {
    localStorage.setItem(userNameStorageKey, JSON.stringify(newUser))
    setUser(newUser)
  }

  // Whether user submitted the username
  const [userSubmitted, setUserSubmitted] = useState(false)

  useEffect(() => {
    // Check for stored user
    if (localStorage.getItem(userNameStorageKey) != undefined) {
      // Set stored user
      setUser(JSON.parse(localStorage.getItem(userNameStorageKey)))

      // Set user as submitted
      setUserSubmitted(true)

      console.log(
        'Loaded stored user',
        localStorage.getItem(userNameStorageKey)
      )
    }
  }, [])

  return (
    <div className="App">
      {userSubmitted === false ? (
        // When no user was submitted, ask for one
        <CreateUser
          user={user}
          setUser={setUserStored}
          submit={() => setUserSubmitted(true)}
        />
      ) : (
        <PostIndex user={user} logout={() => setUserSubmitted(false)} />
      )}
    </div>
  )
}

export default App
