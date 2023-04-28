import { FaSignOutAlt } from 'react-icons/fa'

import React from 'react'
import './style.css'

export default function PostIndex({ logout }) {
  return (
    <main>
      {/* Logout button */}
      <FaSignOutAlt id="logout" onClick={logout} />

      <form className="new-post">
        <h1>What's on your mind?</h1>

        <div className="entry">
          <label htmlFor="new-title">Title</label>
          <input type="text" id="new-title" />
        </div>

        <div className="entry">
          <label htmlFor="new-content">Content</label>
          <textarea id="new-content" cols="30" rows="10"></textarea>
        </div>
      </form>

      <div className="posts"></div>
    </main>
  )
}
