import React from 'react'
import './style.css'

export default function CreateUser({ user, setUser, submit }) {
  const eventSetUser = ({ target }) => setUser(target.value)

  const submitUser = (event) => {
    event.preventDefault()
    submit()
  }

  return (
    <form className='create-user' onSubmit={submitUser}>
      <h1>Welcome to CodeLeap network!</h1>

      <span className="entry" htmlFor="username">
        <label htmlFor="username">Please enter your username</label>
        <input type="text" id="username" value={user} onChange={eventSetUser} />
      </span>

      <button className='submit-user'>enter</button>
    </form>
  )
}
