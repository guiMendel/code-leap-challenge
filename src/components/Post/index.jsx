import React from 'react'
import './style.css'

export default function Post({ post }) {
  const postTime = () => {
    const postDate = new Date(post.created_datetime)

    const formatAs = (timeType, value) => {
      return `${value} ${timeType}${value == 1 ? '' : 's'} ago`
    }

    // Get time difference
    const dateDifference = new Date() - postDate

    // If it's less than a minute old
    if (dateDifference <= 60000)
      return `${formatAs('second', Math.round(dateDifference / 1000))}`

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

  if (post != undefined)
    return (
      <div className="post">
        <h1>{post.title}</h1>
        <h2>
          <span className="username">@{post.username}</span> — {postTime()}
        </h2>
        <p>{post.content}</p>
      </div>
    )
}
