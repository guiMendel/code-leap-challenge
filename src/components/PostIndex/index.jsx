import { FaSignOutAlt } from 'react-icons/fa'

import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import Post from '../Post'
import EditPost from '../EditPost'

// Base url of api
const apiUrl = 'https://dev.codeleap.co.uk/careers'

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

  const erasePost = (id) => axios.delete(`${apiUrl}/${id}/`)

  const updatePost = (newPost, id) =>
    axios.patch(`${apiUrl}/${id}/`, {
      title: newPost.title,
      content: newPost.content,
    })

  return (
    <main>
      {/* Logout button */}
      <FaSignOutAlt id="logout" onClick={logout} />

      <form className="new-post" onSubmit={submitNewPost}>
        <h1>What's on your mind?</h1>

        {/* New post editor */}
        <EditPost post={newPost} onChange={setNewPost} />

        <button className={`${submittable() ? '' : 'disabled'}`}>create</button>
      </form>

      <div className="posts">
        {posts.map((post, index) => (
          <Post
            key={post.id}
            post={post}
            fromUser={user == post.username}
            eraseSelf={() => erasePost(post.id)}
            updateSelf={(newPost) => updatePost(newPost, post.id)}
            animationDelay={index * 200 + 400}
          />
        ))}
      </div>
    </main>
  )
}
