import { FaSignOutAlt } from 'react-icons/fa'

import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import Post from '../Post'

// Base url of api
const apiUrl = 'https://dev.codeleap.co.uk/careers'

export default function PostIndex({ logout, user }) {
  // Current posts
  const [posts, setPosts] = useState([])

  // Get posts
  useEffect(() => {
    // Updates the posts
    const updatePosts = () => {
      console.log('update')
      axios.get(`${apiUrl}/`).then(({ data }) => setPosts(data.results))
    }

    // Update right away
    updatePosts()

    // Update again every second
    const intervalToken = setInterval(updatePosts, 1000)

    // Clean up
    return () => clearInterval(intervalToken)
  }, [])

  // New post data
  const [newPost, setNewPost] = useState({
    username: user,
    title: '',
    content: '',
  })

  // Whether the new post is valid to submit
  const submittable = () => newPost.content != '' && newPost.title != ''

  // Submits a new post
  const submitNewPost = (event) => {
    event.preventDefault()

    if (submittable() == false) return

    axios.post(`${apiUrl}/`, newPost)
    // console.log('post', newPost)

    // Clear fields
    setNewPost((oldPost) => ({
      ...oldPost,
      title: '',
      content: '',
    }))
  }

  // Updates a field from the new post
  const updatePostField = (field, value) =>
    setNewPost((oldPost) => ({
      ...oldPost,
      [field]: value,
    }))

  return (
    <main>
      {/* Logout button */}
      <FaSignOutAlt id="logout" onClick={logout} />

      <form className="new-post" onSubmit={submitNewPost}>
        <h1>What's on your mind?</h1>

        <div className="entry">
          <label htmlFor="new-title">Title</label>
          <input
            type="text"
            id="new-title"
            value={newPost.title}
            onChange={(event) => updatePostField('title', event.target.value)}
          />
        </div>

        <div className="entry">
          <label htmlFor="new-content">Content</label>
          <textarea
            id="new-content"
            value={newPost.content}
            onChange={(event) => updatePostField('content', event.target.value)}
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <button className={`${submittable() ? '' : 'disabled'}`}>create</button>
      </form>

      <div className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}
