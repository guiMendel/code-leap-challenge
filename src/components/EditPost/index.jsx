import React from 'react'
import './style.css'

const titleLimit = 30
const contentLimit = 700

export default function EditPost({ post, onChange }) {
  // Updates a field from the new post
  const updatePostField = (field, value, limit) => {
    value = value.slice(0, limit)

    onChange({
      ...post,
      [field]: value,
    })
  }

  return (
    <>
      <div className="edit-post entry">
        <label htmlFor="new-title">Title</label>
        <input
          type="text"
          id="new-title"
          value={post.title}
          onChange={(event) =>
            updatePostField('title', event.target.value, titleLimit)
          }
        />
      </div>

      <div className="edit-post entry">
        <label htmlFor="new-content">Content</label>
        <textarea
          id="new-content"
          value={post.content}
          onChange={(event) =>
            updatePostField('content', event.target.value, contentLimit)
          }
          cols="30"
          rows="10"
        ></textarea>
        <small>characters left: {contentLimit - post.content.length}</small>
      </div>
    </>
  )
}
