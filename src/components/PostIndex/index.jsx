import { FaSignOutAlt } from 'react-icons/fa'

import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import Post from '../Post'

// Base url of api
const apiUrl = 'https://dev.codeleap.co.uk/careers'

const titleLimit = 30
const contentLimit = 700

export default function PostIndex({ logout, user }) {
  // Current posts
  const [posts, setPosts] = useState([])

  // Updates the posts
  const updatePosts = () => {
    console.log('update')
    axios.get(`${apiUrl}/`).then(({ data }) => setPosts(data.results))
  }

  // Get posts
  useEffect(() => {
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
  const updatePostField = (field, value, limit) => {
    value = value.trim().slice(0, limit)

    setNewPost((oldPost) => ({
      ...oldPost,
      [field]: value,
    }))
  }

  const erasePost = (id) => {
    axios.delete(`${apiUrl}/${id}/`)
    updatePosts()
  }

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
            onChange={(event) =>
              updatePostField('title', event.target.value, titleLimit)
            }
          />
        </div>

        <div className="entry">
          <label htmlFor="new-content">Content</label>
          <textarea
            id="new-content"
            value={newPost.content}
            onChange={(event) =>
              updatePostField('content', event.target.value, contentLimit)
            }
            cols="30"
            rows="10"
          ></textarea>
          <small>
            characters left: {contentLimit - newPost.content.length}
          </small>
        </div>

        <button className={`${submittable() ? '' : 'disabled'}`}>create</button>
      </form>

      <div className="posts">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            fromUser={user == post.username}
            eraseSelf={() => erasePost(post.id)}
          />
        ))}
      </div>
    </main>
  )
}
