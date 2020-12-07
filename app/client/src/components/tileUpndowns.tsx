import React, { useState } from 'react'
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons'
import * as QT from '../store/queryTypes'

interface DummyPostLikeProps {
  // setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
  action: any
}
// const action = () => setShowLogin(true)
export const DummyPostLike: React.FC<DummyPostLikeProps> = ({ action }) => {
  return (
    <>
      <button onClick={action}>
        like
      </button>
      <button onClick={action}>
        dislike
      </button>
    </>
  )
}

// --- ReplyLike ---

interface ReplyLikeProps {
  replyId: string
  count: QT.reply_count
  meLike?: QT.replyLike
  createReplyLike: (a: { variables: QT.createReplyLikeVariables }) => void
  updateReplyLike: (a: { variables: QT.updateReplyLikeVariables }) => void
  showCount?: boolean
}

export const ReplyLike: React.FC<ReplyLikeProps> = ({ replyId, count, meLike, createReplyLike, updateReplyLike, showCount = false }) => {
  let onClick
  let liked = false
  if (meLike && meLike.choice !== QT.LikeChoice.UP) {
    onClick = function () {
      updateReplyLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.UP } } })
    }
  } else if (meLike && meLike.choice === QT.LikeChoice.UP) {
    onClick = function () {
      updateReplyLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    }
    liked = true
  } else {
    onClick = function () {
      createReplyLike({ variables: { replyId, data: { choice: QT.LikeChoice.UP } } })
    }
  }
  return (
    <span onClick={onClick}>
      {liked ? <LikeFilled /> : <LikeOutlined />}
      {showCount && count.nUps}
    </span>
  )
}

export const ReplyDislike: React.FC<ReplyLikeProps> = ({ replyId, count, meLike, createReplyLike, updateReplyLike, showCount = false }) => {
  let onClick
  let disliked = false
  if (meLike && meLike.choice !== QT.LikeChoice.DOWN) {
    onClick = function () {
      updateReplyLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.DOWN } } })
    }
  } else if (meLike && meLike.choice === QT.LikeChoice.DOWN) {
    onClick = function () {
      updateReplyLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    }
    disliked = true
  } else {
    onClick = function () {
      createReplyLike({ variables: { replyId, data: { choice: QT.LikeChoice.DOWN } } })
    }
  }
  return (
    <span onClick={onClick}>
      {disliked ? <DislikeFilled /> : <DislikeOutlined />}
      {showCount && count.nDowns}
    </span>
  )
}

// --- CommentLike ---

interface CommentLikeProps {
  commentId: string
  count: QT.comment_count
  meLike?: QT.commentLike
  createCommentLike: (a: { variables: QT.createCommentLikeVariables }) => void
  updateCommentLike: (a: { variables: QT.updateCommentLikeVariables }) => void
}

export const CommentLike: React.FC<CommentLikeProps> = ({ commentId, count, meLike, createCommentLike, updateCommentLike }) => {
  let onClick
  let liked = false
  if (meLike && meLike.choice !== QT.LikeChoice.UP) {
    onClick = () =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.UP } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.UP) {
    onClick = () =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    liked = true
  } else {
    onClick = () =>
      createCommentLike({ variables: { commentId, data: { choice: QT.LikeChoice.UP } } })
  }
  return (
    <span onClick={onClick}>
      {liked ? <LikeFilled /> : <LikeOutlined />}
      {count.nUps}
    </span>
  )
}

export const CommentDislike: React.FC<CommentLikeProps> = ({ commentId, count, meLike, createCommentLike, updateCommentLike }) => {
  let onClick
  let disliked = false
  if (meLike && meLike.choice !== QT.LikeChoice.DOWN) {
    onClick = () =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.DOWN } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.DOWN) {
    onClick = () =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    disliked = true
  } else {
    onClick = () =>
      createCommentLike({ variables: { commentId, data: { choice: QT.LikeChoice.DOWN } } })
  }

  return (
    <span onClick={onClick}>
      {disliked ? <DislikeFilled /> : <DislikeOutlined />}
      {count.nDowns}
    </span>
  )
}

// interface PollLikeProps {
//   pollId: string
//   count: QT.pollCount
//   meLike?: QT.pollLike
//   createPollLike: (a: { variables: QT.createPollLikeVariables }) => void
//   updatePollLike: (a: { variables: QT.updatePollLikeVariables }) => void
// }

// export const PollLike: React.FC<PollLikeProps> = ({ pollId, count, meLike, createPollLike, updatePollLike }) => {
//   let onClick
//   let liked = false
//   if (meLike && meLike.choice !== QT.LikeChoice.UP) {
//     onClick = () =>
//       updatePollLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.UP } } })
//   } else if (meLike && meLike.choice === QT.LikeChoice.UP) {
//     onClick = () =>
//       updatePollLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
//     liked = true
//   } else {
//     onClick = () =>
//       createPollLike({ variables: { pollId, data: { choice: QT.LikeChoice.UP } } })
//   }
//   return (
//     <span onClick={onClick}>
//       {liked ? <LikeFilled /> : <LikeOutlined />}
//       {count.nUps}
//     </span>
//   )

// }

// export const PollDislike: React.FC<PollLikeProps> = ({ pollId, count, meLike, createPollLike, updatePollLike }) => {
//   let onClick
//   let disliked = false
//   if (meLike && meLike.choice !== QT.LikeChoice.DOWN) {
//     onClick = () =>
//       updatePollLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.DOWN } } })
//   } else if (meLike && meLike.choice === QT.LikeChoice.DOWN) {
//     onClick = () =>
//       updatePollLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
//     disliked = true
//   } else {
//     onClick = () =>
//       createPollLike({ variables: { pollId, data: { choice: QT.LikeChoice.DOWN } } })
//   }
//   return (
//     <span onClick={onClick}>
//       {disliked ? <DislikeFilled /> : <DislikeOutlined />}
//       {count.nDowns}
//     </span>
//   )
// }