import React, { useState } from 'react'
import './style.css'
import { FaEdit, FaEraser, FaTrash } from 'react-icons/fa'

export default function Post({ post, fromUser, eraseSelf }) {
  const postTime = () => {
    const postDate = new Date(post.created_datetime)

    const formatAs = (timeType, value) => {
      return `${value} ${timeType}${value == 1 ? '' : 's'} ago`
    }

    // Get time difference
    const dateDifference = new Date() - postDate

    // If it's less than a minute old
    if (dateDifference <= 60000)
      return `${formatAs('second', Math.round(dateDifference / 10000) * 10)}`

    // If it's less than an hour old
    if (dateDifference <= 3.6e6)
      return `${formatAs('minute', Math.round(dateDifference / 60000))}`

    // If it's less than a day old
    if (dateDifference <= 8.64e7)
      return `${formatAs('hour', Math.round(dateDifference / 3.6e6))}`

    // Display as date
    return `${String(postDate.getMonth()).padStart(2, '0')}/${String(
      postDate.getDate()
    ).padStart(2, '0')}`
  }

  // Whether delete has been requested
  const [eraseRequested, setEraseRequested] = useState(false)

  if (post != undefined)
    return (
      <div className="post">
        {/* Edit modal */}
        <div className={`modal ${eraseRequested ? '' : 'inactive'}`}>
          <div className="erase-confirm">
            <p>Are you sure you want to erase post "{post.title}"?</p>

            <div className="options">
              <button
                onClick={() => {
                  eraseSelf()
                  setEraseRequested(false)
                }}
              >
                erase
              </button>
              <button
                className="cancel"
                onClick={() => setEraseRequested(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>

        <div className="header">
          <h1>{post.title}</h1>

          <span className="controls">
            {fromUser ? (
              <>
                <FaEdit />
                <FaEraser onClick={() => setEraseRequested(true)} />
              </>
            ) : (
              ''
            )}
          </span>
        </div>

        <h2>
          <span className="username">@{post.username}</span> — {postTime()}
        </h2>
        <p>{post.content}</p>
      </div>
    )
}
